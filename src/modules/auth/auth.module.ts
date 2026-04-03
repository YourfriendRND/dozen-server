import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { PasswordModule } from 'src/core/password/password.module';
import { AuthResolver } from './auth.resolver';
import { TokenModule } from 'src/core/tokens/token.module';
import { AccessJwtStrategy } from './strategies/access-jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-access.strategy';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { GqlRefreshGuard } from './guards/gql-refresh.guard';

@Module({
    imports: [
        UserModule,
        PasswordModule,
        JwtModule.register({}),
        TokenModule,
    ],
    providers: [
        AuthService, 
        AuthResolver,
        AccessJwtStrategy,
        RefreshJwtStrategy,
        GqlAuthGuard,
        GqlRefreshGuard
    ],
    exports: [AuthService],
})
export class AuthModule {}