<template>
    <div class="search-bar">
        <input
            v-model="query"
            @input="onInput"
            placeholder="Search for movies..."
            class="search-input"
        />
        <button @click="search" class="search-button">Search</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import debounce from 'lodash/debounce';

export default defineComponent({
    name: 'SearchBar',
    emits: ['search'],
    setup(_, { emit }) {
        const query = ref('');

        const emitSearch = debounce((value: string) => {
            emit('search', value);
        }, 300);

        const onInput = () => {
            emitSearch(query.value);
        };

        const search = () => {
            emitSearch.cancel();
            emit('search', query.value);
        };

        return { query, onInput, search };
    },
});
</script>

<style scoped>
.search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: #f5f5f5; /* Лёгкий фон */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    gap: 1rem; /* Пробел между элементами */
}

.search-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    color: #333; /* Текст внутри поля ввода */
    outline: none;
    transition: border-color 0.3s;
}

.search-input:focus {
    border-color: #42b983;
}

.search-button {
    background-color: #42b983;
    color: #fff; /* Белый текст */
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

.search-button:hover {
    background-color: #369f6b; /* Более тёмный оттенок */
}
</style>
