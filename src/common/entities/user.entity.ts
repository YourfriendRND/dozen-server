import { IUser } from '../types';

export class UserEntity implements IUser {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    deletedAt?: Date | undefined;
    updatedAt: Date;
    password: string;
}
