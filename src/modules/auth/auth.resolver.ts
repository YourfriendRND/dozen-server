import { Mutation, Args, Resolver } from '@nestjs/graphql';
import { RegistredUserResponse } from './output/registred-user.response';
import { RegisterUserDto } from './input/register-user.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from 'src/common/decorators/jwt-guard.decorator';
import { TokenTypes } from 'src/common/enums';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { TokenPayload } from 'src/common/types';
import { RefreshTokensResponse } from './output/refresh-tokens.response';

@Resolver(() => RegistredUserResponse)
export class AuthResolver {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Mutation(() => RegistredUserResponse, {
        description: 'Данные для регистрации пользователя',
        name: 'register',
    })
    async register(
        @Args('registerUserDto') registerUserDto: RegisterUserDto
    ): Promise<RegistredUserResponse> {
        return this.authService.register(registerUserDto);
    }

    @Mutation(() => RefreshTokensResponse, {
        description: 'Обновление пары токенов access - refresh',
        name: 'refresh'
    })
    @JwtGuard(TokenTypes.Refresh)
    async refreshTokens(
        @CurrentUser() user: TokenPayload
    ): Promise<RefreshTokensResponse>  {
        return this.authService.refreshTokens(user);
    }
}
