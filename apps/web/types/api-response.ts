export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export interface ApiResponseWithPagination<T> {
    success: boolean;
    data: T;
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
    }
}