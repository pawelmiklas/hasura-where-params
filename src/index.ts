import merge from "deepmerge";
import _isEmpty from "lodash.isempty";

const whereClause = <T extends object>(
  ...filters: (Object | undefined)[]
): T => {
  const onlyObjects = filters.filter((item) => item !== undefined) as Object[];

  return merge.all(onlyObjects) as T;
};

const whereFilter = (
  path: string,
  value: any,
  condition?: boolean
): Object | undefined => {
  if (condition == null && _isEmpty(value)) {
    return;
  }

  if ((condition == null && !_isEmpty(value)) || condition === true) {
    return path.split(".").reduceRight((acc, item) => {
      acc = { [item]: acc };

      return acc;
    }, value);
  }

  return;
};

export { whereClause, whereFilter };
