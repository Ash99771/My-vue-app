<template>
    <div class="sidebar">
        <nav>
            <ul>
                <li v-for="page in pages" :key="page.name">
                    <router-link :to="page.path" class="nav-link">
                        {{ page.name }}
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    name: 'SideBar',
    setup() {
        const pages = [
            { name: 'Home', path: '/' },
            { name: 'Movies', path: '/movies' },
            { name: 'Favourites', path: '/favourites' },
        ];

        return { pages };
    },
});
</script>

<style scoped>
.sidebar {
    height: auto;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
}

nav ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
}

nav li {
    margin-right: 1rem;
}

.nav-link {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    transition: color 0.2s;
}

.nav-link:hover {
    color: #42b983;
}
</style>
