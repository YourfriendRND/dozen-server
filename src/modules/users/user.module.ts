import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
    imports: [],
    providers: [
        {
            useClass: UserRepository,
            provide: User,
        },
        UserService
    ],
    exports: [UserService],
})
export class UserModule {}
