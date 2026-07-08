'use client';

import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Chip,
    Collapse,
    Divider,
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Check as CheckIcon,
    ExpandMore as ExpandMoreIcon,
    ImageOutlined as ImageOutlinedIcon
} from '@mui/icons-material';
import { AdminPrice } from '../../../lib/types';

interface PriceCardProps {
    price: AdminPrice;
    expanded: boolean;
    onToggleExpand: () => void;
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

const PriceCard = ({ price, expanded, onToggleExpand, onFieldChange, onEdit, onDelete }: PriceCardProps) => (
    <Card sx={{
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
    }}>
        {/* Compact overview row - tap to expand */}
        <Box
            onClick={onToggleExpand}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
                minHeight: 76,
                cursor: 'pointer',
                '&:active': { backgroundColor: '#f5f8f9' }
            }}
        >
            {price.image ? (
                <Box
                    component="img"
                    src={price.image}
                    alt={price.title}
                    sx={{
                        width: 56,
                        height: 56,
                        objectFit: 'cover',
                        borderRadius: 1.5,
                        flexShrink: 0
                    }}
                />
            ) : (
                <Box sx={{
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f0f4f5',
                    color: '#9ab8bd',
                    borderRadius: 1.5,
                    flexShrink: 0
                }}>
                    <ImageOutlinedIcon />
                </Box>
            )}

            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography noWrap sx={{ fontSize: '1.05rem', fontWeight: 600, color: '#333' }}>
                    {price.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    {price.on_sale && price.sale_price ? (
                        <>
                            <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#d32f2f' }}>
                                {price.sale_price} kr/{price.unit}
                            </Typography>
                            <Typography sx={{ fontSize: '0.9rem', color: '#888', textDecoration: 'line-through' }}>
                                {price.price} kr
                            </Typography>
                        </>
                    ) : (
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#333' }}>
                            {price.price} kr/{price.unit}
                        </Typography>
                    )}
                </Box>
            </Box>

            {!price.is_visible && (
                <Chip label="Dold" size="small" sx={{ flexShrink: 0 }} />
            )}
            <ExpandMoreIcon sx={{
                color: '#999',
                flexShrink: 0,
                transform: expanded ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s'
            }} />
        </Box>

        {/* Expanded editing controls */}
        <Collapse in={expanded} timeout={200} unmountOnExit>
            <Divider />
            <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label={`Pris (kr/${price.unit || 'kg'})`}
                    value={price.price}
                    onChange={(e) => onFieldChange(price.id, 'price', e.target.value)}
                    fullWidth
                    inputProps={{ inputMode: 'decimal' }}
                    sx={priceInputSx}
                />

                {price.on_sale && (
                    <TextField
                        label={`REA-pris (kr/${price.unit || 'kg'})`}
                        value={price.sale_price || ''}
                        onChange={(e) => onFieldChange(price.id, 'sale_price', e.target.value)}
                        fullWidth
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
        </Collapse>
    </Card>
);

export default PriceCard;
