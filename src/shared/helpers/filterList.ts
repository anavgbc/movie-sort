export const filterList = (list: any[], filter: string) => {
  return list.filter((item) => {
    return item.name.toLowerCase().includes(filter.toLowerCase());
  });
}