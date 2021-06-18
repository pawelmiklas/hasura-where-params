import deepMerge from 'deepmerge';
import { truthy } from './utils/truthy';
import empty from 'is-empty';

const ARRAY_FIELDS = ['_and', '_or'];

const whereArgs = <T extends object>(...filters: (Object | undefined)[]): T =>
  deepMerge.all(filters.filter(truthy)) as T;

const whereFilter = (
  path: string,
  value: any,
  condition?: boolean
): Object | undefined => {
  if (condition == null && empty(value)) {
    return;
  }

  if ((condition == null && !empty(value)) || condition === true) {
    return path.split('.').reduceRight((acc, item) => {
      if (ARRAY_FIELDS.includes(item)) {
        acc = { [item]: [{ ...acc }] };
      } else {
        acc = { [item]: acc };
      }

      return acc;
    }, value);
  }

  return;
};

export { whereArgs, whereFilter };
