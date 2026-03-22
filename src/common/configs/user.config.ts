import { registerAs } from '@nestjs/config';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

import { ConfigNameSpaces } from '../enums';
import { validateConfig } from '../utils';

export class UserConfig {
    @Transform(({ value }) => Number(value))
    @IsInt()
    saltRound: number;
}

export default registerAs(ConfigNameSpaces.User, () => validateConfig(UserConfig, {
    saltRound: process.env['BCRYPT_SALT_ROUND'] || 10,
}));
