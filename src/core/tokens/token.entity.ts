import { Entity } from 'src/common/decorators';
import { IUser } from 'src/common/types';
import { IToken } from 'src/common/types/token.interface';

@Entity('refresh_tokens')
export class Token implements IToken {
    id: string;
    expiredAt: Date;
    users?: IUser;
    createdAt: Date;
    updatedAt: Date;
}