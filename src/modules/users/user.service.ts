import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from 'src/common/types';
import { Repository } from 'src/common/repository/repository.abstract';
import { User } from './user.entity';
import { InjectRepository } from 'src/common/decorators';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<IUser>,
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
}

