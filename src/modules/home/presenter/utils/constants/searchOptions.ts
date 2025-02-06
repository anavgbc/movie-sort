export default class SearchOptions {
  static MOVIES = 1;
  static TVSHOWS = 2;

  static SEARCH_OPTIONS = [
    { label: 'Filmes', value: this.MOVIES },
    { label: 'Séries', value: this.TVSHOWS },
  ];
}
