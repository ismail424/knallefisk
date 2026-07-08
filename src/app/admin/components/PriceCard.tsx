'use client';

import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    TextField,
    Button,
    Chip,
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Check as CheckIcon,
    ImageOutlined as ImageOutlinedIcon
} from '@mui/icons-material';
import { AdminPrice } from '../../../lib/types';

interface PriceCardProps {
    price: AdminPrice;
    onFieldChange: (id: string, field: keyof AdminPrice, value: string | boolean) => void;
    onEdit: (price: AdminPrice) => void;
    onDelete: (id: string) => void;
}

const priceInputSx = {
    '& .MuiInputBase-input': {
        fontSize: '1.4rem',
        fontWeight: 600,
        py: 1.5
    },
    '& .MuiInputLabel-root': {
        fontSize: '1.05rem'
    }
};

const toggleGroupSx = (activeColor: string) => ({
    width: '100%',
    '& .MuiToggleButton-root': {
        flex: 1,
        minHeight: 52,
        fontSize: '1rem',
        textTransform: 'none',
        color: '#666',
        '&.Mui-selected': {
            backgroundColor: activeColor,
            color: 'white',
            fontWeight: 600,
            '&:hover': {
                backgroundColor: activeColor
            }
        }
    }
});

const PriceCard = ({ price, onFieldChange, onEdit, onDelete }: PriceCardProps) => (
    <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
        {price.image ? (
            <CardMedia
                component="img"
                height="140"
                image={price.image}
                alt={price.title}
                sx={{ objectFit: 'cover' }}
            />
        ) : (
            <Box sx={{
                height: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f0f4f5',
                color: '#9ab8bd'
            }}>
                <ImageOutlinedIcon sx={{ fontSize: '3rem' }} />
            </Box>
        )}
        <CardContent sx={{ flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#333',
                    flexGrow: 1
                }}>
                    {price.title}
                </Typography>
                {!price.is_visible && (
                    <Chip label="Dold" color="default" sx={{ fontSize: '0.9rem' }} />
                )}
            </Box>

            <TextField
                label={`Pris (kr/${price.unit || 'kg'})`}
                value={price.price}
                onChange={(e) => onFieldChange(price.id, 'price', e.target.value)}
                fullWidth
                inputMode="decimal"
                inputProps={{ inputMode: 'decimal' }}
                sx={priceInputSx}
            />

            {price.on_sale && (
                <TextField
                    label={`REA-pris (kr/${price.unit || 'kg'})`}
                    value={price.sale_price || ''}
                    onChange={(e) => onFieldChange(price.id, 'sale_price', e.target.value)}
                    fullWidth
                    inputMode="decimal"
                    inputProps={{ inputMode: 'decimal' }}
                    color="error"
                    sx={priceInputSx}
                />
            )}

            <Box>
                <Typography sx={{ fontSize: '0.95rem', color: '#666', mb: 0.5 }}>
                    Visas på hemsidan?
                </Typography>
                <ToggleButtonGroup
                    value={price.is_visible ? 'yes' : 'no'}
                    exclusive
                    onChange={(_, value) => value && onFieldChange(price.id, 'is_visible', value === 'yes')}
                    sx={toggleGroupSx('#2e7d32')}
                >
                    <ToggleButton value="yes">
                        {price.is_visible && <CheckIcon sx={{ mr: 0.5 }} />}
                        Ja, synlig
                    </ToggleButton>
                    <ToggleButton value="no" sx={{ '&.Mui-selected': { backgroundColor: '#616161 !important' } }}>
                        {!price.is_visible && <CheckIcon sx={{ mr: 0.5 }} />}
                        Nej, dold
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Box>
                <Typography sx={{ fontSize: '0.95rem', color: '#666', mb: 0.5 }}>
                    REA-pris?
                </Typography>
                <ToggleButtonGroup
                    value={price.on_sale ? 'yes' : 'no'}
                    exclusive
                    onChange={(_, value) => value && onFieldChange(price.id, 'on_sale', value === 'yes')}
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
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 1.5,
                mt: 'auto',
                pt: 1.5,
                borderTop: '1px solid #f0f0f0'
            }}>
                <Button
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(price)}
                    sx={{
                        minHeight: 48,
                        fontSize: '1rem',
                        textTransform: 'none',
                        color: 'rgb(68, 143, 155)'
                    }}
                >
                    Redigera
                </Button>
                <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(price.id)}
                    sx={{
                        minHeight: 48,
                        fontSize: '1rem',
                        textTransform: 'none',
                        color: '#d32f2f'
                    }}
                >
                    Ta bort
                </Button>
            </Box>
        </CardContent>
    </Card>
);

export default PriceCard;
