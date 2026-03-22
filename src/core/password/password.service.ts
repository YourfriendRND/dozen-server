import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { userConfig } from '../../common/configs';

@Injectable()
export class PasswordService {
    constructor(
        @Inject(userConfig.KEY)
        private readonly config: ConfigType<typeof userConfig>
    ) {}

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.config.saltRound);
    }

    async comparePassword(plainPassword: string, hashPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashPassword);
    }
}