import { ICommonEntity } from './common-entity.interface';
import { IToken } from './token.interface';

export interface IUser extends ICommonEntity {
    email: string;
    password: string;
    name: string;
    tokens?: IToken[];
}

export interface IUserWithTokens extends IUser {
    accessToken: string;
    refreshToken: string;
}
