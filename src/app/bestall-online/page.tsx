'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  Badge,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  LocalShipping as ShippingIcon,
} from '@mui/icons-material';
import MUIThemeProvider from '../../components/ThemeProvider';
import Navbar from '../../components/Navbar';

interface Product {
  id: number;
  namn: string;
  pris: number;
  enhet: string;
  kategori: string;
  beskrivning: string;
  bild: string;
}

interface CartItem extends Product {
  antal: number;
}

export default function BestallOnline() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderDialog, setOrderDialog] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const produkter: Product[] = [
    { id: 1, namn: 'Lax, färsk', pris: 189, enhet: 'kg', kategori: 'Färsk fisk', beskrivning: 'Färsk lax från Norge', bild: '/assets/img/bild1.webp' },
    { id: 2, namn: 'Torsk', pris: 159, enhet: 'kg', kategori: 'Färsk fisk', beskrivning: 'Färsk torsk från Västkusten', bild: '/assets/img/bild5.webp' },
    { id: 3, namn: 'Räkor, färska', pris: 245, enhet: 'kg', kategori: 'Skaldjur', beskrivning: 'Färska västkusträkor', bild: '/assets/img/bild2.webp' },
    { id: 4, namn: 'Gravlax', pris: 289, enhet: 'kg', kategori: 'Delikatesser', beskrivning: 'Hemgjord gravlax', bild: '/assets/img/bild7.webp' },
    { id: 5, namn: 'Fiskbullar', pris: 89, enhet: 'kg', kategori: 'Delikatesser', beskrivning: 'Hemlagade fiskbullar', bild: '/assets/img/bild8.webp' },
    { id: 6, namn: 'Musslor', pris: 45, enhet: 'kg', kategori: 'Skaldjur', beskrivning: 'Färska blåmusslor', bild: '/assets/img/bild6.webp' },
  ];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, antal: item.antal + 0.5 } : item
        );
      } else {
        return [...prevCart, { ...product, antal: 0.5 }];
      }
    });
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === id) {
          const newAmount = Math.max(0, item.antal + change);
          return newAmount > 0 ? { ...item, antal: newAmount } : item;
        }
        return item;
      }).filter(item => item.antal > 0)
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.pris * item.antal), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.antal, 0);
  };

  const handleOrder = () => {
    setOrderSubmitted(true);
    setOrderDialog(false);
    setCart([]);
    setTimeout(() => setOrderSubmitted(false), 5000);
  };

  return (
    <MUIThemeProvider>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: '#1976d2',
            }}
          >
            Beställ online
          </Typography>

          <Button
            variant="contained"
            startIcon={
              <Badge badgeContent={getTotalItems()} color="error">
                <CartIcon />
              </Badge>
            }
            onClick={() => setOrderDialog(true)}
            disabled={cart.length === 0}
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' }
            }}
          >
            Varukorg ({getTotalPrice().toFixed(0)} kr)
          </Button>
        </Box>

        {orderSubmitted && (
          <Alert severity="success" sx={{ mb: 3 }}>
            🎉 Tack för din beställning! Vi kontaktar dig inom kort för bekräftelse och leveransdetaljer.
          </Alert>
        )}

        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 4,
            color: 'text.secondary'
          }}
        >
          Välj dina produkter nedan. Minsta beställning 200 kr. Leverans inom Göteborg.
        </Typography>

        <Grid container spacing={3}>
          {produkter.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 3,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-2px)' }
                }}
              >
                <Box
                  component="img"
                  src={product.bild}
                  alt={product.namn}
                  sx={{
                    height: 200,
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {product.namn}
                    </Typography>
                    <Chip
                      label={product.kategori}
                      size="small"
                      color={
                        product.kategori === 'Färsk fisk' ? 'primary' :
                        product.kategori === 'Skaldjur' ? 'secondary' : 'default'
                      }
                      variant="outlined"
                    />
                  </Box>
                  <Typography color="text.secondary" paragraph>
                    {product.beskrivning}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    {product.pris} kr/{product.enhet}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  {cart.find(item => item.id === product.id) ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                      <Button
                        size="small"
                        onClick={() => updateQuantity(product.id, -0.5)}
                        sx={{ minWidth: 30 }}
                      >
                        <RemoveIcon />
                      </Button>
                      <Typography sx={{ mx: 2 }}>
                        {cart.find(item => item.id === product.id)?.antal} {product.enhet}
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => updateQuantity(product.id, 0.5)}
                        sx={{ minWidth: 30 }}
                      >
                        <AddIcon />
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => addToCart(product)}
                      fullWidth
                      sx={{
                        backgroundColor: '#1976d2',
                        '&:hover': { backgroundColor: '#1565c0' }
                      }}
                    >
                      Lägg i varukorg
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Delivery Info */}
        <Box sx={{ mt: 6 }}>
          <Card sx={{ p: 3, backgroundColor: '#e3f2fd' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ShippingIcon sx={{ mr: 2, color: '#1976d2' }} />
              <Typography variant="h6" sx={{ color: '#1976d2' }}>
                Leveransinformation
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  🚚 Leveransområden
                </Typography>
                <Typography variant="body2">
                  Göteborg centrum, Majorna, Linnéstaden, Vasastaden och närområden.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  ⏰ Leveranstider
                </Typography>
                <Typography variant="body2">
                  Samma dag vid beställning före 12:00. Annars nästa dag mellan 10:00-18:00.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  💰 Leveransavgift
                </Typography>
                <Typography variant="body2">
                  69 kr. Fri leverans vid beställning över 500 kr.
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>

      {/* Order Dialog */}
      <Dialog open={orderDialog} onClose={() => setOrderDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          🛒 Din varukorg
        </DialogTitle>
        <DialogContent>
          {cart.length === 0 ? (
            <Typography>Din varukorg är tom</Typography>
          ) : (
            <>
              {cart.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {item.namn}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.antal} {item.enhet} × {item.pris} kr
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {(item.pris * item.antal).toFixed(0)} kr
                  </Typography>
                </Box>
              ))}
              <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body1">Subtotal:</Typography>
                  <Typography variant="body1">{getTotalPrice().toFixed(0)} kr</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body1">Leverans:</Typography>
                  <Typography variant="body1">{getTotalPrice() >= 500 ? 'Gratis' : '69 kr'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {(getTotalPrice() + (getTotalPrice() >= 500 ? 0 : 69)).toFixed(0)} kr
                  </Typography>
                </Box>
              </Box>

              <TextField
                fullWidth
                label="Leveransadress"
                multiline
                rows={2}
                margin="normal"
                required
                placeholder="Ange fullständig adress för leverans..."
              />

              <TextField
                fullWidth
                label="Telefonnummer"
                margin="normal"
                required
                placeholder="För leveransbekräftelse"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDialog(false)}>Avbryt</Button>
          {cart.length > 0 && (
            <Button
              variant="contained"
              onClick={handleOrder}
              disabled={getTotalPrice() < 200}
              sx={{
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' }
              }}
            >
              Skicka beställning
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          py: 3,
          mt: 6,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography color="text.secondary">
            Copyright © 2022 Knallefisk
          </Typography>
        </Container>
      </Box>
    </MUIThemeProvider>
  );
}