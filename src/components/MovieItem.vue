<template>
    <div class="movie-item">
        <div class="movie-details">
            <h3 class="movie-title">
                {{ movie.Title }} <span class="movie-year">({{ movie.Year }})</span>
            </h3>
            <p class="movie-id">IMDB ID: {{ movie.imdbID }}</p>
        </div>
        <button @click="$emit('toggleFavourite', movie)" class="favourite-button">
            <span :class="isFavourite ? 'star active' : 'star'">★</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Movie } from '@/types/movies';


export default defineComponent({
    name: 'MovieItem',
    props: {
        movie: {
            type: Object as PropType<Movie>,
            required: true,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
    },
});
</script>

<style scoped>
.movie-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, box-shadow 0.3s;
}

.movie-item:hover {
    background-color: #f1f1f1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.movie-details {
    flex: 1;
    margin-right: 1rem;
}

.movie-title {
    font-size: 1.2rem;
    color: #333;
    margin: 0;
}

.movie-year {
    font-size: 1rem;
    color: #666;
    margin-left: 0.5rem;
}

.movie-id {
    font-size: 0.9rem;
    color: #999;
    margin-top: 0.5rem;
}

.favourite-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
}

.favourite-button:hover {
    transform: scale(1.2);
}

.star {
    font-size: 1.5rem;
    color: #ccc;
    transition: color 0.3s;
}

.star.active {
    color: #42b983;
}
</style>
