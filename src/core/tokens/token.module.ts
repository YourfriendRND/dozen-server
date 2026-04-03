import { Module } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { Token } from './token.entity';
import { TokenService } from './token.service';

@Module({
    imports: [],
    providers: [
        {
            useClass: TokenRepository,
            provide: Token
        },
        TokenService
    ],
    exports: [TokenService],
})
export class TokenModule {}