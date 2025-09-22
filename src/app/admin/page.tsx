'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    CardMedia,
    CardContent,
    Switch,
    FormControlLabel,
    IconButton,
    Alert,
    Chip,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    CloudUpload as UploadIcon,
    LibraryBooks as LibraryBooksIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';

interface Price {
    id: string;
    title: string;
    price: string;
    sale_price?: string;
    category?: string;
    unit: string;
    weight?: string;
    on_sale: boolean;
    is_visible: boolean;
    image?: string;
}

interface UploadedImage {
    id: string;
    name: string;
    url: string;
    uploadDate: string;
    size?: number;
}

const AdminPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [prices, setPrices] = useState<Price[]>([]);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isImageLibraryOpen, setIsImageLibraryOpen] = useState(false);
    const [currentPrice, setCurrentPrice] = useState<Partial<Price>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const checkAuthStatus = useCallback(async () => {
        try {
            const response = await fetch('/api/admin/auth', {
                method: 'GET',
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(data.authenticated);
                
                if (data.authenticated) {
                    loadAdminData();
                }
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setIsAuthenticated(false);
        }
    }, []);

    const loadAdminData = async () => {
        try {
            // Ladda priser från Vercel Blob
            const pricesResponse = await fetch('/api/admin/prices');
            if (pricesResponse.ok) {
                const pricesData = await pricesResponse.json();
                setPrices(pricesData);
            }

            // Ladda bilder från Vercel Blob
            const imagesResponse = await fetch('/api/admin/images');
            if (imagesResponse.ok) {
                const imagesData = await imagesResponse.json();
                setUploadedImages(imagesData);
            }
        } catch (error) {
            console.error('Error loading admin data:', error);
            // Fallback to localStorage for existing users
            const savedPrices = localStorage.getItem('admin_prices');
            if (savedPrices) {
                setPrices(JSON.parse(savedPrices));
            }
            
            const savedImages = localStorage.getItem('admin_images');
            if (savedImages) {
                setUploadedImages(JSON.parse(savedImages));
            }
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setLoginError('');

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsAuthenticated(true);
                setPassword('');
                loadAdminData();
            } else {
                setLoginError(data.error || 'Login failed');
                if (data.remainingAttempts !== undefined) {
                    setLoginError(`${data.error} (${data.remainingAttempts} attempts remaining)`);
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('Connection error. Please try again.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout', {
                method: 'POST',
                credentials: 'include',
            });
            setIsAuthenticated(false);
            setPrices([]);
            setUploadedImages([]);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const savePrices = async (newPrices: Price[]) => {
        try {
            // Update local state immediately
            setPrices(newPrices);
            
            // Save to Vercel Blob
            const response = await fetch('/api/admin/prices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPrices),
            });

            if (!response.ok) {
                throw new Error('Failed to save prices');
            }

            // Keep localStorage as backup for now
            localStorage.setItem('admin_prices', JSON.stringify(newPrices));
        } catch (error) {
            console.error('Error saving prices:', error);
            // Still save to localStorage as fallback
            localStorage.setItem('admin_prices', JSON.stringify(newPrices));
        }
    };

    const saveImages = (newImages: UploadedImage[]) => {
        setUploadedImages(newImages);
        // Keep localStorage as backup
        localStorage.setItem('admin_images', JSON.stringify(newImages));
    };

    const handleDeleteImage = async (imageUrl: string, imageId: string) => {
        if (!confirm('Är du säker på att du vill ta bort denna bild från Vercel Blob?')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/images?url=${encodeURIComponent(imageUrl)}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedImages = uploadedImages.filter(img => img.id !== imageId);
                setUploadedImages(updatedImages);
                localStorage.setItem('admin_images', JSON.stringify(updatedImages));
                setSuccessMessage('Bild borttagen från Vercel Blob!');
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Delete failed');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            setSuccessMessage(`Fel vid borttagning: ${error}`);
            setTimeout(() => setSuccessMessage(''), 5000);
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/admin/images', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const newImage = await response.json();
                const updatedImages = [...uploadedImages, newImage];
                setUploadedImages(updatedImages);
                setSuccessMessage('Bild uppladdad till Vercel Blob!');
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setSuccessMessage(`Fel vid uppladdning: ${error}`);
            setTimeout(() => setSuccessMessage(''), 5000);
        } finally {
            setIsUploading(false);
            event.target.value = '';
        }
    };

    const handleSavePrice = async () => {
        if (!currentPrice.title || !currentPrice.price) {
            alert('Titel och pris krävs');
            return;
        }

        if (isEditing && currentPrice.id) {
            const updatedPrices = prices.map(p => 
                p.id === currentPrice.id ? { ...currentPrice } as Price : p
            );
            await savePrices(updatedPrices);
        } else {
            const newPrice: Price = {
                ...currentPrice,
                id: Date.now().toString(),
                unit: currentPrice.unit || 'kg',
                on_sale: currentPrice.on_sale || false,
                is_visible: currentPrice.is_visible !== false
            } as Price;
            
            await savePrices([...prices, newPrice]);
        }

        setIsDialogOpen(false);
        setCurrentPrice({});
        setSuccessMessage(isEditing ? 'Pris uppdaterat!' : 'Pris skapat!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleEditPrice = (price: Price) => {
        setCurrentPrice(price);
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    const handleDeletePrice = async (id: string) => {
        if (confirm('Är du säker på att du vill ta bort detta pris?')) {
            const updatedPrices = prices.filter(p => p.id !== id);
            await savePrices(updatedPrices);
            setSuccessMessage('Pris borttaget!');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    const selectImageFromLibrary = (imageUrl: string) => {
        setCurrentPrice({ ...currentPrice, image: imageUrl });
        setIsImageLibraryOpen(false);
    };

    // Inline editing functions
    const updatePriceInline = async (id: string, field: keyof Price, value: string | boolean) => {
        const updatedPrices = prices.map(p => 
            p.id === id ? { ...p, [field]: value } : p
        );
        await savePrices(updatedPrices);
    };

    if (!isAuthenticated) {
        return (
            <Box sx={{ 
                pt: { xs: '260px', md: '220px' }, 
                pb: 8,
                px: { xs: 2, md: 4 },
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Container maxWidth="sm">
                    <Card sx={{ p: { xs: 3, md: 4 } }}>
                        <Typography variant="h4" sx={{ 
                            mb: 3, 
                            textAlign: 'center',
                            fontSize: { xs: '1.75rem', md: '2.125rem' },
                            color: '#448f9b'
                        }}>
                            Admin-inloggning
                        </Typography>
                        <TextField
                            fullWidth
                            type="password"
                            label="Lösenord"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                            error={!!loginError}
                            helperText={loginError}
                            sx={{ mb: 3 }}
                        />
                        <Button 
                            fullWidth 
                            variant="contained" 
                            onClick={handleLogin}
                            disabled={isLoggingIn}
                            sx={{ 
                                py: 1.5,
                                backgroundColor: '#448f9b',
                                '&:hover': {
                                    backgroundColor: '#357a84'
                                }
                            }}
                        >
                            {isLoggingIn ? 'Loggar in...' : 'Logga in'}
                        </Button>
                    </Card>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            pt: { xs: '240px', md: '200px' }, 
            pb: 4,
            px: { xs: 1, md: 2 },
            minHeight: '100vh',
            backgroundColor: '#f8f9fa'
        }}>
            <Container maxWidth="xl">
                {/* Header */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 3,
                    p: { xs: 2, md: 3 },
                    backgroundColor: 'white',
                    borderRadius: 1,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            color: 'rgb(68, 143, 155)', 
                            fontWeight: 600,
                            fontSize: { xs: '1.5rem', md: '2rem' }
                        }}
                    >
                        Admin
                    </Typography>
                    <Button 
                        variant="outlined" 
                        onClick={handleLogout}
                        size="small"
                        sx={{
                            borderColor: 'rgb(68, 143, 155)',
                            color: 'rgb(68, 143, 155)',
                            '&:hover': {
                                borderColor: 'rgb(68, 143, 155)',
                                backgroundColor: 'rgba(68, 143, 155, 0.04)'
                            }
                        }}
                    >
                        Logga ut
                    </Button>
                </Box>

                {successMessage && (
                    <Alert severity="success" sx={{ mb: 2, mx: { xs: 0, md: 0 } }}>
                        {successMessage}
                    </Alert>
                )}

                {/* Action Buttons */}
                <Box sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    mb: 3,
                    flexDirection: { xs: 'column', sm: 'row' }
                }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setCurrentPrice({
                                title: '',
                                price: '',
                                sale_price: '',
                                category: '',
                                unit: 'kg',
                                weight: '',
                                on_sale: false,
                                is_visible: true,
                                image: ''
                            });
                            setIsEditing(false);
                            setIsDialogOpen(true);
                        }}
                        sx={{ 
                            backgroundColor: 'rgb(68, 143, 155)',
                            py: 1,
                            '&:hover': {
                                backgroundColor: 'rgb(58, 123, 135)'
                            }
                        }}
                        size="small"
                        fullWidth={isMobile}
                    >
                        Lägg till
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<UploadIcon />}
                        component="label"
                        size="small"
                        disabled={isUploading}
                        sx={{ 
                            py: 1,
                            borderColor: 'rgb(68, 143, 155)',
                            color: 'rgb(68, 143, 155)',
                            '&:hover': {
                                borderColor: 'rgb(68, 143, 155)',
                                backgroundColor: 'rgba(68, 143, 155, 0.04)'
                            }
                        }}
                        fullWidth={isMobile}
                    >
                        {isUploading ? 'Laddar upp...' : 'Ladda upp bild'}
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<LibraryBooksIcon />}
                        onClick={() => setIsImageLibraryOpen(true)}
                        size="small"
                        sx={{ 
                            py: 1,
                            borderColor: 'rgb(68, 143, 155)',
                            color: 'rgb(68, 143, 155)',
                            '&:hover': {
                                borderColor: 'rgb(68, 143, 155)',
                                backgroundColor: 'rgba(68, 143, 155, 0.04)'
                            }
                        }}
                        fullWidth={isMobile}
                    >
                        Bildbibliotek
                    </Button>
                </Box>

                {/* Prices Grid */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)'
                    },
                    gap: 2
                }}>
                    {prices.map((price) => (
                        <Card 
                            key={price.id}
                            sx={{ 
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
                            }}
                        >
                            {price.image && (
                                <CardMedia
                                    component="img"
                                    height="120"
                                    image={price.image}
                                    alt={price.title}
                                    sx={{ objectFit: 'cover' }}
                                />
                            )}
                            <CardContent sx={{ 
                                flexGrow: 1,
                                p: 2
                            }}>
                                {/* Title */}
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        mb: 1,
                                        color: '#333'
                                    }}
                                >
                                    {price.title}
                                </Typography>

                                {/* Status Chips */}
                                <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
                                    {!price.is_visible && (
                                        <Chip 
                                            icon={<VisibilityOffIcon />} 
                                            label="Dold" 
                                            size="small" 
                                            color="default"
                                        />
                                    )}
                                    {price.on_sale && (
                                        <Chip 
                                            label="REA" 
                                            size="small" 
                                            color="error"
                                        />
                                    )}
                                </Box>
                                
                                {/* Inline Price Editing */}
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                        <TextField
                                            label="Pris"
                                            value={price.price}
                                            onChange={(e) => updatePriceInline(price.id, 'price', e.target.value)}
                                            size="small"
                                            sx={{ 
                                                width: '80px',
                                                '& .MuiInputBase-input': {
                                                    fontSize: '0.875rem'
                                                }
                                            }}
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            kr/{price.unit}
                                        </Typography>
                                    </Box>
                                    
                                    {/* Quick Toggles */}
                                    <Box sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        gap: 0.5
                                    }}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={price.is_visible}
                                                    onChange={(e) => updatePriceInline(price.id, 'is_visible', e.target.checked)}
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
                                                    onChange={(e) => updatePriceInline(price.id, 'on_sale', e.target.checked)}
                                                    size="small"
                                                />
                                            }
                                            label={<Typography variant="caption">REA</Typography>}
                                            sx={{ margin: 0 }}
                                        />
                                    </Box>
                                    
                                    {/* Sale Price Field */}
                                    {price.on_sale && (
                                        <Box sx={{ mt: 1 }}>
                                            <TextField
                                                label="REA-pris"
                                                value={price.sale_price || ''}
                                                onChange={(e) => updatePriceInline(price.id, 'sale_price', e.target.value)}
                                                size="small"
                                                sx={{ 
                                                    width: '80px',
                                                    '& .MuiInputBase-input': {
                                                        fontSize: '0.875rem'
                                                    }
                                                }}
                                            />
                                            <Typography variant="caption" component="span" sx={{ ml: 1 }} color="text.secondary">
                                                kr/{price.unit}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                                
                                {/* Action Buttons */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    mt: 'auto',
                                    pt: 1,
                                    borderTop: '1px solid #f0f0f0'
                                }}>
                                    <IconButton 
                                        onClick={() => handleEditPrice(price)}
                                        size="small"
                                        sx={{
                                            color: 'rgb(68, 143, 155)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(68, 143, 155, 0.04)'
                                            }
                                        }}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton 
                                        onClick={() => handleDeletePrice(price.id)}
                                        size="small"
                                        sx={{
                                            color: '#d32f2f',
                                            '&:hover': {
                                                backgroundColor: 'rgba(211, 47, 47, 0.04)'
                                            }
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                {/* Create/Edit Price Dialog */}
                <Dialog 
                    open={isDialogOpen} 
                    onClose={() => setIsDialogOpen(false)} 
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
                        {isEditing ? 'Redigera Pris' : 'Skapa Nytt Pris'}
                    </DialogTitle>
                    <DialogContent sx={{ 
                        px: { xs: 2, md: 3 },
                        py: { xs: 1, md: 2 }
                    }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            <TextField
                                fullWidth
                                label="Titel"
                                value={currentPrice.title || ''}
                                onChange={(e) => setCurrentPrice({ ...currentPrice, title: e.target.value })}
                            />
                            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                                <TextField
                                    fullWidth
                                    label="Pris"
                                    value={currentPrice.price || ''}
                                    onChange={(e) => setCurrentPrice({ ...currentPrice, price: e.target.value })}
                                />
                                <TextField
                                    fullWidth
                                    label="Enhet"
                                    value={currentPrice.unit || 'kg'}
                                    onChange={(e) => setCurrentPrice({ ...currentPrice, unit: e.target.value })}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={currentPrice.on_sale || false}
                                            onChange={(e) => setCurrentPrice({ ...currentPrice, on_sale: e.target.checked })}
                                        />
                                    }
                                    label="På rea"
                                />
                                {currentPrice.on_sale && (
                                    <TextField
                                        label="Rea-pris"
                                        value={currentPrice.sale_price || ''}
                                        onChange={(e) => setCurrentPrice({ ...currentPrice, sale_price: e.target.value })}
                                        size="small"
                                        sx={{ minWidth: 120 }}
                                    />
                                )}
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={currentPrice.is_visible !== false}
                                            onChange={(e) => setCurrentPrice({ ...currentPrice, is_visible: e.target.checked })}
                                        />
                                    }
                                    label="Synlig"
                                />
                            </Box>
                            
                            {/* Image Section */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>Bild</Typography>
                                
                                {/* Current image preview */}
                                {currentPrice.image && (
                                    <Box sx={{ mb: 2 }}>
                                        <Box
                                            component="img"
                                            src={currentPrice.image}
                                            alt="Preview"
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
                                            onClick={() => setCurrentPrice({ ...currentPrice, image: '' })}
                                            sx={{ mt: 1, display: 'block' }}
                                        >
                                            Ta bort bild
                                        </Button>
                                    </Box>
                                )}

                                {/* Image Library Grid */}
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
                                    {uploadedImages.map((image) => (
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
                                                border: currentPrice.image === image.url ? '2px solid #1976d2' : '1px solid #ddd',
                                                '&:hover': {
                                                    border: '2px solid #1976d2',
                                                    opacity: 0.8
                                                }
                                            }}
                                            onClick={() => setCurrentPrice({ ...currentPrice, image: image.url })}
                                        />
                                    ))}
                                    
                                    {uploadedImages.length === 0 && (
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

                                {/* Upload new image to library */}
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="small"
                                    fullWidth
                                >
                                    Ladda upp ny bild till bibliotek
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (event) => {
                                                    const result = event.target?.result as string;
                                                    if (result) {
                                                        const newImage: UploadedImage = {
                                                            id: Date.now().toString(),
                                                            name: file.name,
                                                            url: result,
                                                            uploadDate: new Date().toISOString()
                                                        };
                                                        
                                                        const updatedImages = [...uploadedImages, newImage];
                                                        saveImages(updatedImages);
                                                        
                                                        setCurrentPrice({ 
                                                            ...currentPrice, 
                                                            image: result 
                                                        });
                                                        
                                                        setSuccessMessage('Bild uppladdad till bibliotek!');
                                                        setTimeout(() => setSuccessMessage(''), 3000);
                                                    }
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                            e.target.value = '';
                                        }}
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
                        <Button 
                            onClick={() => setIsDialogOpen(false)}
                            fullWidth={isMobile}
                        >
                            Avbryt
                        </Button>
                        <Button 
                            onClick={handleSavePrice} 
                            variant="contained"
                            fullWidth={isMobile}
                            sx={{
                                backgroundColor: '#448f9b',
                                '&:hover': {
                                    backgroundColor: '#357a84'
                                }
                            }}
                        >
                            {isEditing ? 'Uppdatera' : 'Skapa'}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Image Library Dialog */}
                <Dialog 
                    open={isImageLibraryOpen} 
                    onClose={() => setIsImageLibraryOpen(false)} 
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
                    <DialogContent sx={{ 
                        px: { xs: 2, md: 3 }
                    }}>
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: 'repeat(2, 1fr)',
                                sm: 'repeat(3, 1fr)',
                                md: 'repeat(4, 1fr)'
                            },
                            gap: 2
                        }}>
                            {uploadedImages.map((image) => (
                                <Card key={image.id}>
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        image={image.url}
                                        alt={image.name}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => selectImageFromLibrary(image.url)}
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
                                                onClick={() => selectImageFromLibrary(image.url)}
                                                sx={{ fontSize: '0.65rem', height: '20px' }}
                                            />
                                            <IconButton 
                                                size="small" 
                                                onClick={() => handleDeleteImage(image.url, image.id)}
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
                        {uploadedImages.length === 0 && (
                            <Typography sx={{ textAlign: 'center', py: 4, color: 'gray' }}>
                                Inga bilder uppladdade än
                            </Typography>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ 
                        px: { xs: 2, md: 3 },
                        py: { xs: 1.5, md: 2 }
                    }}>
                        <Button 
                            onClick={() => setIsImageLibraryOpen(false)}
                            fullWidth={isMobile}
                        >
                            Stäng
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default AdminPage;
