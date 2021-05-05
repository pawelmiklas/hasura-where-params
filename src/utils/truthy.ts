type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T;

const truthy = <T>(value: T): value is Truthy<T> => !!value;

export { truthy };
