'use client';

import { Dialog, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import { pillButtonSx, DANGER } from './styles';

interface ConfirmDialogProps {
    open: boolean;
    message: string;
    confirmLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog = ({ open, message, confirmLabel = 'Ja, ta bort', onConfirm, onCancel }: ConfirmDialogProps) => (
    <Dialog
        open={open}
        onClose={onCancel}
        maxWidth="xs"
        fullWidth
        sx={{ '& .MuiDialog-paper': { borderRadius: 5 } }}
    >
        <DialogContent sx={{ pt: 4 }}>
            <Typography sx={{ fontSize: '1.1rem', textAlign: 'center', color: '#37474f' }}>
                {message}
            </Typography>
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', gap: 1.25, p: 2.5 }}>
            <Button
                fullWidth
                variant="contained"
                onClick={onConfirm}
                sx={{
                    ...pillButtonSx,
                    minHeight: 46,
                    fontSize: '1rem',
                    backgroundColor: DANGER,
                    '&:hover': { backgroundColor: '#a94a43', boxShadow: 'none' }
                }}
            >
                {confirmLabel}
            </Button>
            <Button
                fullWidth
                variant="outlined"
                onClick={onCancel}
                sx={{
                    ...pillButtonSx,
                    minHeight: 46,
                    fontSize: '1rem',
                    color: '#607d8b',
                    borderColor: '#cfd8dc',
                    ml: '0 !important',
                    '&:hover': { borderColor: '#90a4ae', backgroundColor: '#fafafa' }
                }}
            >
                Avbryt
            </Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmDialog;
