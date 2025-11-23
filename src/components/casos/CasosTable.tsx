'use client';

import { useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type ColumnDef,
} from '@tanstack/react-table';
import { Edit, Trash2, Eye, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/Tooltip';
import type { Caso, EstadoCaso } from '@/lib/types/caso';

interface CasosTableProps {
    casos: Caso[];
    onEdit: (caso: Caso) => void;
    onDelete: (caso: Caso) => void;
    onView: (caso: Caso) => void;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    onSort?: (column: string) => void;
}

const estadoColors: Record<EstadoCaso, string> = {
    ABIERTO: 'bg-green-500/20 text-green-400 border-green-500/50',
    EN_PROCESO: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    CERRADO: 'bg-red-500/20 text-red-400 border-red-500/50',
    ARCHIVADO: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
};

const estadoLabels: Record<EstadoCaso, string> = {
    ABIERTO: 'Abierto',
    EN_PROCESO: 'En Proceso',
    CERRADO: 'Cerrado',
    ARCHIVADO: 'Archivado',
};

export function CasosTable({ casos, onEdit, onDelete, onView, sortBy, sortOrder, onSort }: CasosTableProps) {
    const columns = useMemo<ColumnDef<Caso>[]>(
        () => [
            {
                accessorKey: 'nombre',
                header: () => (
                    <Button
                        variant="ghost"
                        onClick={() => onSort?.('nombre')}
                        className="flex items-center gap-2 hover:bg-transparent hover:text-nxt-cyan p-0 font-semibold"
                    >
                        Nombre
                        {sortBy === 'nombre' ? (
                            sortOrder === 'asc' ? (
                                <ArrowUp className="w-4 h-4" />
                            ) : (
                                <ArrowDown className="w-4 h-4" />
                            )
                        ) : (
                            <ArrowUpDown className="w-4 h-4 opacity-50" />
                        )}
                    </Button>
                ),
                cell: ({ row }) => (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="font-medium text-nxt-text truncate max-w-[300px] cursor-help">
                                {row.original.nombre}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{row.original.nombre}</p>
                        </TooltipContent>
                    </Tooltip>
                ),
            },
            {
                accessorKey: 'descripcion',
                header: 'Descripción',
                cell: ({ row }) => (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="text-nxt-text-muted truncate max-w-xs cursor-help">
                                {row.original.descripcion}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                            <p>{row.original.descripcion}</p>
                        </TooltipContent>
                    </Tooltip>
                ),
            },
            {
                accessorKey: 'estado',
                header: () => <div className="text-center">Estado</div>,
                cell: ({ row }) => (
                    <div className="flex justify-center">
                        <span
                            className={`inline-flex items-center justify-center w-24 py-0.5 rounded-full text-xs font-medium border ${estadoColors[row.original.estado]
                                }`}
                        >
                            {estadoLabels[row.original.estado]}
                        </span>
                    </div>
                ),
            },
            {
                accessorKey: 'createdAt',
                header: () => (
                    <div className="flex justify-center">
                        <Button
                            variant="ghost"
                            onClick={() => onSort?.('createdAt')}
                            className="flex items-center gap-2 hover:bg-transparent hover:text-nxt-cyan p-0 font-semibold"
                        >
                            Fecha de Creación
                            {sortBy === 'createdAt' ? (
                                sortOrder === 'asc' ? (
                                    <ArrowUp className="w-4 h-4" />
                                ) : (
                                    <ArrowDown className="w-4 h-4" />
                                )
                            ) : (
                                <ArrowUpDown className="w-4 h-4 opacity-50" />
                            )}
                        </Button>
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="text-nxt-text-muted text-sm text-center">
                        {new Date(row.original.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </div>
                ),
            },
            {
                id: 'actions',
                header: () => <div className="text-center">Acciones</div>,
                cell: ({ row }) => (
                    <div className="flex justify-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onView(row.original)}
                            aria-label={`Ver detalles de ${row.original.nombre}`}
                            title="Ver detalles"
                            className="hover:bg-blue-500/20 hover:text-blue-400 hover:scale-110 transition-all"
                        >
                            <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(row.original)}
                            aria-label={`Editar ${row.original.nombre}`}
                            title="Editar"
                            className="hover:bg-yellow-500/20 hover:text-yellow-400 hover:scale-110 transition-all"
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(row.original)}
                            aria-label={`Eliminar ${row.original.nombre}`}
                            title="Eliminar"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/20 hover:scale-110 transition-all"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ),
            },
        ],
        [onEdit, onDelete, onView, sortBy, sortOrder, onSort]
    );

    const table = useReactTable({
        data: casos,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (casos.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-nxt-text-muted">No se encontraron casos</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full" role="table">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="border-b border-nxt-border">
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="text-left p-4 text-sm font-semibold text-nxt-text"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="border-b border-nxt-border hover:bg-nxt-card-bg/50 transition-colors"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-4">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
