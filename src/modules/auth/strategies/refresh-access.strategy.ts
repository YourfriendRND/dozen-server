import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from 'src/common/configs/jwt.config';
import { TokenPayload } from 'src/common/types';
import { TokenTypes } from 'src/common/enums';
import { TokenService } from 'src/core/tokens/token.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, TokenTypes.Refresh) {
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwt: ConfigType<typeof jwtConfig>,
        private readonly tokenService: TokenService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwt.refreshSecretKey,
        })
    }

    async validate(payload: TokenPayload) {
        try {
            const { tokenId, id } = payload;

            if (!payload || !tokenId || !id) {
                throw new UnauthorizedException('Невозможно получить новую пару токенов. Токен не содержит необходимые данные');
            }

            await this.tokenService.findTokenById(tokenId, id);

            return payload;

        } catch(err) {
            if (err instanceof UnauthorizedException) {
                throw err;
            }

            let message = 'Пользователь неавторизован. Неизвестная ошибка.';

            if (err instanceof NotFoundException) {
                message = 'Пользоватеь неавторизован. Токен не найден или просрочен';
            }

            throw new UnauthorizedException(message);
        }
        
    }
}
