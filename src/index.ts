import merge from "deepmerge";
import { truthy } from "./utils/truthy";
import empty from "is-empty";

const whereClause = <T extends object>(...filters: (Object | undefined)[]): T =>
  merge.all(filters.filter(truthy)) as T;

const whereFilter = (
  path: string,
  value: any,
  condition?: boolean
): Object | undefined => {
  if (condition == null && empty(value)) {
    return;
  }

  if ((condition == null && !empty(value)) || condition === true) {
    return path.split(".").reduceRight((acc, item) => {
      acc = { [item]: acc };

      return acc;
    }, value);
  }

  return;
};

export { whereClause, whereFilter };
