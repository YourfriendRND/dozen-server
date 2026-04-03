import { ICommonEntity } from './common-entity.interface';
import { IUser } from './user.interface';

export interface IToken extends ICommonEntity {
    expiredAt: Date;
    users?: IUser;
}

export interface ITokenPairs {
    accessToken: string;
    refreshToken: string;
}
