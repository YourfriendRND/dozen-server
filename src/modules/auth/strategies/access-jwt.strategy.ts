import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from 'src/common/configs/jwt.config';
import { TokenPayload } from 'src/common/types';
import { TokenTypes } from 'src/common/enums';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, TokenTypes.Access) {
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwt: ConfigType<typeof jwtConfig>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwt.accessSecretKey,
        })
    }

    validate(payload: TokenPayload) {
        if (!payload || !payload.id) {
            throw new UnauthorizedException('Пользователь неавторизован');
        }

        return payload;
    }
}
