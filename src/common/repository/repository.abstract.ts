import { ICommonEntity } from '../types';

export abstract class Repository<T extends ICommonEntity> {
    abstract findOne(...args: unknown[]): T | Promise<T | null>;
    abstract create (data?: unknown): T | Promise<T>;
    
    delete (...args: unknown[]): Promise<T> {
        throw new Error('Not Implemented')
    };

    update?: (key: unknown, data?: unknown) => T;
    find?: (...args: unknown[]) => T[];
    restore?: (...args: unknown[]) => T;
}
