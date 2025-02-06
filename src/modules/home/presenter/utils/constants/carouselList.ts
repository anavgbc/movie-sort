export default class HomeCarousel {
  static TRENDING_MOVIES = 1;
  static POPULAR_MOVIES = 2;
  static TOP_RATED_MOVIES = 3;
  static UPCOMING_MOVIES = 4;
  static POPULAR_TVSHOWS = 5;

  static LIST = [
    { label: 'Tendências', value: this.TRENDING_MOVIES },
    { label: 'Filmes Populares', value: this.POPULAR_MOVIES },
    { label: 'Filmes bem avaliados', value: this.TOP_RATED_MOVIES },
    { label: 'Em Cartaz', value: this.UPCOMING_MOVIES },
    { label: 'Séries de TV Populares', value: this.POPULAR_TVSHOWS },
  ];
}
