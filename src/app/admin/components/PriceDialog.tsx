'use client';

import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    TextField,
    Button,
    Switch,
    FormControlLabel
} from '@mui/material';
import { AdminPrice, UploadedImage } from '../../../lib/types';

interface PriceDialogProps {
    open: boolean;
    isMobile: boolean;
    isEditing: boolean;
    isUploading: boolean;
    price: Partial<AdminPrice>;
    images: UploadedImage[];
    onChange: (price: Partial<AdminPrice>) => void;
    onUpload: (file: File) => Promise<UploadedImage | null>;
    onSave: () => void;
    onClose: () => void;
}

const PriceDialog = ({
    open, isMobile, isEditing, isUploading, price, images,
    onChange, onUpload, onSave, onClose
}: PriceDialogProps) => {
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const newImage = await onUpload(file);
        if (newImage) {
            onChange({ ...price, image: newImage.url });
        }
        e.target.value = '';
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            fullScreen={isMobile}
            sx={{
                '& .MuiDialog-paper': {
                    m: { xs: 0, sm: 2 },
                    maxHeight: { xs: '100%', sm: 'calc(100% - 64px)' }
                }
            }}
        >
            <DialogTitle sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                px: { xs: 2, md: 3 },
                py: { xs: 1.5, md: 2 }
            }}>
                {isEditing ? 'Redigera pris' : 'Skapa nytt pris'}
            </DialogTitle>
            <DialogContent sx={{ px: { xs: 2, md: 3 }, py: { xs: 1, md: 2 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        fullWidth
                        label="Titel"
                        value={price.title || ''}
                        onChange={(e) => onChange({ ...price, title: e.target.value })}
                    />
                    <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <TextField
                            fullWidth
                            label="Pris"
                            value={price.price || ''}
                            onChange={(e) => onChange({ ...price, price: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Enhet"
                            value={price.unit || 'kg'}
                            onChange={(e) => onChange({ ...price, unit: e.target.value })}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={price.on_sale || false}
                                    onChange={(e) => onChange({ ...price, on_sale: e.target.checked })}
                                />
                            }
                            label="På rea"
                        />
                        {price.on_sale && (
                            <TextField
                                label="Rea-pris"
                                value={price.sale_price || ''}
                                onChange={(e) => onChange({ ...price, sale_price: e.target.value })}
                                size="small"
                                sx={{ minWidth: 120 }}
                            />
                        )}
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={price.is_visible !== false}
                                    onChange={(e) => onChange({ ...price, is_visible: e.target.checked })}
                                />
                            }
                            label="Synlig"
                        />
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>Bild</Typography>

                        {price.image && (
                            <Box sx={{ mb: 2 }}>
                                <Box
                                    component="img"
                                    src={price.image}
                                    alt="Förhandsvisning"
                                    sx={{
                                        maxWidth: '200px',
                                        maxHeight: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd'
                                    }}
                                />
                                <Button
                                    size="small"
                                    onClick={() => onChange({ ...price, image: '' })}
                                    sx={{ mt: 1, display: 'block' }}
                                >
                                    Ta bort bild
                                </Button>
                            </Box>
                        )}

                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Välj från bildbibliotek:
                        </Typography>

                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                            gap: 1,
                            mb: 2,
                            maxHeight: '200px',
                            overflowY: 'auto',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            p: 1,
                            bgcolor: '#f9f9f9'
                        }}>
                            {images.map((image) => (
                                <Box
                                    key={image.id}
                                    component="img"
                                    src={image.url}
                                    alt={image.name}
                                    sx={{
                                        width: '80px',
                                        height: '60px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        border: price.image === image.url ? '2px solid #1976d2' : '1px solid #ddd',
                                        '&:hover': {
                                            border: '2px solid #1976d2',
                                            opacity: 0.8
                                        }
                                    }}
                                    onClick={() => onChange({ ...price, image: image.url })}
                                />
                            ))}

                            {images.length === 0 && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'gray',
                                        textAlign: 'center',
                                        gridColumn: '1 / -1',
                                        py: 2
                                    }}
                                >
                                    Inga bilder i bibliotek än
                                </Typography>
                            )}
                        </Box>

                        <Button
                            variant="outlined"
                            component="label"
                            size="small"
                            fullWidth
                            disabled={isUploading}
                        >
                            {isUploading ? 'Laddar upp...' : 'Ladda upp ny bild till bibliotek'}
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleUpload}
                            />
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{
                px: { xs: 2, md: 3 },
                py: { xs: 1.5, md: 2 },
                gap: 1
            }}>
                <Button onClick={onClose} fullWidth={isMobile}>
                    Avbryt
                </Button>
                <Button
                    onClick={onSave}
                    variant="contained"
                    fullWidth={isMobile}
                    sx={{
                        backgroundColor: '#448f9b',
                        '&:hover': { backgroundColor: '#357a84' }
                    }}
                >
                    {isEditing ? 'Uppdatera' : 'Skapa'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PriceDialog;
