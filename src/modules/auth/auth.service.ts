import { ConflictException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { RegisterUserDto } from './input/register-user.dto';
import { User } from '../users/user.entity';
import { PasswordService } from 'src/core/password/password.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
    ) {}

    private async assertExistUser(email: string): Promise<void> {
        try {
            const existingUser = await this.userService.findUserByEmail(email);

            if (existingUser) {
                throw new ConflictException(`Пользователь с "${email}" уже зарегистрирован`);
            }

        } catch (err: unknown) {
            if (err instanceof NotFoundException) {
                return;
            }

            throw err;

        }
    }

    async register(dto: RegisterUserDto): Promise<User> {
        try {
           await this.assertExistUser(dto.email);

           const hashPassword = await this.passwordService.hashPassword(dto.password);

           return this.userService.createUser({
                ...dto,
                password: hashPassword,
                deletedAt: null,
           });

        } catch (err: unknown) {
            this.logger.error(`Ошибка при добавлении пользоателя`, err);
            throw err;
        }
    }
}
