import { Injectable } from '@nestjs/common';
import { IUser } from 'src/common/types';
import { Repository } from 'src/common/repository/repository.abstract';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class UserRepository extends Repository<IUser> {
    constructor(
        private readonly prismaService: PrismaService
    ) {
        super()
    }

    async findOne(email: string): Promise<IUser | null> {
        return this.prismaService.user.findUnique({
            where: {
                email
            }
        })
    };
    
    async create<T>(data?: T): Promise<IUser> {
        if (!data || typeof data !== 'object') {
            throw new Error(`Некорректный формат данных, data - ${typeof data}`)
        }

        const createdUser = await this.prismaService.user.create({
            data: {
                id: data['id'],
                email: data['email'],
                name: data['name'],
                password: data['password'],
            }
        });
        
        return createdUser;
    };

    async findById(id: string): Promise<IUser | null> {
        return this.prismaService.user.findUnique({ where: {
            id
        }})
    }
  
}
