import { ConflictException, Injectable, NotFoundException, Logger, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UserService } from '../users/user.service';
import { RegisterUserDto } from './input/register-user.dto';
import { PasswordService } from 'src/core/password/password.service';
import { IUserWithTokens, TokenPayload } from 'src/common/types';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from 'src/common/configs';
import { TokenService } from 'src/core/tokens/token.service';
import { ITokenPairs } from 'src/common/types/token.interface';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly userService: UserService,
        private readonly passwordService: PasswordService,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtParams: ConfigType<typeof jwtConfig>,
        private readonly tokenService: TokenService
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

    private createToken(payload: TokenPayload, type: 'access' | 'refresh'): string {
        if (type === 'access') {
            return this.jwtService.sign<TokenPayload>(payload, {
                secret: this.jwtParams.accessSecretKey,
                expiresIn: this.jwtParams.accessExpires,
            });
        }

        if (type === 'refresh') {
            return this.jwtService.sign<TokenPayload>(payload, {
                secret: this.jwtParams.refreshSecretKey,
                expiresIn: this.jwtParams.refreshExpires,
            });
        }

        throw new Error('Unknown type of token');
    }

    async register(dto: RegisterUserDto): Promise<IUserWithTokens> {
        try {
           await this.assertExistUser(dto.email);

           const hashPassword = await this.passwordService.hashPassword(dto.password);

           const user = await this.userService.createUser({
                ...dto,
                password: hashPassword,
                deletedAt: null,
           });

            const tokenPayload: TokenPayload = { 
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                tokenId: crypto.randomUUID(),
            };

            await this.tokenService.createToken(tokenPayload);

            const accessToken = this.createToken(tokenPayload, 'access');
            const refreshToken = this.createToken(tokenPayload, 'refresh');

           return {
            ...user,
            accessToken,
            refreshToken,
           }

        } catch (err: unknown) {
            this.logger.error(`Ошибка при добавлении пользоателя`, err);
            throw err;
        }
    }

    async refreshTokens(payload: TokenPayload): Promise<ITokenPairs> {
        try {
            const { tokenId, id } = payload;
            const existToken = await this.tokenService.findTokenById(tokenId, id);
            
            const user = await this.userService.findById(id);
            await this.tokenService.deleteToken(existToken.id);

            const tokenPayload: TokenPayload = {
                id: user.id,
                name: user.name,
                email: user.email,
                updatedAt: user.updatedAt,
                createdAt: user.createdAt,
                tokenId: crypto.randomUUID(),
            };

            await this.tokenService.createToken(tokenPayload);

            const accessToken = this.createToken(tokenPayload, 'access');
            const refreshToken = this.createToken(tokenPayload, 'refresh');

            return {
                accessToken,
                refreshToken
            }
            
        } catch (err) {
            this.logger.error(`Ошибка получения обновленной пары токенов, причины: ${err}`)
            throw new UnauthorizedException('Пользователь не авторизован')
        }
    }
}
