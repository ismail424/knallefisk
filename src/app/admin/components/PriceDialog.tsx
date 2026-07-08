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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { AdminPrice, UploadedImage } from '../../../lib/types';
import { priceInputSx, toggleGroupSx } from './styles';

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

const COMMON_UNITS = ['kg', 'hg', 'st', 'förp'];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <Typography sx={{ fontSize: '1.05rem', fontWeight: 600, color: '#444', mb: 1 }}>
        {children}
    </Typography>
);

const PriceDialog = ({
    open, isMobile, isEditing, isUploading, price, images,
    onChange, onUpload, onSave, onClose
}: PriceDialogProps) => {
    const units = COMMON_UNITS.includes(price.unit || 'kg')
        ? COMMON_UNITS
        : [...COMMON_UNITS, price.unit as string];

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
            maxWidth="sm"
            fullWidth
            fullScreen={isMobile}
        >
            <DialogTitle sx={{
                fontSize: '1.35rem',
                fontWeight: 600,
                color: '#448f9b',
                px: { xs: 2.5, md: 3 },
                py: 2
            }}>
                {isEditing ? `Redigera: ${price.title || ''}` : 'Ny produkt'}
            </DialogTitle>
            <DialogContent dividers sx={{ px: { xs: 2.5, md: 3 }, py: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                    <Box>
                        <SectionLabel>Namn</SectionLabel>
                        <TextField
                            fullWidth
                            placeholder="t.ex. Torskfilé"
                            value={price.title || ''}
                            onChange={(e) => onChange({ ...price, title: e.target.value })}
                            sx={{ '& .MuiInputBase-input': { fontSize: '1.2rem', py: 1.5 } }}
                        />
                    </Box>

                    <Box>
                        <SectionLabel>Pris</SectionLabel>
                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                            <TextField
                                label="Pris"
                                value={price.price || ''}
                                onChange={(e) => onChange({ ...price, price: e.target.value })}
                                inputProps={{ inputMode: 'decimal' }}
                                sx={{ ...priceInputSx, flex: 2 }}
                            />
                            <FormControl sx={{ flex: 1, minWidth: 100 }}>
                                <InputLabel sx={{ fontSize: '1.05rem' }}>Per</InputLabel>
                                <Select
                                    label="Per"
                                    value={price.unit || 'kg'}
                                    onChange={(e) => onChange({ ...price, unit: e.target.value })}
                                    sx={{ fontSize: '1.2rem', '& .MuiSelect-select': { py: 2 } }}
                                >
                                    {units.map(unit => (
                                        <MenuItem key={unit} value={unit} sx={{ fontSize: '1.1rem', minHeight: 48 }}>
                                            {unit}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    <Box>
                        <SectionLabel>REA-pris?</SectionLabel>
                        <ToggleButtonGroup
                            value={price.on_sale ? 'yes' : 'no'}
                            exclusive
                            onChange={(_, value) => value && onChange({ ...price, on_sale: value === 'yes' })}
                            sx={toggleGroupSx('#d32f2f')}
                        >
                            <ToggleButton value="yes">
                                {price.on_sale && <CheckIcon sx={{ mr: 0.5 }} />}
                                Ja, REA
                            </ToggleButton>
                            <ToggleButton value="no" sx={{ '&.Mui-selected': { backgroundColor: '#616161 !important' } }}>
                                {!price.on_sale && <CheckIcon sx={{ mr: 0.5 }} />}
                                Nej
                            </ToggleButton>
                        </ToggleButtonGroup>
                        {price.on_sale && (
                            <TextField
                                fullWidth
                                label={`REA-pris (kr/${price.unit || 'kg'})`}
                                value={price.sale_price || ''}
                                onChange={(e) => onChange({ ...price, sale_price: e.target.value })}
                                inputProps={{ inputMode: 'decimal' }}
                                color="error"
                                sx={{ ...priceInputSx, mt: 1.5 }}
                            />
                        )}
                    </Box>

                    <Box>
                        <SectionLabel>Visas på hemsidan?</SectionLabel>
                        <ToggleButtonGroup
                            value={price.is_visible !== false ? 'yes' : 'no'}
                            exclusive
                            onChange={(_, value) => value && onChange({ ...price, is_visible: value === 'yes' })}
                            sx={toggleGroupSx('#2e7d32')}
                        >
                            <ToggleButton value="yes">
                                {price.is_visible !== false && <CheckIcon sx={{ mr: 0.5 }} />}
                                Ja, synlig
                            </ToggleButton>
                            <ToggleButton value="no" sx={{ '&.Mui-selected': { backgroundColor: '#616161 !important' } }}>
                                {price.is_visible === false && <CheckIcon sx={{ mr: 0.5 }} />}
                                Nej, dold
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    <Box>
                        <SectionLabel>Bild</SectionLabel>

                        {price.image && (
                            <Box sx={{ mb: 2, textAlign: 'center' }}>
                                <Box
                                    component="img"
                                    src={price.image}
                                    alt="Vald bild"
                                    sx={{
                                        width: '100%',
                                        maxWidth: 280,
                                        height: 160,
                                        objectFit: 'cover',
                                        borderRadius: 2,
                                        border: '1px solid #ddd'
                                    }}
                                />
                                <Button
                                    onClick={() => onChange({ ...price, image: '' })}
                                    sx={{ mt: 0.5, fontSize: '0.95rem', textTransform: 'none', color: '#d32f2f' }}
                                >
                                    Ta bort bilden
                                </Button>
                            </Box>
                        )}

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5, mb: 2 }}>
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                                disabled={isUploading}
                                sx={{
                                    minHeight: 52,
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    backgroundColor: '#448f9b',
                                    '&:hover': { backgroundColor: '#357a84' }
                                }}
                            >
                                {isUploading ? 'Laddar upp...' : '📷 Ta en bild'}
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    capture="environment"
                                    onChange={handleUpload}
                                />
                            </Button>
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                                disabled={isUploading}
                                sx={{ minHeight: 52, fontSize: '1rem', textTransform: 'none' }}
                            >
                                {isUploading ? 'Laddar upp...' : 'Välj bild från mobilen'}
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleUpload}
                                />
                            </Button>
                        </Box>

                        {images.length > 0 && (
                            <>
                                <Typography sx={{ fontSize: '0.95rem', color: '#666', mb: 1 }}>
                                    ...eller välj en tidigare bild:
                                </Typography>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
                                    gap: 1,
                                    maxHeight: 240,
                                    overflowY: 'auto',
                                    border: '1px solid #ddd',
                                    borderRadius: 2,
                                    p: 1,
                                    bgcolor: '#f9f9f9'
                                }}>
                                    {images.map((image) => (
                                        <Box
                                            key={image.id}
                                            component="img"
                                            src={image.url}
                                            alt={image.name}
                                            onClick={() => onChange({ ...price, image: image.url })}
                                            sx={{
                                                width: '100%',
                                                height: 80,
                                                objectFit: 'cover',
                                                borderRadius: 1,
                                                cursor: 'pointer',
                                                border: price.image === image.url ? '3px solid #448f9b' : '1px solid #ddd'
                                            }}
                                        />
                                    ))}
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: { xs: 2.5, md: 3 }, py: 2, gap: 1.5 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{ flex: 1, minHeight: 56, fontSize: '1.1rem', textTransform: 'none' }}
                >
                    Avbryt
                </Button>
                <Button
                    onClick={onSave}
                    variant="contained"
                    sx={{
                        flex: 2,
                        minHeight: 56,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        backgroundColor: '#448f9b',
                        '&:hover': { backgroundColor: '#357a84' },
                        ml: '0 !important'
                    }}
                >
                    Spara
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PriceDialog;
