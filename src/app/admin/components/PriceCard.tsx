'use client';

import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    TextField,
    Switch,
    FormControlLabel,
    IconButton,
    Chip
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    VisibilityOff as VisibilityOffIcon,
    ImageOutlined as ImageOutlinedIcon
} from '@mui/icons-material';
import { AdminPrice } from '../../../lib/types';

interface PriceCardProps {
    price: AdminPrice;
    onFieldChange: (id: string, field: keyof AdminPrice, value: string | boolean) => void;
    onEdit: (price: AdminPrice) => void;
    onDelete: (id: string) => void;
}

const PriceCard = ({ price, onFieldChange, onEdit, onDelete }: PriceCardProps) => (
    <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
        }
    }}>
        {price.image ? (
            <CardMedia
                component="img"
                height="120"
                image={price.image}
                alt={price.title}
                sx={{ objectFit: 'cover' }}
            />
        ) : (
            <Box sx={{
                height: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f0f4f5',
                color: '#9ab8bd'
            }}>
                <ImageOutlinedIcon sx={{ fontSize: '2.5rem' }} />
            </Box>
        )}
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h6" sx={{
                fontSize: '1rem',
                fontWeight: 600,
                mb: 1,
                color: '#333'
            }}>
                {price.title}
            </Typography>

            <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
                {!price.is_visible && (
                    <Chip icon={<VisibilityOffIcon />} label="Dold" size="small" color="default" />
                )}
                {price.on_sale && (
                    <Chip label="REA" size="small" color="error" />
                )}
            </Box>

            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <TextField
                        label="Pris"
                        value={price.price}
                        onChange={(e) => onFieldChange(price.id, 'price', e.target.value)}
                        size="small"
                        sx={{
                            width: '80px',
                            '& .MuiInputBase-input': { fontSize: '0.875rem' }
                        }}
                    />
                    <Typography variant="caption" color="text.secondary">
                        kr/{price.unit}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={price.is_visible}
                                onChange={(e) => onFieldChange(price.id, 'is_visible', e.target.checked)}
                                size="small"
                            />
                        }
                        label={<Typography variant="caption">Synlig</Typography>}
                        sx={{ margin: 0 }}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={price.on_sale}
                                onChange={(e) => onFieldChange(price.id, 'on_sale', e.target.checked)}
                                size="small"
                            />
                        }
                        label={<Typography variant="caption">REA</Typography>}
                        sx={{ margin: 0 }}
                    />
                </Box>

                {price.on_sale && (
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            label="REA-pris"
                            value={price.sale_price || ''}
                            onChange={(e) => onFieldChange(price.id, 'sale_price', e.target.value)}
                            size="small"
                            sx={{
                                width: '80px',
                                '& .MuiInputBase-input': { fontSize: '0.875rem' }
                            }}
                        />
                        <Typography variant="caption" component="span" sx={{ ml: 1 }} color="text.secondary">
                            kr/{price.unit}
                        </Typography>
                    </Box>
                )}
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 'auto',
                pt: 1,
                borderTop: '1px solid #f0f0f0'
            }}>
                <IconButton
                    onClick={() => onEdit(price)}
                    size="small"
                    sx={{
                        color: 'rgb(68, 143, 155)',
                        '&:hover': { backgroundColor: 'rgba(68, 143, 155, 0.04)' }
                    }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                    onClick={() => onDelete(price.id)}
                    size="small"
                    sx={{
                        color: '#d32f2f',
                        '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.04)' }
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>
        </CardContent>
    </Card>
);

export default PriceCard;
