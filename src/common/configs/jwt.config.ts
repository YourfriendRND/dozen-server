import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { IsValidTime } from '../decorators';
import { ConfigNameSpaces } from '../enums';
import { validateConfig } from '../utils';
import { StringValue } from '../types';

export class JwtConfig {
    @IsString()
    accessSecretKey: string;
    
    @IsString()
    refreshSecretKey: string;
    
    @IsString()
    @IsValidTime()
    accessExpires: StringValue;
    
    @IsString()
    @IsValidTime()
    refreshExpires: StringValue;
}

export default registerAs(ConfigNameSpaces.Jwt, () => validateConfig(JwtConfig, {
    accessSecretKey: process.env.SECRET_KEY,
    refreshSecretKey: process.env.REFRESH_SECRET_KEY,
    accessExpires: process.env.ACCESS_EXPIRES_TIME,
    refreshExpires: process.env.REFRESH_EXPIRES_TIME,
}))