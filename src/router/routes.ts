import { RouteConfig } from 'vue-router';
import MoviesView from '@/views/MoviesView.vue';
import HomeView from '@/views/HomeView.vue';
import FavouritesMoviesView from '@/views/FavouritesMoviesView.vue';

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: () => import('../layouts/DefaultLayout.vue'),
        children: [
            {
                path: '',
                name: 'HomeView',
                component: HomeView,
            },
            {
                path: '/movies',
                name: 'MoviesView',
                component: MoviesView,
            },
            {
                path: '/favourites',
                name: 'FavouritesMovies',
                component: FavouritesMoviesView,
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue'),
    },
];

export default routes;
