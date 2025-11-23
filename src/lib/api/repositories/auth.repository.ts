import apiClient from '@/lib/api/client';
import type { LoginDto, RegisterDto, AuthResponse } from '@/lib/types/user';
import type { ApiResponse } from '@/lib/types/api';

export const authRepository = {
    async login(credentials: LoginDto): Promise<AuthResponse> {
        const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
        return data;
    },

    async register(credentials: RegisterDto): Promise<AuthResponse> {
        const { data } = await apiClient.post<AuthResponse>('/auth/register', credentials);
        return data;
    },

    async logout(): Promise<ApiResponse> {
        const { data } = await apiClient.post<ApiResponse>('/auth/logout');
        return data;
    },
};
