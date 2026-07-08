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
import { priceInputSx, toggleGroupSx, pillButtonSx, BRAND, DANGER } from './styles';

interface PriceCardProps {
    price: AdminPrice;
    expanded: boolean;
    onToggleExpand: () => void;
    onFieldChange: (id: string, field: keyof AdminPrice, value: string | boolean) => void;
    onEdit: (price: AdminPrice) => void;
    onDelete: (id: string) => void;
}

const PriceCard = ({ price, expanded, onToggleExpand, onFieldChange, onEdit, onDelete }: PriceCardProps) => (
    <Card sx={{
        backgroundColor: 'white',
        border: '1px solid #e8eef0',
        borderRadius: 3.5,
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
        {/* Compact overview row - tap to expand */}
        <Box
            onClick={onToggleExpand}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
                minHeight: 72,
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
                        width: 52,
                        height: 52,
                        objectFit: 'cover',
                        borderRadius: 2.5,
                        flexShrink: 0
                    }}
                />
            ) : (
                <Box sx={{
                    width: 52,
                    height: 52,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f0f4f5',
                    color: '#9ab8bd',
                    borderRadius: 2.5,
                    flexShrink: 0
                }}>
                    <ImageOutlinedIcon fontSize="small" />
                </Box>
            )}

            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography noWrap sx={{ fontSize: '1rem', fontWeight: 600, color: '#37474f' }}>
                    {price.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    {price.on_sale && price.sale_price ? (
                        <>
                            <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: DANGER }}>
                                {price.sale_price} kr/{price.unit}
                            </Typography>
                            <Typography sx={{ fontSize: '0.85rem', color: '#a4b3ba', textDecoration: 'line-through' }}>
                                {price.price} kr
                            </Typography>
                        </>
                    ) : (
                        <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#455a64' }}>
                            {price.price} kr/{price.unit}
                        </Typography>
                    )}
                </Box>
            </Box>

            {!price.is_visible && (
                <Chip
                    label="Dold"
                    size="small"
                    sx={{ flexShrink: 0, backgroundColor: '#eef2f3', color: '#78909c', fontSize: '0.8rem' }}
                />
            )}
            <ExpandMoreIcon sx={{
                color: '#b0bec5',
                flexShrink: 0,
                transform: expanded ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s'
            }} />
        </Box>

        {/* Expanded editing controls */}
        <Collapse in={expanded} timeout={200} unmountOnExit>
            <Divider sx={{ borderColor: '#f0f4f5' }} />
            <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                    <Typography sx={{ fontSize: '0.9rem', color: '#78909c', mb: 0.5 }}>
                        Visas på hemsidan?
                    </Typography>
                    <ToggleButtonGroup
                        value={price.is_visible ? 'yes' : 'no'}
                        exclusive
                        onChange={(_, value) => value && onFieldChange(price.id, 'is_visible', value === 'yes')}
                        sx={toggleGroupSx(BRAND)}
                    >
                        <ToggleButton value="yes">
                            {price.is_visible && <CheckIcon sx={{ mr: 0.5, fontSize: 18 }} />}
                            Ja, synlig
                        </ToggleButton>
                        <ToggleButton value="no">
                            {!price.is_visible && <CheckIcon sx={{ mr: 0.5, fontSize: 18 }} />}
                            Nej, dold
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box>
                    <Typography sx={{ fontSize: '0.9rem', color: '#78909c', mb: 0.5 }}>
                        REA-pris?
                    </Typography>
                    <ToggleButtonGroup
                        value={price.on_sale ? 'yes' : 'no'}
                        exclusive
                        onChange={(_, value) => value && onFieldChange(price.id, 'on_sale', value === 'yes')}
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
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 1,
                    pt: 1.5,
                    borderTop: '1px solid #f0f4f5'
                }}>
                    <Button
                        startIcon={<EditIcon sx={{ fontSize: 18 }} />}
                        onClick={() => onEdit(price)}
                        sx={{ ...pillButtonSx, px: 2, color: BRAND }}
                    >
                        Redigera
                    </Button>
                    <Button
                        startIcon={<DeleteIcon sx={{ fontSize: 18 }} />}
                        onClick={() => onDelete(price.id)}
                        sx={{ ...pillButtonSx, px: 2, color: DANGER }}
                    >
                        Ta bort
                    </Button>
                </Box>
            </CardContent>
        </Collapse>
    </Card>
);

export default PriceCard;
