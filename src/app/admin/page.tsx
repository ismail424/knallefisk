'use client';

import { useState, useEffect } from 'react';
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
    description?: string;
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
}

const AdminPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [prices, setPrices] = useState<Price[]>([]);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isImageLibraryOpen, setIsImageLibraryOpen] = useState(false);
    const [currentPrice, setCurrentPrice] = useState<Partial<Price>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Ladda priser från localStorage
        const savedPrices = localStorage.getItem('admin_prices');
        if (savedPrices) {
            setPrices(JSON.parse(savedPrices));
        }

        // Ladda uppladdade bilder från localStorage
        const savedImages = localStorage.getItem('admin_images');
        if (savedImages) {
            const parsedImages = JSON.parse(savedImages);
            setUploadedImages(parsedImages);
        }

        // Kontrollera om redan autentiserad
        const authenticated = sessionStorage.getItem('admin_authenticated');
        if (authenticated === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
        
        if (password === adminPassword) {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_authenticated', 'true');
            setLoginError('');
        } else {
            setLoginError('Fel lösenord');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_authenticated');
        setPassword('');
    };

    const savePrices = (newPrices: Price[]) => {
        setPrices(newPrices);
        localStorage.setItem('admin_prices', JSON.stringify(newPrices));
    };

    const saveImages = (newImages: UploadedImage[]) => {
        setUploadedImages(newImages);
        localStorage.setItem('admin_images', JSON.stringify(newImages));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (result) {
                    const newImage: UploadedImage = {
                        id: Date.now().toString(),
                        name: file.name,
                        url: result,
                        uploadDate: new Date().toISOString()
                    };
                    const updatedImages = [...uploadedImages, newImage];
                    saveImages(updatedImages);
                    setSuccessMessage('Bild uppladdad!');
                    setTimeout(() => setSuccessMessage(''), 3000);
                    event.target.value = '';
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSavePrice = () => {
        if (!currentPrice.title || !currentPrice.price) {
            alert('Titel och pris krävs');
            return;
        }

        if (isEditing && currentPrice.id) {
            const updatedPrices = prices.map(p => 
                p.id === currentPrice.id ? { ...currentPrice } as Price : p
            );
            savePrices(updatedPrices);
        } else {
            const newPrice: Price = {
                ...currentPrice,
                id: Date.now().toString(),
                unit: currentPrice.unit || 'kg',
                on_sale: currentPrice.on_sale || false,
                is_visible: currentPrice.is_visible !== false
            } as Price;
            
            savePrices([...prices, newPrice]);
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

    const handleDeletePrice = (id: string) => {
        if (confirm('Är du säker på att du vill ta bort detta pris?')) {
            const updatedPrices = prices.filter(p => p.id !== id);
            savePrices(updatedPrices);
            setSuccessMessage('Pris borttaget!');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    const selectImageFromLibrary = (imageUrl: string) => {
        setCurrentPrice({ ...currentPrice, image: imageUrl });
        setIsImageLibraryOpen(false);
    };

    const deleteImage = (imageId: string) => {
        if (confirm('Är du säker på att du vill ta bort denna bild?')) {
            const updatedImages = uploadedImages.filter(img => img.id !== imageId);
            saveImages(updatedImages);
            setSuccessMessage('Bild borttagen!');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
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
                            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                            error={!!loginError}
                            helperText={loginError}
                            sx={{ mb: 3 }}
                        />
                        <Button 
                            fullWidth 
                            variant="contained" 
                            onClick={handleLogin}
                            sx={{ 
                                py: 1.5,
                                backgroundColor: '#448f9b',
                                '&:hover': {
                                    backgroundColor: '#357a84'
                                }
                            }}
                        >
                            Logga in
                        </Button>
                    </Card>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            pt: { xs: '260px', md: '220px' }, 
            pb: 8,
            px: { xs: 2, md: 4 },
            minHeight: '100vh' 
        }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: { xs: 'flex-start', md: 'center' },
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 2, md: 0 },
                    mb: 4 
                }}>
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            color: '#448f9b', 
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: { xs: '1.75rem', md: '3rem' }
                        }}
                    >
                        Prishantering
                    </Typography>
                    <Button 
                        variant="outlined" 
                        onClick={handleLogout}
                        size={isMobile ? "small" : "medium"}
                        sx={{
                            alignSelf: { xs: 'flex-start', md: 'auto' }
                        }}
                    >
                        Logga ut
                    </Button>
                </Box>

                {successMessage && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        {successMessage}
                    </Alert>
                )}

                {/* Action Buttons */}
                <Box sx={{ 
                    display: 'flex', 
                    gap: { xs: 1, md: 2 }, 
                    mb: 4,
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
                                description: '',
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
                            backgroundColor: '#448f9b',
                            py: { xs: 1.5, md: 1 },
                            '&:hover': {
                                backgroundColor: '#357a84'
                            }
                        }}
                        size={isMobile ? "small" : "medium"}
                        fullWidth={isMobile}
                    >
                        Nytt Pris
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<UploadIcon />}
                        component="label"
                        size={isMobile ? "small" : "medium"}
                        sx={{ py: { xs: 1.5, md: 1 } }}
                        fullWidth={isMobile}
                    >
                        Ladda upp bild
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
                        size={isMobile ? "small" : "medium"}
                        sx={{ py: { xs: 1.5, md: 1 } }}
                        fullWidth={isMobile}
                    >
                        Bildbibliotek ({uploadedImages.length})
                    </Button>
                </Box>

                {/* Prices Grid */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)'
                    },
                    gap: { xs: 2, md: 3 }
                }}>
                    {prices.map((price) => (
                        <Card 
                            key={price.id}
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {price.image && (
                                <CardMedia
                                    component="img"
                                    height={isMobile ? "150" : "200"}
                                    image={price.image}
                                    alt={price.title}
                                    sx={{ objectFit: 'cover' }}
                                />
                            )}
                            <CardContent sx={{ 
                                flexGrow: 1,
                                p: { xs: 2, md: 3 },
                                '&:last-child': { pb: { xs: 2, md: 3 } }
                            }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'flex-start', 
                                    mb: 2,
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    gap: { xs: 1, sm: 0 }
                                }}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            flex: 1,
                                            fontSize: { xs: '1rem', md: '1.25rem' }
                                        }}
                                    >
                                        {price.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                        {!price.is_visible && (
                                            <Chip 
                                                icon={<VisibilityOffIcon />} 
                                                label="Dold" 
                                                size="small" 
                                                color="default"
                                                sx={{ mb: 0.5 }}
                                            />
                                        )}
                                        {price.on_sale && (
                                            <Chip 
                                                label="REA" 
                                                size="small" 
                                                color="error"
                                                sx={{ mb: 0.5 }}
                                            />
                                        )}
                                    </Box>
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    {price.on_sale && price.sale_price ? (
                                        <>
                                            <Typography 
                                                variant="body2" 
                                                sx={{ textDecoration: 'line-through', color: 'gray' }}
                                            >
                                                {price.price} kr
                                            </Typography>
                                            <Typography variant="h6" sx={{ color: 'red', fontWeight: 'bold' }}>
                                                {price.sale_price} kr
                                            </Typography>
                                        </>
                                    ) : (
                                        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                                            {price.price} kr
                                        </Typography>
                                    )}
                                </Box>
                                
                                {price.description && (
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary" 
                                        sx={{ 
                                            mb: 2,
                                            fontSize: { xs: '0.875rem', md: '0.875rem' }
                                        }}
                                    >
                                        {price.description}
                                    </Typography>
                                )}
                                
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    mt: 'auto'
                                }}>
                                    <IconButton 
                                        onClick={() => handleEditPrice(price)}
                                        color="primary"
                                        size={isMobile ? "small" : "medium"}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        onClick={() => handleDeletePrice(price.id)}
                                        color="error"
                                        size={isMobile ? "small" : "medium"}
                                    >
                                        <DeleteIcon />
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
                            <TextField
                                fullWidth
                                label="Beskrivning"
                                multiline
                                rows={2}
                                value={currentPrice.description || ''}
                                onChange={(e) => setCurrentPrice({ ...currentPrice, description: e.target.value })}
                            />
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
                                        <Typography variant="caption" noWrap>
                                            {image.name}
                                        </Typography>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => deleteImage(image.id)}
                                            sx={{ float: 'right' }}
                                            color="error"
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
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
