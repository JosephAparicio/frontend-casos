export enum EstadoCaso {
    ABIERTO = 'ABIERTO',
    EN_PROCESO = 'EN_PROCESO',
    CERRADO = 'CERRADO',
    ARCHIVADO = 'ARCHIVADO',
}

export interface Caso {
    id: string;
    nombre: string;
    descripcion: string;
    estado: EstadoCaso;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCasoDto {
    nombre: string;
    descripcion: string;
    estado?: EstadoCaso;
}

export interface UpdateCasoDto {
    nombre?: string;
    descripcion?: string;
    estado?: EstadoCaso;
}

export interface FilterCasosDto {
    page?: number;
    limit?: number;
    estado?: EstadoCaso;
    search?: string;
    sortBy?: 'createdAt' | 'updatedAt' | 'nombre';
    order?: 'asc' | 'desc';
}
