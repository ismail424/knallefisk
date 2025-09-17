'use client';

import { Box, Container, Typography, Grid, Card, CardContent, TextField, Button, Paper } from '@mui/material';
import { Email, Phone, LocationOn, AccessTime, Send } from '@mui/icons-material';
import { useState } from 'react';

export default function KontaktaOssPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: '2rem', color: '#448f9b' }} />,
      title: 'Email',
      details: ['rsacic@yahoo.se', 'almir.hamza@hotmail.com']
    },
    {
      icon: <Phone sx={{ fontSize: '2rem', color: '#448f9b' }} />,
      title: 'Telefon',
      details: ['073 535 09 17', '070 836 59 71']
    },
    {
      icon: <LocationOn sx={{ fontSize: '2rem', color: '#448f9b' }} />,
      title: 'Våra butiker',
      details: ['Ålgårdsvägen 3, 506 30 Borås', 'Örbyvägen 27, 511 61 Skene']
    }
  ];

  return (
    <Box sx={{ py: 4, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              color: '#448f9b',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              mb: 2
            }}
          >
            Kontakta oss
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              maxWidth: 500,
              mx: 'auto'
            }}
          >
            Vi hjälper dig gärna med frågor om våra produkter.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            {contactInfo.map((contact, index) => (
              <Card
                key={index}
                sx={{
                  mb: 2,
                  borderRadius: 1,
                  border: '1px solid #e0e0e0',
                  backgroundColor: 'white'
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {contact.icon}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#333',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 600,
                          mb: 0.5,
                          fontSize: '1.1rem'
                        }}
                      >
                        {contact.title}
                      </Typography>
                      {contact.details.map((detail, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          sx={{
                            color: '#666',
                            fontSize: '0.9rem'
                          }}
                        >
                          {detail}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}

            {/* Opening Hours */}
            <Card
              sx={{
                borderRadius: 1,
                backgroundColor: '#448f9b',
                color: 'white'
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <AccessTime sx={{ fontSize: '2rem' }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                      fontSize: '1.1rem'
                    }}
                  >
                    Öppettider
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 1, fontSize: '0.9rem' }}>
                  <strong>Borås:</strong> Tis-Tor 10-18, Fre 10-19, Lör 10-15
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                  <strong>Skene:</strong> Tis-Tor 10-18, Fre 10-19, Lör 10-15
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 1,
                border: '1px solid #e0e0e0',
                backgroundColor: 'white'
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: '#448f9b',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  mb: 3
                }}
              >
                Skicka ett meddelande
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Namn"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="E-post"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Telefon (valfritt)"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Meddelande"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Skriv ditt meddelande här..."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<Send />}
                      sx={{
                        backgroundColor: '#448f9b',
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: '#3c7d88'
                        }
                      }}
                    >
                      Skicka meddelande
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}