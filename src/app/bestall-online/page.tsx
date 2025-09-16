'use client';'use client';



import React, { useState } from 'react';import React, { useState } from 'react';

import {import {

  Box,  Box,

  Container,  Container,

  Typography,  Typography,

  TextField,  Card,

  Button,  CardContent,

  Card,  CardActions,

  CardContent,  Grid,

  Alert,  Button,

} from '@mui/material';  Badge,

import {  Chip,

  Send as SendIcon,  Alert,

} from '@mui/icons-material';  Dialog,

  DialogTitle,

export default function BestallOnlinePage() {  DialogContent,

  const [formData, setFormData] = useState({  DialogActions,

    name: '',  TextField,

    date: '',} from '@mui/material';

    number: '',import {

    message: '',  ShoppingCart as CartIcon,

  });  Add as AddIcon,

  const [submitted, setSubmitted] = useState(false);  Remove as RemoveIcon,

  LocalShipping as ShippingIcon,

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {} from '@mui/icons-material';

    const { name, value } = e.target;import MUIThemeProvider from '../../components/ThemeProvider';

    setFormData(prev => ({import Navbar from '../../components/Navbar';

      ...prev,

      [name]: valueinterface Product {

    }));  id: number;

  };  namn: string;

  pris: number;

  const handleSubmit = (e: React.FormEvent) => {  enhet: string;

    e.preventDefault();  kategori: string;

    // Here you would integrate with EmailJS or your preferred email service  beskrivning: string;

    console.log('Form submitted:', formData);  bild: string;

    setSubmitted(true);}

    // Reset form after submission

    setTimeout(() => {interface CartItem extends Product {

      setFormData({  antal: number;

        name: '',}

        date: '',

        number: '',export default function BestallOnline() {

        message: '',  const [cart, setCart] = useState<CartItem[]>([]);

      });  const [orderDialog, setOrderDialog] = useState(false);

      setSubmitted(false);  const [orderSubmitted, setOrderSubmitted] = useState(false);

    }, 3000);

  };  const produkter: Product[] = [

    { id: 1, namn: 'Lax, färsk', pris: 189, enhet: 'kg', kategori: 'Färsk fisk', beskrivning: 'Färsk lax från Norge', bild: '/assets/img/bild1.webp' },

  return (    { id: 2, namn: 'Torsk', pris: 159, enhet: 'kg', kategori: 'Färsk fisk', beskrivning: 'Färsk torsk från Västkusten', bild: '/assets/img/bild5.webp' },

    <Box className="mt-24 min-h-screen bg-gray-50">    { id: 3, namn: 'Räkor, färska', pris: 245, enhet: 'kg', kategori: 'Skaldjur', beskrivning: 'Färska västkusträkor', bild: '/assets/img/bild2.webp' },

      <Container maxWidth="md" className="py-16">    { id: 4, namn: 'Gravlax', pris: 289, enhet: 'kg', kategori: 'Delikatesser', beskrivning: 'Hemgjord gravlax', bild: '/assets/img/bild7.webp' },

        <Typography     { id: 5, namn: 'Fiskbullar', pris: 89, enhet: 'kg', kategori: 'Delikatesser', beskrivning: 'Hemlagade fiskbullar', bild: '/assets/img/bild8.webp' },

          variant="h3"     { id: 6, namn: 'Musslor', pris: 45, enhet: 'kg', kategori: 'Skaldjur', beskrivning: 'Färska blåmusslor', bild: '/assets/img/bild6.webp' },

          component="h1"   ];

          className="text-center mb-12 font-bold text-gray-800"

        >  const addToCart = (product: Product) => {

          Beställ Online    setCart(prevCart => {

        </Typography>      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {

        <Card className="shadow-lg">        return prevCart.map(item =>

          <CardContent className="p-8">          item.id === product.id ? { ...item, antal: item.antal + 0.5 } : item

            {submitted && (        );

              <Alert       } else {

                severity="success"         return [...prevCart, { ...product, antal: 0.5 }];

                className="mb-6"      }

              >    });

                Tack för din beställning! Vi kontaktar dig snart.  };

              </Alert>

            )}  const updateQuantity = (id: number, change: number) => {

    setCart(prevCart =>

            <form onSubmit={handleSubmit} className="space-y-6">      prevCart.map(item => {

              <TextField        if (item.id === id) {

                fullWidth          const newAmount = Math.max(0, item.antal + change);

                label="Namn och efternamn"          return newAmount > 0 ? { ...item, antal: newAmount } : item;

                name="name"        }

                value={formData.name}        return item;

                onChange={handleInputChange}      }).filter(item => item.antal > 0)

                required    );

                variant="outlined"  };

                className="mb-4"

              />  const getTotalPrice = () => {

    return cart.reduce((total, item) => total + (item.pris * item.antal), 0);

              <TextField  };

                fullWidth

                label="Datum"  const getTotalItems = () => {

                name="date"    return cart.reduce((total, item) => total + item.antal, 0);

                type="date"  };

                value={formData.date}

                onChange={handleInputChange}  const handleOrder = () => {

                required    setOrderSubmitted(true);

                variant="outlined"    setOrderDialog(false);

                helperText="När vill du hämta din beställning?"    setCart([]);

                InputLabelProps={{    setTimeout(() => setOrderSubmitted(false), 5000);

                  shrink: true,  };

                }}

                className="mb-4"  return (

              />    <MUIThemeProvider>

      <Navbar />

              <TextField

                fullWidth      <Container maxWidth="lg" sx={{ py: 4 }}>

                label="Telefonnummer"        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>

                name="number"          <Typography

                type="tel"            variant="h3"

                value={formData.number}            component="h1"

                onChange={handleInputChange}            sx={{

                required              fontWeight: 'bold',

                variant="outlined"              color: '#1976d2',

                className="mb-4"            }}

              />          >

            Beställ online

              <TextField          </Typography>

                fullWidth

                label="Beställning / beskrivning"          <Button

                name="message"            variant="contained"

                value={formData.message}            startIcon={

                onChange={handleInputChange}              <Badge badgeContent={getTotalItems()} color="error">

                required                <CartIcon />

                multiline              </Badge>

                rows={6}            }

                variant="outlined"            onClick={() => setOrderDialog(true)}

                placeholder="Beskriv vad du vill beställa..."            disabled={cart.length === 0}

                className="mb-6"            sx={{

              />              backgroundColor: '#1976d2',

              '&:hover': { backgroundColor: '#1565c0' }

              <Button            }}

                type="submit"          >

                variant="contained"            Varukorg ({getTotalPrice().toFixed(0)} kr)

                size="large"          </Button>

                startIcon={<SendIcon />}        </Box>

                fullWidth

                className="bg-blue-600 hover:bg-blue-700 py-3 text-lg font-semibold"        {orderSubmitted && (

              >          <Alert severity="success" sx={{ mb: 3 }}>

                Skicka Beställning            🎉 Tack för din beställning! Vi kontaktar dig inom kort för bekräftelse och leveransdetaljer.

              </Button>          </Alert>

            </form>        )}

          </CardContent>

        </Card>        <Typography

          variant="h6"

        {/* Information Section */}          sx={{

        <Box className="mt-12 grid md:grid-cols-2 gap-8">            textAlign: 'center',

          <Card className="shadow-md">            mb: 4,

            <CardContent className="p-6">            color: 'text.secondary'

              <Typography variant="h6" className="font-semibold mb-4 text-blue-600">          }}

                📍 Hämtställen        >

              </Typography>          Välj dina produkter nedan. Minsta beställning 200 kr. Leverans inom Göteborg.

              <Typography variant="body2" className="text-gray-600 mb-2">        </Typography>

                <strong>Borås:</strong> Ålgårdsvägen 3, 506 30 Borås

              </Typography>        <Grid container spacing={3}>

              <Typography variant="body2" className="text-gray-600">          {produkter.map((product) => (

                <strong>Skene:</strong> Örbyvägen 27, 511 61 Skene            <Grid item xs={12} sm={6} md={4} key={product.id}>

              </Typography>              <Card

            </CardContent>                sx={{

          </Card>                  height: '100%',

                  display: 'flex',

          <Card className="shadow-md">                  flexDirection: 'column',

            <CardContent className="p-6">                  boxShadow: 3,

              <Typography variant="h6" className="font-semibold mb-4 text-green-600">                  transition: 'transform 0.2s',

                📞 Kontakt                  '&:hover': { transform: 'translateY(-2px)' }

              </Typography>                }}

              <Typography variant="body2" className="text-gray-600 mb-2">              >

                073 535 09 17                <Box

              </Typography>                  component="img"

              <Typography variant="body2" className="text-gray-600">                  src={product.bild}

                070 836 59 71                  alt={product.namn}

              </Typography>                  sx={{

            </CardContent>                    height: 200,

          </Card>                    objectFit: 'cover',

        </Box>                  }}

                />

        {/* Footer */}                <CardContent sx={{ flexGrow: 1, p: 3 }}>

        <Box className="mt-12 text-center py-8 bg-white rounded-lg shadow-sm">                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>

          <Typography variant="body2" className="text-gray-600">                    <Typography variant="h6" component="h3" gutterBottom>

            Copyright © 2022 Knallefisk                      {product.namn}

          </Typography>                    </Typography>

        </Box>                    <Chip

      </Container>                      label={product.kategori}

    </Box>                      size="small"

  );                      color={

}                        product.kategori === 'Färsk fisk' ? 'primary' :
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