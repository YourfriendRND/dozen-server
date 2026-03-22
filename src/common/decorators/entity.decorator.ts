import 'reflect-metadata';

export const ENTITY_NAME_METADATA = 'entity:name';

export function Entity(name: string): ClassDecorator {
    return (target) => {
        if (name) {
          Reflect.defineMetadata(ENTITY_NAME_METADATA, name, target);
        }
    };
}
