<template>
    <div>
        <h2>Favourites</h2>
        <div v-if="favourites.length">
            <movie-item
                v-for="movie in favourites"
                :key="movie.imdbID"
                :movie="movie"
                :isFavourite="true"
                @toggleFavourite="removeFromFavourites"
            />
        </div>
        <div v-else class="container-no-data">
            No Data
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent} from '@vue/composition-api';
import MovieItem from '@/components/MovieItem.vue';
import { useStore } from 'vuex-composition-helpers';

interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
}

export default defineComponent({
    name: 'FavouritesMovies',
    components: {
        MovieItem,
    },
    setup() {
        const state = useStore();
        const favourites = computed<Movie[]>(() => state.getters.favourites);

        const removeFromFavourites = (movie: Movie) => {
            state.commit('REMOVE_FROM_FAVOURITES', movie.imdbID);
        };
        return {
            favourites,
            removeFromFavourites,
        };
    },
});
</script>

<style scoped>
.container-no-data {
    display: flex;
    justify-content: center;
}
</style>
