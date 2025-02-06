export default class NavigationList {
  static HOME = 1;
  static LISTS = 2;
  static FAVORITE = 3;
  static SORT = 4;

  static ITEMS = [
    { label: 'Explorar', path: '/', value: this.HOME },
    { label: 'Listas', path: 'lists', value: this.LISTS },
    { label: 'Favoritos', path: 'favorites', value: this.FAVORITE },
    { label: 'Sortear', path: 'sorter', value: this.SORT },
  ];
}
