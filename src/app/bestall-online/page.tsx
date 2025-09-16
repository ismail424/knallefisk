'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import MUIThemeProvider from '../../components/ThemeProvider';

export default function BestallOnline() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the form submission here
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <MUIThemeProvider>
      <Box className="min-h-screen bg-gray-50">
        {/* Navigation Header */}
        <Box className="fixed top-0 left-0 right-0 z-50 bg-teal-500 shadow-md">
          <Container maxWidth="xl" className="px-4">
            <Box className="flex justify-between items-center py-4">
              <Typography 
                variant="h4" 
                component="h1" 
                className="text-white font-bold tracking-wide"
              >
                KNALLEFISK
              </Typography>
              
              <Box className="hidden md:flex space-x-8">
                <Button 
                  color="inherit" 
                  href="/"
                  className="text-white hover:text-gray-200 font-medium"
                >
                  HEM
                </Button>
                <Button 
                  color="inherit" 
                  href="/priser"
                  className="text-white hover:text-gray-200 font-medium"
                >
                  PRISER
                </Button>
                <Button 
                  color="inherit" 
                  href="/hitta-butik"
                  className="text-white hover:text-gray-200 font-medium"
                >
                  HITTA BUTIK
                </Button>
                <Button 
                  color="inherit" 
                  href="/kontakt"
                  className="text-white hover:text-gray-200 font-medium"
                >
                  KONTAKTA OSS
                </Button>
                <Button 
                  color="inherit" 
                  href="/bestall-online"
                  className="text-white hover:text-gray-200 font-medium"
                >
                  BESTÄLL ONLINE
                </Button>
              </Box>
          </Container>
        </Box>

        {/* Main Content */}
        <Box className="pt-24 pb-16">
          <Container maxWidth="md">
            <Typography 
              variant="h3" 
              component="h1" 
              className="text-center mb-16 font-bold text-gray-800"
            >
              BESTÄLL ONLINE
            </Typography>

            {submitted && (
              <Alert severity="success" className="mb-6">
                Tack för din beställning! Vi kommer att kontakta dig snart.
              </Alert>
            )}

            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <TextField
                    fullWidth
                    label="Namn och efternamn*"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    className="mb-4"
                  />

                  <TextField
                    fullWidth
                    label="Datum (När vill du hämta din beställning)*"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="mb-4"
                  />

                  <TextField
                    fullWidth
                    label="Telefonnummer*"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    className="mb-4"
                  />

                  <TextField
                    fullWidth
                    label="Beställning / beskrivning*"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    className="mb-6"
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    className="bg-teal-500 hover:bg-teal-600 py-3 text-lg font-semibold"
                    sx={{
                      backgroundColor: '#14b8a6',
                      '&:hover': {
                        backgroundColor: '#0d9488'
                      }
                    }}
                  >
                    BESTÄLL
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Container>
        </Box>

        {/* Footer */}
        <Box className="bg-gray-800 py-8 text-center">
          <Container maxWidth="lg">
            <Typography variant="body1" className="text-gray-300">
              Copyright © 2022 Knallefisk
            </Typography>
          </Container>
        </Box>
      </Box>
    </MUIThemeProvider>
  );
}
