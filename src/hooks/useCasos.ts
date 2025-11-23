import { useState, useCallback, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { casosRepository } from '@/lib/api/repositories/casos.repository';
import { debounce } from '@/lib/utils/debounce';
import type { Caso, EstadoCaso } from '@/lib/types/caso';
import type { CasoFormData } from '@/lib/validations/caso.schema';
import type { PaginationMeta } from '@/lib/types/api';

export function useCasos() {
    const [casos, setCasos] = useState<Caso[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [estado, setEstado] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');

    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                setSearch(value);
                setPage(1);
            }, 300),
        []
    );

    const fetchCasos = useCallback(async () => {
        setIsLoading(true);
        try {
            const [yearStr, monthStr] = dateFilter.split('-');
            const year = yearStr ? parseInt(yearStr) : undefined;
            const month = monthStr ? parseInt(monthStr) : undefined;

            const response = await casosRepository.getAll({
                page,
                limit,
                search: search || undefined,
                estado: (estado as EstadoCaso) || undefined,
                year,
                month,
                sortBy,
                order,
            });
            setCasos(response.data.items);
            setMeta(response.data.meta);
        } catch (error) {
            toast.error('Error al cargar los casos');
        } finally {
            setIsLoading(false);
        }
    }, [page, limit, search, estado, dateFilter, sortBy, order]);

    useEffect(() => {
        fetchCasos();
    }, [fetchCasos]);

    const handleSearchChange = (value: string) => {
        setSearchInput(value);
        debouncedSearch(value);
    };

    const handleEstadoChange = (value: string) => {
        setEstado(value);
        setPage(1);
    };

    const handleDateChange = (value: string) => {
        setDateFilter(value);
        setPage(1);
    };

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setOrder(order === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setOrder('asc');
        }
    };

    const createCaso = async (data: CasoFormData) => {
        setIsSubmitting(true);
        try {
            await casosRepository.create(data);
            toast.success('Caso creado exitosamente');
            fetchCasos();
            return true;
        } catch (error: unknown) {
            const errorMessage =
                (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                'Error al crear el caso';
            toast.error(errorMessage);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateCaso = async (id: string, data: CasoFormData) => {
        setIsSubmitting(true);
        try {
            await casosRepository.update(id, data);
            toast.success('Caso actualizado exitosamente');
            fetchCasos();
            return true;
        } catch (error: unknown) {
            const errorMessage =
                (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                'Error al actualizar el caso';
            toast.error(errorMessage);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteCaso = async (id: string) => {
        setIsSubmitting(true);
        try {
            await casosRepository.delete(id);
            toast.success('Caso eliminado exitosamente');
            fetchCasos();
            return true;
        } catch (error) {
            toast.error('Error al eliminar el caso');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        casos,
        meta,
        isLoading,
        isSubmitting,
        searchInput,
        estado,
        dateFilter,
        page,
        sortBy,
        order,
        setPage,
        handleSearchChange,
        handleEstadoChange,
        handleDateChange,
        handleSort,
        createCaso,
        updateCaso,
        deleteCaso,
        refreshCasos: fetchCasos,
    };
}
