const clearFilterFields = (item: string) =>
  item.includes('[]') || item.includes('{}') ? item.slice(0, -2) : item;

export { clearFilterFields };
