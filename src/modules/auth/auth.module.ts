import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { PasswordModule } from 'src/core/password/password.module';
import { AuthResolver } from './auth.resolver';

@Module({
    imports: [
        UserModule,
        PasswordModule,
    ],
    controllers: [],
    providers: [AuthService, AuthResolver],
    exports: [AuthService],
})
export class AuthModule {}