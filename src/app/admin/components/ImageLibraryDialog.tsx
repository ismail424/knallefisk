'use client';

import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    IconButton,
    Chip
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { UploadedImage } from '../../../lib/types';

interface ImageLibraryDialogProps {
    open: boolean;
    isMobile: boolean;
    images: UploadedImage[];
    onSelect: (imageUrl: string) => void;
    onDelete: (imageUrl: string, imageId: string) => void;
    onClose: () => void;
}

const ImageLibraryDialog = ({ open, isMobile, images, onSelect, onDelete, onClose }: ImageLibraryDialogProps) => (
    <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
    >
        <DialogTitle sx={{
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            px: { xs: 2, md: 3 }
        }}>
            Bildbibliotek
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2, md: 3 } }}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)'
                },
                gap: 2
            }}>
                {images.map((image) => (
                    <Card key={image.id}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={image.url}
                            alt={image.name}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => onSelect(image.url)}
                        />
                        <CardContent sx={{ p: 1 }}>
                            <Typography variant="caption" noWrap title={image.name}>
                                {image.name}
                            </Typography>
                            {image.size && (
                                <Typography variant="caption" sx={{ display: 'block', color: 'gray', fontSize: '0.7rem' }}>
                                    {(image.size / 1024).toFixed(1)} KB
                                </Typography>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                                <Chip
                                    label="Använd"
                                    size="small"
                                    onClick={() => onSelect(image.url)}
                                    sx={{ fontSize: '0.65rem', height: '20px' }}
                                />
                                <IconButton
                                    size="small"
                                    onClick={() => onDelete(image.url, image.id)}
                                    color="error"
                                    sx={{ p: 0.5 }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            {images.length === 0 && (
                <Typography sx={{ textAlign: 'center', py: 4, color: 'gray' }}>
                    Inga bilder uppladdade än
                </Typography>
            )}
        </DialogContent>
        <DialogActions sx={{
            px: { xs: 2, md: 3 },
            py: { xs: 1.5, md: 2 }
        }}>
            <Button onClick={onClose} fullWidth={isMobile}>
                Stäng
            </Button>
        </DialogActions>
    </Dialog>
);

export default ImageLibraryDialog;
