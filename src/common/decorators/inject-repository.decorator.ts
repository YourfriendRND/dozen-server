import { Inject } from '@nestjs/common';

export const InjectRepository = <T extends Function>(entity: T) => Inject(entity);
