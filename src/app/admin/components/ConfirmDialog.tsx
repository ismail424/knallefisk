'use client';

import { Dialog, DialogContent, DialogActions, Typography, Button } from '@mui/material';

interface ConfirmDialogProps {
    open: boolean;
    message: string;
    confirmLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog = ({ open, message, confirmLabel = 'Ja, ta bort', onConfirm, onCancel }: ConfirmDialogProps) => (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
        <DialogContent sx={{ pt: 4 }}>
            <Typography sx={{ fontSize: '1.15rem', textAlign: 'center' }}>
                {message}
            </Typography>
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', gap: 1.5, p: 3 }}>
            <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={onConfirm}
                sx={{ minHeight: 52, fontSize: '1.1rem' }}
            >
                {confirmLabel}
            </Button>
            <Button
                fullWidth
                variant="outlined"
                onClick={onCancel}
                sx={{ minHeight: 52, fontSize: '1.1rem', ml: '0 !important' }}
            >
                Avbryt
            </Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmDialog;
