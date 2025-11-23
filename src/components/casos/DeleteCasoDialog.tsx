'use client';

import { Dialog, DialogContent, DialogClose } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { AlertTriangle } from 'lucide-react';
import type { Caso } from '@/lib/types/caso';

interface DeleteCasoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    caso: Caso | null;
    onConfirm: () => Promise<void>;
    isLoading: boolean;
}

export function DeleteCasoDialog({
    open,
    onOpenChange,
    caso,
    onConfirm,
    isLoading,
}: DeleteCasoDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogClose onClose={() => onOpenChange(false)} />
                <div className="flex flex-col items-center text-center space-y-4 py-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-nxt-text mb-2">
                            ¿Eliminar Caso?
                        </h2>
                        <p className="text-nxt-text-muted">
                            Estás a punto de eliminar el caso{' '}
                            <span className="font-semibold text-nxt-text">
                                &quot;{caso?.nombre}&quot;
                            </span>
                            . Esta acción no se puede deshacer.
                        </p>
                    </div>
                    <div className="flex gap-3 w-full pt-2">
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
                            type="button"
                            variant="destructive"
                            onClick={onConfirm}
                            disabled={isLoading}
                            aria-busy={isLoading}
                            className="flex-1"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader size="sm" />
                                    Eliminando...
                                </span>
                            ) : (
                                'Eliminar'
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
