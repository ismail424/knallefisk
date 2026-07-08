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
import { priceInputSx, toggleGroupSx, pillButtonSx, BRAND, BRAND_DARK, DANGER } from './styles';

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
    <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#546e7a', mb: 1 }}>
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
            sx={{ '& .MuiDialog-paper': { borderRadius: isMobile ? 0 : 5 } }}
        >
            <DialogTitle sx={{
                fontSize: '1.2rem',
                fontWeight: 600,
                color: BRAND,
                px: { xs: 2.5, md: 3 },
                py: 1.75
            }}>
                {isEditing ? `Redigera: ${price.title || ''}` : 'Ny produkt'}
            </DialogTitle>
            <DialogContent dividers sx={{ px: { xs: 2.5, md: 3 }, py: 2.5, borderColor: '#f0f4f5' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box>
                        <SectionLabel>Namn</SectionLabel>
                        <TextField
                            fullWidth
                            placeholder="t.ex. Torskfilé"
                            value={price.title || ''}
                            onChange={(e) => onChange({ ...price, title: e.target.value })}
                            sx={{
                                '& .MuiOutlinedInput-root': { borderRadius: 3 },
                                '& .MuiInputBase-input': { fontSize: '1.1rem', py: 1.3 }
                            }}
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
                            <FormControl sx={{ flex: 1, minWidth: 96 }}>
                                <InputLabel>Per</InputLabel>
                                <Select
                                    label="Per"
                                    value={price.unit || 'kg'}
                                    onChange={(e) => onChange({ ...price, unit: e.target.value })}
                                    sx={{ borderRadius: 3, fontSize: '1.1rem', '& .MuiSelect-select': { py: 1.7 } }}
                                >
                                    {units.map(unit => (
                                        <MenuItem key={unit} value={unit} sx={{ fontSize: '1rem', minHeight: 44 }}>
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
                            sx={toggleGroupSx(DANGER)}
                        >
                            <ToggleButton value="yes">
                                {price.on_sale && <CheckIcon sx={{ mr: 0.5, fontSize: 18 }} />}
                                Ja, REA
                            </ToggleButton>
                            <ToggleButton value="no">
                                {!price.on_sale && <CheckIcon sx={{ mr: 0.5, fontSize: 18 }} />}
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
                            sx={toggleGroupSx(BRAND)}
                        >
                            <ToggleButton value="yes">
                                {price.is_visible !== false && <CheckIcon sx={{ mr: 0.5, fontSize: 18 }} />}
                                Ja, synlig
                            </ToggleButton>
                            <ToggleButton value="no">
                                {price.is_visible === false && <CheckIcon sx={{ mr: 0.5, fontSize: 18 }} />}
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
                                        maxWidth: 260,
                                        height: 140,
                                        objectFit: 'cover',
                                        borderRadius: 3,
                                        border: '1px solid #e8eef0'
                                    }}
                                />
                                <Button
                                    onClick={() => onChange({ ...price, image: '' })}
                                    sx={{ ...pillButtonSx, mt: 0.5, fontSize: '0.9rem', color: DANGER }}
                                >
                                    Ta bort bilden
                                </Button>
                            </Box>
                        )}

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1, mb: 2 }}>
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                                disabled={isUploading}
                                sx={{
                                    ...pillButtonSx,
                                    minHeight: 44,
                                    backgroundColor: BRAND,
                                    '&:hover': { backgroundColor: BRAND_DARK, boxShadow: 'none' }
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
                                sx={{
                                    ...pillButtonSx,
                                    minHeight: 44,
                                    color: BRAND,
                                    borderColor: '#cfe0e3',
                                    '&:hover': { borderColor: BRAND, backgroundColor: 'rgba(68,143,155,0.04)' }
                                }}
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
                                <Typography sx={{ fontSize: '0.9rem', color: '#78909c', mb: 1 }}>
                                    ...eller välj en tidigare bild:
                                </Typography>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
                                    gap: 1,
                                    maxHeight: 220,
                                    overflowY: 'auto',
                                    border: '1px solid #e8eef0',
                                    borderRadius: 3,
                                    p: 1,
                                    bgcolor: '#fafcfc'
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
                                                height: 72,
                                                objectFit: 'cover',
                                                borderRadius: 2,
                                                cursor: 'pointer',
                                                border: price.image === image.url ? `3px solid ${BRAND}` : '1px solid #e8eef0'
                                            }}
                                        />
                                    ))}
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: { xs: 2.5, md: 3 }, py: 1.75, gap: 1 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        ...pillButtonSx,
                        flex: 1,
                        minHeight: 46,
                        fontSize: '1rem',
                        color: '#607d8b',
                        borderColor: '#cfd8dc',
                        '&:hover': { borderColor: '#90a4ae', backgroundColor: '#fafafa' }
                    }}
                >
                    Avbryt
                </Button>
                <Button
                    onClick={onSave}
                    variant="contained"
                    sx={{
                        ...pillButtonSx,
                        flex: 2,
                        minHeight: 46,
                        fontSize: '1rem',
                        fontWeight: 600,
                        backgroundColor: BRAND,
                        '&:hover': { backgroundColor: BRAND_DARK, boxShadow: 'none' },
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
