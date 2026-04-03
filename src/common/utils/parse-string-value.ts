import { StringValue, UnitAnyCase } from "../types";
import { TIME_UNITS } from "../const";

export function isUnit(value: string): value is UnitAnyCase {
    return TIME_UNITS.includes(value as UnitAnyCase);
}


export function parseStringValue(sourceValue: StringValue): [number, UnitAnyCase] {
    const [value, unit] = sourceValue.split('');

    const valueAsInt = parseInt(value, 10);

    if (isNaN(valueAsInt) || !Number.isInteger(valueAsInt)) {
        throw new Error(`Incorrect string value is NaN or Not Integer - ${valueAsInt} : ${typeof valueAsInt}`);
    }

    if (!isUnit(unit)) {
        throw new Error(`Invalid unit time - ${unit}, available values are ${TIME_UNITS.join(', ')}`)
    }

    return [valueAsInt, unit]
}