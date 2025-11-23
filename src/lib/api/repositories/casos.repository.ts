import apiClient from '@/lib/api/client';
import type { Caso, CreateCasoDto, UpdateCasoDto, FilterCasosDto } from '@/lib/types/caso';
import type { ApiResponse, PaginatedResponse } from '@/lib/types/api';

interface GetCasosParams {
    page?: number;
    limit?: number;
    search?: string;
    estado?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    month?: number;
    year?: number;
}

export const casosRepository = {
    async getAll(filters?: GetCasosParams): Promise<ApiResponse<PaginatedResponse<Caso>>> {
        const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Caso>>>('/casos', {
            params: filters,
        });
        return data;
    },

    async getById(id: string): Promise<ApiResponse<Caso>> {
        const { data } = await apiClient.get<ApiResponse<Caso>>(`/casos/${id}`);
        return data;
    },

    async create(caso: CreateCasoDto): Promise<ApiResponse<Caso>> {
        const { data } = await apiClient.post<ApiResponse<Caso>>('/casos', caso);
        return data;
    },

    async update(id: string, caso: UpdateCasoDto): Promise<ApiResponse<Caso>> {
        const { data } = await apiClient.patch<ApiResponse<Caso>>(`/casos/${id}`, caso);
        return data;
    },

    async delete(id: string): Promise<ApiResponse<null>> {
        const { data } = await apiClient.delete<ApiResponse<null>>(`/casos/${id}`);
        return data;
    },
};
