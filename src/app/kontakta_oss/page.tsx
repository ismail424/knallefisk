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
      icon: <Email sx={{ fontSize: '3rem', color: '#448f9b' }} />,
      title: 'Email',
      details: ['rsacic@yahoo.se', 'almir.hamza@hotmail.com']
    },
    {
      icon: <Phone sx={{ fontSize: '3rem', color: '#448f9b' }} />,
      title: 'Telefon',
      details: ['073 535 09 17', '070 836 59 71']
    },
    {
      icon: <LocationOn sx={{ fontSize: '3rem', color: '#448f9b' }} />,
      title: 'Våra butiker',
      details: ['Ålgårdsvägen 3, 506 30 Borås', 'Örbyvägen 27, 511 61 Skene']
    }
  ];

  return (
    <Box sx={{ py: 6, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              color: '#448f9b',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Kontakta oss
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#666',
              maxWidth: 600,
              mx: 'auto',
              fontFamily: 'Poppins, sans-serif',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Vi hjälper dig gärna med frågor om våra produkter eller tar emot dina specialbeställningar.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#448f9b',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  mb: 3
                }}
              >
                Kontaktuppgifter
              </Typography>

              {contactInfo.map((contact, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 3,
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(68, 143, 155, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(68, 143, 155, 0.15)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      {contact.icon}
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#333',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600,
                            mb: 1
                          }}
                        >
                          {contact.title}
                        </Typography>
                        {contact.details.map((detail, idx) => (
                          <Typography
                            key={idx}
                            variant="body1"
                            sx={{
                              color: '#666',
                              fontFamily: 'Poppins, sans-serif',
                              mb: 0.5
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
            </Box>

            {/* Opening Hours */}
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(68, 143, 155, 0.1)',
                background: 'linear-gradient(135deg, #448f9b 0%, #5ba3b0 100%)',
                color: 'white'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <AccessTime sx={{ fontSize: '2rem' }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600
                    }}
                  >
                    Öppettider
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                  <strong>Borås:</strong><br />
                  Mån-Fre: 09:00-19:00<br />
                  Lör: 09:00-16:00<br />
                  Sön: 11:00-15:00
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  <strong>Skene:</strong><br />
                  Mån-Fre: 08:00-18:00<br />
                  Lör: 08:00-15:00<br />
                  Sön: 10:00-14:00
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} lg={8}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(68, 143, 155, 0.15)'
              }}
            >
              <Typography
                variant="h4"
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
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Namn"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Telefon (valfritt)"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Meddelande"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Skriv ditt meddelande här... Till exempel: specialbeställningar, frågor om produkter, etc."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      sx={{
                        backgroundColor: '#448f9b',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: '#3c7d88',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Skicka meddelande
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  backgroundColor: '#f0f9fa',
                  borderRadius: 3,
                  border: '1px solid rgba(68, 143, 155, 0.2)'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#448f9b',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    mb: 1
                  }}
                >
                  💡 Tips för din förfrågan
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  • För specialbeställningar, ange vilken typ av fisk/skaldjur du önskar<br />
                  • Meddela önskad leveransdag för större beställningar<br />
                  • Vi svarar normalt inom 24 timmar på vardagar
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}