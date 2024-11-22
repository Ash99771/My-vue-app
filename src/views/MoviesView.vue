<template>
    <div>
        <search-bar @search="onSearch" />
        <loader-component :loading="isLoading" text="Fetching movies..." />

        <template v-if="!isLoading">
            <div v-if="hasMovies" class="item-container">
                <movie-item
                    v-for="movie in movies"
                    :key="movie.imdbID"
                    :movie="movie"
                    :is-favourite="movie.isFavourite"
                    @toggleFavourite="toggleFavourite"
                />
            </div>
            <div v-else class="container-no-data">
                No Data
            </div>

            <pagination-component
                v-if="hasMovies"
                :totalPages="totalPages"
                :currentPage="currentPage"
                @changePage="onPageChange"
            />
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from '@vue/composition-api';
import SearchBar from '@/components/SearchBar.vue';
import MovieItem from '@/components/MovieItem.vue';
import apiClient from "@/services/api/apiService";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { useStore } from 'vuex-composition-helpers';
import LoaderComponent from "@/components/LoaderComponent.vue";
import { Movie, SearchPayload, ApiResponse } from '@/types/movies';


export default defineComponent({
    name: 'MovieList',
    components: {LoaderComponent, PaginationComponent, SearchBar, MovieItem },
    setup() {
        const state = useStore();
        const movies = ref<Movie[]>([]);
        const currentPage = ref<number>(1);
        const searchQuery = ref<string | null>(null);
        const isLoading = ref<boolean>(true);
        const totalPages = ref<number>(0);

        const processMoviesResponse = (response: ApiResponse) => {
            if (Array.isArray(response.data)) {
                movies.value = response.data.map((item: Movie) => {
                    item.isFavourite = state.getters.isFavourite(item.imdbID);
                    return item;
                });

                currentPage.value = response.page;
                totalPages.value = response.total_pages || 0;
            } else {
                console.error('Unexpected response format:', response.data);
                movies.value = [];
            }
        };

        const loadMovies = async (): Promise<void> => {
            try {
                isLoading.value = true;
                const payload: SearchPayload = { Title: searchQuery.value, page: currentPage.value };
                const response = await apiClient.getMoviesList(payload);
                processMoviesResponse(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                isLoading.value = false;
            }
        };

        const searchMovies = async (): Promise<void> => {
            try {
                isLoading.value = true;
                const payload: SearchPayload = { page: currentPage.value };
                if (searchQuery.value) {
                    payload.Title = searchQuery.value;
                }
                const response = await apiClient.searchMovies(payload);
                processMoviesResponse(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                isLoading.value = false;
            }
        };

        onMounted(loadMovies);

        watch(currentPage, loadMovies);

        const onSearch = async (query: string) => {
            searchQuery.value = query;
            currentPage.value = 1;
            await searchMovies();
        };

        const hasMovies = computed(() => movies.value.length > 0);

        const toggleFavourite = (movie: Movie) => {
            const movieToUpdate = movies.value.find(movieItem => movieItem.imdbID === movie.imdbID);

            if (movieToUpdate) {
                movieToUpdate.isFavourite = !movieToUpdate.isFavourite;
            }

            const isFavourite = state.getters.isFavourite(movie.imdbID);

            if (isFavourite) {
                state.commit('REMOVE_FROM_FAVOURITES', movie.imdbID);
            } else {
                state.commit('ADD_TO_FAVOURITES', movie);
            }
        };

        const onPageChange = (page: number) => {
            currentPage.value = page;
        };

        return {
            movies,
            onSearch,
            toggleFavourite,
            totalPages,
            currentPage,
            onPageChange,
            isLoading,
            hasMovies
        };
    },
});
</script>

<style scoped>
.item-container {
    margin-top: 16px;
}
.container-no-data {
    display: flex;
    justify-content: center;
}
</style>
