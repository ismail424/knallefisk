'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Alert,
    Snackbar,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    Add as AddIcon,
    CloudUpload as UploadIcon,
    LibraryBooks as LibraryBooksIcon
} from '@mui/icons-material';
import { AdminPrice, UploadedImage } from '../../lib/types';
import { compressImage } from '../../lib/compress-image';
import { pillButtonSx, BRAND, BRAND_DARK } from './components/styles';
import LoginForm from './components/LoginForm';
import PriceCard from './components/PriceCard';
import PriceDialog from './components/PriceDialog';
import ImageLibraryDialog from './components/ImageLibraryDialog';
import ConfirmDialog from './components/ConfirmDialog';

interface ConfirmState {
    message: string;
    action: () => void;
}

const AdminPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [prices, setPrices] = useState<AdminPrice[]>([]);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isImageLibraryOpen, setIsImageLibraryOpen] = useState(false);
    const [currentPrice, setCurrentPrice] = useState<Partial<AdminPrice>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<{ text: string; severity: 'success' | 'error' } | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<ConfirmState | null>(null);

    const showStatus = (text: string, severity: 'success' | 'error' = 'success') => {
        setStatusMessage({ text, severity });
        setTimeout(() => setStatusMessage(null), severity === 'success' ? 3000 : 5000);
    };

    const loadAdminData = async () => {
        try {
            const pricesResponse = await fetch('/api/admin/prices');
            if (pricesResponse.ok) {
                setPrices(await pricesResponse.json());
            }

            const imagesResponse = await fetch('/api/admin/images');
            if (imagesResponse.ok) {
                setUploadedImages(await imagesResponse.json());
            }
        } catch (error) {
            console.error('Error loading admin data:', error);
        }
    };

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

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const handleLogin = async () => {
        setIsLoggingIn(true);
        setLoginError('');

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsAuthenticated(true);
                setPassword('');
                loadAdminData();
            } else if (data.remainingAttempts !== undefined) {
                setLoginError(`${data.error} (${data.remainingAttempts} attempts remaining)`);
            } else {
                setLoginError(data.error || 'Login failed');
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

    const createPrice = async (price: Omit<AdminPrice, 'id'>) => {
        try {
            const response = await fetch('/api/admin/prices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(price),
            });

            if (!response.ok) {
                throw new Error('Failed to create price');
            }

            const newPrice = await response.json();
            setPrices(prev => [...prev, newPrice]);
            showStatus('✓ Pris skapat!');
        } catch (error) {
            console.error('Error creating price:', error);
            showStatus('Fel vid skapande - försök igen', 'error');
        }
    };

    // Optimistic update; fields commit their value only after typing pauses,
    // and the server response is never written back over local state
    const updatePriceFields = async (id: string, updates: Partial<AdminPrice>) => {
        setPrices(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));

        try {
            const response = await fetch('/api/admin/prices', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...updates }),
            });

            if (!response.ok) {
                throw new Error('Failed to update price');
            }

            showStatus('✓ Sparat');
        } catch (error) {
            console.error('Error updating price:', error);
            showStatus('Fel vid uppdatering - försök igen', 'error');
            loadAdminData();
        }
    };

    const updatePrice = async (price: AdminPrice) => {
        try {
            const response = await fetch('/api/admin/prices', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(price),
            });

            if (!response.ok) {
                throw new Error('Failed to update price');
            }

            const updatedPrice = await response.json();
            setPrices(prev => prev.map(p => p.id === price.id ? updatedPrice : p));
            showStatus('✓ Pris uppdaterat!');
        } catch (error) {
            console.error('Error updating price:', error);
            showStatus('Fel vid uppdatering - försök igen', 'error');
        }
    };

    const deletePrice = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/prices?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete price');
            }

            setPrices(prev => prev.filter(p => p.id !== id));
            showStatus('✓ Pris borttaget!');
        } catch (error) {
            console.error('Error deleting price:', error);
            showStatus('Fel vid borttagning - försök igen', 'error');
        }
    };

    const handleDeletePrice = (id: string) => {
        const price = prices.find(p => p.id === id);
        setConfirmDialog({
            message: `Vill du ta bort "${price?.title || 'detta pris'}"?`,
            action: () => deletePrice(id)
        });
    };

    const uploadImage = async (file: File): Promise<UploadedImage | null> => {
        setIsUploading(true);
        try {
            // Shrink phone photos in the browser so they never hit the 10MB limit
            const compressed = await compressImage(file);
            const formData = new FormData();
            formData.append('file', compressed);

            const response = await fetch('/api/admin/images', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const newImage: UploadedImage = await response.json();
            setUploadedImages(prev => [newImage, ...prev]);
            showStatus('✓ Bild uppladdad!');
            return newImage;
        } catch (error) {
            console.error('Error uploading image:', error);
            showStatus(`Fel vid uppladdning: ${error instanceof Error ? error.message : error}`, 'error');
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        await uploadImage(file);
        event.target.value = '';
    };

    const deleteImage = async (imageUrl: string, imageId: string) => {
        try {
            const response = await fetch(`/api/admin/images?url=${encodeURIComponent(imageUrl)}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Delete failed');
            }

            setUploadedImages(prev => prev.filter(img => img.id !== imageId));
            // API clears the image from prices that used it - mirror that locally
            setPrices(prev => prev.map(p => p.image === imageUrl ? { ...p, image: undefined } : p));
            showStatus('✓ Bild borttagen!');
        } catch (error) {
            console.error('Error deleting image:', error);
            showStatus(`Fel vid borttagning: ${error instanceof Error ? error.message : error}`, 'error');
        }
    };

    const handleDeleteImage = (imageUrl: string, imageId: string) => {
        setConfirmDialog({
            message: 'Vill du ta bort denna bild? Produkter som använder den blir utan bild.',
            action: () => deleteImage(imageUrl, imageId)
        });
    };

    const handleSavePrice = async () => {
        if (!currentPrice.title || !currentPrice.price) {
            showStatus('Titel och pris krävs', 'error');
            return;
        }

        if (isEditing && currentPrice.id) {
            await updatePrice(currentPrice as AdminPrice);
        } else {
            await createPrice({
                title: currentPrice.title,
                price: currentPrice.price,
                sale_price: currentPrice.sale_price,
                category: currentPrice.category,
                unit: currentPrice.unit || 'kg',
                weight: currentPrice.weight,
                on_sale: currentPrice.on_sale || false,
                is_visible: currentPrice.is_visible !== false,
                image: currentPrice.image
            });
        }

        setIsDialogOpen(false);
        setCurrentPrice({});
        setIsEditing(false);
    };

    const handleEditPrice = (price: AdminPrice) => {
        setCurrentPrice(price);
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    const handleCreatePrice = () => {
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
    };

    const updatePriceInline = (id: string, field: keyof AdminPrice, value: string | boolean) => {
        updatePriceFields(id, { [field]: value });
    };

    const selectImageFromLibrary = (imageUrl: string) => {
        setCurrentPrice({ ...currentPrice, image: imageUrl });
        setIsImageLibraryOpen(false);
    };

    if (!isAuthenticated) {
        return (
            <LoginForm
                password={password}
                loginError={loginError}
                isLoggingIn={isLoggingIn}
                onPasswordChange={setPassword}
                onSubmit={handleLogin}
            />
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
                    mb: 2,
                    p: { xs: 2, md: 2.5 },
                    backgroundColor: 'white',
                    borderRadius: 4,
                    border: '1px solid #e8eef0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    maxWidth: 700,
                    mx: 'auto'
                }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: BRAND,
                            fontWeight: 600,
                            fontSize: { xs: '1.4rem', md: '1.7rem' }
                        }}
                    >
                        Admin
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={handleLogout}
                        size="small"
                        sx={{
                            ...pillButtonSx,
                            px: 2,
                            color: '#607d8b',
                            borderColor: '#cfd8dc',
                            '&:hover': { borderColor: '#90a4ae', backgroundColor: '#fafafa' }
                        }}
                    >
                        Logga ut
                    </Button>
                </Box>

                {/* Action Buttons */}
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    mb: 2,
                    maxWidth: 700,
                    mx: 'auto',
                    flexWrap: 'wrap'
                }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon sx={{ fontSize: 18 }} />}
                        onClick={handleCreatePrice}
                        sx={{
                            ...pillButtonSx,
                            px: 2.5,
                            py: 0.9,
                            backgroundColor: BRAND,
                            '&:hover': { backgroundColor: BRAND_DARK, boxShadow: 'none' }
                        }}
                    >
                        Lägg till
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<UploadIcon sx={{ fontSize: 18 }} />}
                        component="label"
                        disabled={isUploading}
                        sx={{
                            ...pillButtonSx,
                            px: 2.5,
                            py: 0.9,
                            color: BRAND,
                            borderColor: '#cfe0e3',
                            '&:hover': { borderColor: BRAND, backgroundColor: 'rgba(68,143,155,0.04)' }
                        }}
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
                        startIcon={<LibraryBooksIcon sx={{ fontSize: 18 }} />}
                        onClick={() => setIsImageLibraryOpen(true)}
                        sx={{
                            ...pillButtonSx,
                            px: 2.5,
                            py: 0.9,
                            color: BRAND,
                            borderColor: '#cfe0e3',
                            '&:hover': { borderColor: BRAND, backgroundColor: 'rgba(68,143,155,0.04)' }
                        }}
                    >
                        Bildbibliotek
                    </Button>
                </Box>

                {/* Compact price list - tap a row to edit */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    maxWidth: 700,
                    mx: 'auto'
                }}>
                    {prices.map((price) => (
                        <PriceCard
                            key={price.id}
                            price={price}
                            expanded={expandedId === price.id}
                            onToggleExpand={() => setExpandedId(expandedId === price.id ? null : price.id)}
                            onFieldChange={updatePriceInline}
                            onEdit={handleEditPrice}
                            onDelete={handleDeletePrice}
                        />
                    ))}
                </Box>

                <PriceDialog
                    open={isDialogOpen}
                    isMobile={isMobile}
                    isEditing={isEditing}
                    isUploading={isUploading}
                    price={currentPrice}
                    images={uploadedImages}
                    onChange={setCurrentPrice}
                    onUpload={uploadImage}
                    onSave={handleSavePrice}
                    onClose={() => setIsDialogOpen(false)}
                />

                <ImageLibraryDialog
                    open={isImageLibraryOpen}
                    isMobile={isMobile}
                    images={uploadedImages}
                    onSelect={selectImageFromLibrary}
                    onDelete={handleDeleteImage}
                    onClose={() => setIsImageLibraryOpen(false)}
                />

                <ConfirmDialog
                    open={!!confirmDialog}
                    message={confirmDialog?.message || ''}
                    onConfirm={() => {
                        confirmDialog?.action();
                        setConfirmDialog(null);
                    }}
                    onCancel={() => setConfirmDialog(null)}
                />

                {/* Save/error feedback near the thumb on mobile */}
                <Snackbar
                    open={!!statusMessage}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        severity={statusMessage?.severity || 'success'}
                        variant="filled"
                        icon={false}
                        sx={{ fontSize: '1.05rem', px: 3, py: 0.75, borderRadius: 999 }}
                    >
                        {statusMessage?.text}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
};

export default AdminPage;
