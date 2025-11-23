'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { CasosTable } from '@/components/casos/CasosTable';
import { CasosFilters } from '@/components/casos/CasosFilters';
import { CasoModal } from '@/components/casos/CasoModal';
import { DeleteCasoDialog } from '@/components/casos/DeleteCasoDialog';
import { Pagination } from '@/components/casos/Pagination';
import { useCasos } from '@/hooks/useCasos';
import type { Caso } from '@/lib/types/caso';
import type { CasoFormData } from '@/lib/validations/caso.schema';

export function CasosPageClient() {
    const {
        casos,
        meta,
        isLoading,
        isSubmitting,
        searchInput,
        estado,
        dateFilter,
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
    } = useCasos();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCaso, setSelectedCaso] = useState<Caso | null>(null);
    const [casoToDelete, setCasoToDelete] = useState<Caso | null>(null);

    const handleCreate = () => {
        setSelectedCaso(null);
        setIsModalOpen(true);
    };

    const handleEdit = (caso: Caso) => {
        setSelectedCaso(caso);
        setIsModalOpen(true);
    };

    const handleView = (caso: Caso) => {
        setSelectedCaso(caso);
        setIsModalOpen(true);
    };

    const handleDelete = (caso: Caso) => {
        setCasoToDelete(caso);
        setIsDeleteDialogOpen(true);
    };

    const handleSubmit = async (data: CasoFormData) => {
        let success = false;
        if (selectedCaso) {
            success = await updateCaso(selectedCaso.id, data);
        } else {
            success = await createCaso(data);
        }

        if (success) {
            setIsModalOpen(false);
            setSelectedCaso(null);
        }
    };

    const handleConfirmDelete = async () => {
        if (!casoToDelete) return;

        const success = await deleteCaso(casoToDelete.id);
        if (success) {
            setIsDeleteDialogOpen(false);
            setCasoToDelete(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold gradient-nxt-text">Mis Casos</h1>
                    <p className="text-nxt-text-muted mt-1">
                        Gestiona todos tus expedientes legales
                    </p>
                </div>
                <Button onClick={handleCreate} aria-label="Crear nuevo caso">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Caso
                </Button>
            </div>

            <CasosFilters
                search={searchInput}
                estado={estado}
                dateFilter={dateFilter}
                onSearchChange={handleSearchChange}
                onEstadoChange={handleEstadoChange}
                onDateChange={handleDateChange}
            />

            <div className="bg-nxt-card-bg border-2 border-nxt-border rounded-lg overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader size="lg" />
                    </div>
                ) : (
                    <>
                        <CasosTable
                            casos={casos}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onView={handleView}
                            sortBy={sortBy}
                            sortOrder={order}
                            onSort={handleSort}
                        />
                        {meta && <Pagination meta={meta} onPageChange={setPage} />}
                    </>
                )}
            </div>

            <CasoModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                caso={selectedCaso}
                onSubmit={handleSubmit}
                isLoading={isSubmitting}
            />

            <DeleteCasoDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                caso={casoToDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isSubmitting}
            />
        </div>
    );
}
