import { ICommonEntity } from '../types';

export abstract class Repository<T extends ICommonEntity> {
    abstract findOne(...args: unknown[]): T | Promise<T | null>;
    abstract create (data?: unknown): T | Promise<T>;
    update?: (key: unknown, data?: unknown) => T;
    find?: (...args: unknown[]) => T[];
    delete?: (...args: unknown[]) => void;
    restore?: (...args: unknown[]) => T;
}
