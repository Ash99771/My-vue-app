import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
}

export default new Vuex.Store({
  state: {
    favourites: [] as Movie[],
  },
  mutations: {
    ADD_TO_FAVOURITES(state, movie: Movie) {
      const isExist = state.favourites.find((fav) => fav.imdbID === movie.imdbID);
      if (!isExist) {
        state.favourites.push(movie);
      }
    },
    REMOVE_FROM_FAVOURITES(state, movieId: string) {
      state.favourites = state.favourites.filter((fav) => fav.imdbID !== movieId);
    },
  },
  actions: {
    toggleFavourite({ commit, state }, movie: Movie) {
      const isFavourite = state.favourites.some((fav) => fav.imdbID === movie.imdbID);
      if (isFavourite) {
        commit('REMOVE_FROM_FAVOURITES', movie.imdbID);
      } else {
        commit('ADD_TO_FAVOURITES', movie);
      }
    },
  },
  getters: {
    isFavourite: (state) => (movieId: string) => {
      return state.favourites.some((fav) => fav.imdbID === movieId);
    },
    favourites: (state) => state.favourites,
  },
});
