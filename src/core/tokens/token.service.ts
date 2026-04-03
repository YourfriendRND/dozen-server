import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { InjectRepository } from 'src/common/decorators';
import { Token } from './token.entity';
import { IToken } from 'src/common/types/token.interface';
import { TokenPayload } from 'src/common/types';

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private readonly tokenRepository: TokenRepository,
    ) {}

    async createToken(payload: TokenPayload): Promise<IToken> {
        const token = await this.tokenRepository.create(payload);

        if (!token) {
            throw new UnprocessableEntityException(`Refresh токен для пользователя: "${payload.id}" не был создан`)
        }

        return token;
    }

    async findTokenById(id: string, userId: string): Promise<IToken> {
        const token = await this.tokenRepository.findOne(id, userId);

        if (!token) {
            throw new NotFoundException(`Токен id: "${id}" для пользователя: "${userId}" не найден`);
        }

        return token;
    }

    async deleteToken(id: string) {
        await this.tokenRepository.delete(id);
    }
}
