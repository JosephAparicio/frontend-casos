export interface User {
    id: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginDto {
    username: string;
    password: string;
}

export interface RegisterDto {
    username: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    data: {
        user: User;
    };
}
