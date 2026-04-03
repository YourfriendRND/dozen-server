import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dayjs from 'dayjs';
import { Repository } from 'src/common/repository/repository.abstract';
import { Token } from './token.entity';
import { PrismaService } from '../prisma/prisma.service';
import { TokenPayload } from 'src/common/types';
import { jwtConfig } from 'src/common/configs';
import { adaptJwtTimeToDayjs, parseStringValue } from 'src/common/utils';

@Injectable()
export class TokenRepository extends Repository<Token> {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(jwtConfig.KEY)
        private readonly jwtParams: ConfigType<typeof jwtConfig>
    ) {
        super()
    }
    
    async findOne(id: string, userId: string): Promise<Token | null> {
        return this.prismaService.token.findFirst({
            where: {
                id,
                expiredAt: {
                    gt: new Date(),
                },
                userId,
            },
        });
    }

    async create(data: TokenPayload): Promise<Token> {
        const [value, unit] = parseStringValue(this.jwtParams.refreshExpires);

        return this.prismaService.token.create({
            data: {
                id: data.tokenId,
                expiredAt: dayjs().add(value, adaptJwtTimeToDayjs(unit)).toDate(),
                userId: data.id
            }
        })
    }

    override async delete(id: string): Promise<Token> {
        return this.prismaService.token.delete({
            where: {
                id,
            }
        })
    }
}
