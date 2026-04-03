import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from 'src/common/types';
import { User } from './user.entity';
import { InjectRepository } from 'src/common/decorators';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository
    ) {}

    async findUserByEmail(email: string): Promise<IUser | null> {
        const user = await this.userRepository.findOne(email);

        if (!user) {
            throw new NotFoundException(`Пользователь с email: "${email}" не найден`)
        }

        return user;
    }

    async createUser(user: Partial<IUser>): Promise<IUser> {
        return this.userRepository.create(user);
    }

    async findById(id: string) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundException(`Пользователь "${id}" не найден`);
        }

        return user;
    }
}
