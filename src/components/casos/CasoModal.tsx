'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { casoSchema, type CasoFormData } from '@/lib/validations/caso.schema';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';
import { Loader } from '@/components/ui/Loader';
import { EstadoCaso, type Caso } from '@/lib/types/caso';

interface CasoModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    caso?: Caso | null;
    onSubmit: (data: CasoFormData) => Promise<void>;
    isLoading: boolean;
}

export function CasoModal({ open, onOpenChange, caso, onSubmit, isLoading }: CasoModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CasoFormData>({
        resolver: zodResolver(casoSchema),
        defaultValues: caso || {
            nombre: '',
            descripcion: '',
            estado: EstadoCaso.ABIERTO,
        },
    });

    useEffect(() => {
        if (caso) {
            reset(caso);
        } else {
            reset({
                nombre: '',
                descripcion: '',
                estado: EstadoCaso.ABIERTO,
            });
        }
    }, [caso, reset]);

    const handleFormSubmit = async (data: CasoFormData) => {
        await onSubmit(data);
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent title={caso ? 'Editar Caso' : 'Nuevo Caso'}>
                <DialogClose onClose={() => onOpenChange(false)} />
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-4" noValidate>
                    <div className="space-y-2">
                        <Label htmlFor="nombre" required>
                            Nombre del Caso
                        </Label>
                        <Input
                            id="nombre"
                            type="text"
                            placeholder="Ej: Demanda por incumplimiento..."
                            error={errors.nombre?.message}
                            {...register('nombre')}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="descripcion" required>
                            Descripción
                        </Label>
                        <Textarea
                            id="descripcion"
                            placeholder="Describe los detalles del caso..."
                            rows={4}
                            error={errors.descripcion?.message}
                            {...register('descripcion')}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="estado">Estado</Label>
                        <Select
                            id="estado"
                            error={errors.estado?.message}
                            {...register('estado')}
                            disabled={isLoading}
                        >
                            <option value={EstadoCaso.ABIERTO}>Abierto</option>
                            <option value={EstadoCaso.EN_PROCESO}>En Proceso</option>
                            <option value={EstadoCaso.CERRADO}>Cerrado</option>
                            <option value={EstadoCaso.ARCHIVADO}>Archivado</option>
                        </Select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            aria-busy={isLoading}
                            className="flex-1"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader size="sm" />
                                    {caso ? 'Actualizando...' : 'Creando...'}
                                </span>
                            ) : (
                                caso ? 'Actualizar Caso' : 'Crear Caso'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
