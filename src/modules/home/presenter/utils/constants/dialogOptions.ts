export default class MenuOptions {
  static CREATE_LIST = 1;
  static ADD_MOVIE_TO_LIST = 2;

  static LIST = [
    { label: 'Criar Lista e Adicionar', value: this.CREATE_LIST, icon: 'fa-regular fa-square-plus', dialog: true },
    { label: 'Adicionar à lista', value: this.ADD_MOVIE_TO_LIST, icon: 'fa-solid fa-bars-staggered', dialog: true },
  ];
}
