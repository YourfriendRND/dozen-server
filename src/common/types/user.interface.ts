import { ICommonEntity } from './common-entity.interface';

export interface IUser extends ICommonEntity {
    email: string;
    password: string;
    name: string;
}
