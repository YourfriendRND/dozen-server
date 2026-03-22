import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { RegistredUserResponse } from './output/registred-user.response';
import { RegisterUserDto } from './input/register-user.dto';
import { AuthService } from './auth.service';

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
}
