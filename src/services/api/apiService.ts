import apiClient from '../axios/axios';
import { SearchPayload, ApiResponse } from '@/types/movies';


export default {
    getMoviesList(payload: SearchPayload) {
        return apiClient.get<ApiResponse>('/movies', {
            params: payload,
        });
    },

    searchMovies(payload: SearchPayload) {
        return apiClient.get<ApiResponse>('/movies/search', {
        params: payload,
    });
},
};
