'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { PaginationMeta } from '@/lib/types/api';

interface PaginationProps {
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
    const { page, totalPages, hasPrevPage, hasNextPage, total } = meta;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-nxt-border gap-4">
            <div className="text-sm text-nxt-text-muted hidden sm:block">
                Mostrando <span className="font-medium text-nxt-text">{total}</span> caso(s) en total
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page - 1)}
                    disabled={!hasPrevPage}
                    aria-label="Página anterior"
                    className="flex-1 sm:flex-none"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    <span className="sr-only sm:not-sr-only">Anterior</span>
                    <span className="sm:hidden">Ant.</span>
                </Button>
                <span className="text-sm text-nxt-text whitespace-nowrap">
                    <span className="font-medium">{page}</span> / <span className="font-medium">{totalPages}</span>
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page + 1)}
                    disabled={!hasNextPage}
                    aria-label="Página siguiente"
                    className="flex-1 sm:flex-none"
                >
                    <span className="sm:hidden">Sig.</span>
                    <span className="sr-only sm:not-sr-only">Siguiente</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </div>
    );
}
