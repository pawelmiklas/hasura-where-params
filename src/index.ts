import deepMerge from 'deepmerge';
import { truthy } from './utils/truthy';
import empty from 'is-empty';
import { clearFilterFields } from './utils/clearFilterFields';

const FILTER_FIELDS = ['_and', '_or'];
const ARRAY_FILTER_FIELDS = ['_and[]', '_or[]'];
const OBJECT_FILTER_FIELDS = ['_and{}', '_or{}'];

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
      const key = clearFilterFields(item);

      if (ARRAY_FILTER_FIELDS.includes(item) || FILTER_FIELDS.includes(item)) {
        acc = { [key]: [{ ...acc }] };
      } else if (OBJECT_FILTER_FIELDS.includes(item)) {
        acc = { [key]: { ...acc } };
      } else {
        acc = { [key]: acc };
      }

      return acc;
    }, value);
  }

  return;
};

export { whereArgs, whereFilter };
