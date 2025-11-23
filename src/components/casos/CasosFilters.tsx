'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';
import { EstadoCaso } from '@/lib/types/caso';

interface CasosFiltersProps {
    search: string;
    estado: string;
    dateFilter: string;
    onSearchChange: (value: string) => void;
    onEstadoChange: (value: string) => void;
    onDateChange: (value: string) => void;
}

export function CasosFilters({
    search,
    estado,
    dateFilter,
    onSearchChange,
    onEstadoChange,
    onDateChange,
}: CasosFiltersProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nxt-text-muted" />
                    <Input
                        id="search"
                        type="text"
                        placeholder="Buscar por nombre o descripción..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="estado">Filtrar por Estado</Label>
                <Select
                    id="estado"
                    value={estado}
                    onChange={(e) => onEstadoChange(e.target.value)}
                >
                    <option value="">Todos los estados</option>
                    <option value={EstadoCaso.ABIERTO}>Abierto</option>
                    <option value={EstadoCaso.EN_PROCESO}>En Proceso</option>
                    <option value={EstadoCaso.CERRADO}>Cerrado</option>
                    <option value={EstadoCaso.ARCHIVADO}>Archivado</option>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="date">Filtrar por Fecha</Label>
                <Input
                    id="date"
                    type="month"
                    value={dateFilter}
                    onChange={(e) => onDateChange(e.target.value)}
                    className="w-full"
                />
            </div>
        </div>
    );
}
