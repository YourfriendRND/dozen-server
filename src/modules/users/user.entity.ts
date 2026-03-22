import { Entity } from 'src/common/decorators';
import { IUser } from 'src/common/types';

@Entity('users')
export class User implements IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}
