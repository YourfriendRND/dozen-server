import { ManipulateType } from 'dayjs';
import { UnitAnyCase } from '../types';

export function adaptJwtTimeToDayjs(unit: UnitAnyCase): ManipulateType {
    switch (unit) {
        case 's': return 'second';
        case 'M': return 'minute';
        case 'H': return 'hour';
        case 'D': return 'day';
        case 'W': return 'week';
        case 'Y': return 'year';
        default: return 'millisecond';
    }
}