export interface Movie {
    Title: string;
    Year: number;
    imdbID: string;
    isFavourite?: boolean;
}

export interface SearchPayload {
    Title?: string | null;
    page: number;
}

export interface ApiResponse {
    data: Movie[];
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
}