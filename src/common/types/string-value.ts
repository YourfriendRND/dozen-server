export type UnitAnyCase = 's' | 'M' | 'H' | 'D' | 'W' | 'Y';

export type StringValue =
| `${number}`
| `${number}${UnitAnyCase}`
| `${number} ${UnitAnyCase}`;