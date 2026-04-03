import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';
import { isUnit } from '../utils';

export function IsValidTime(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string): void {
      registerDecorator({
        name: 'isValidTime',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: string) {
            if (typeof value !== 'string') {
              return false;
            }
  
            const regex = /^([1-9]\d*)([sHMDWY])$/; // Проверка формата
            if (!regex.test(value)) {
              return false;
            }
  
            // Проверка что единица измерения допустима
            const unit = value.slice(-1);

            if (!isUnit(unit)) {
                return false
            }

            return true;
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} must be a valid time string (e.g. 60s, 5M, 2D, 3W, 1Y)`;
          },
        },
      });
    };
}
  