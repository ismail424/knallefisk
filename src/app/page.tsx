'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
} from '@mui/material';
import MUIThemeProvider from '../components/ThemeProvider';
import Image from 'next/image';

export default function Home() {
  const images = [
    {
      src: '/assets/img/store_front.webp',
      alt: 'Knallefisk butik'
    },
    {
      src: '/assets/img/bild1.webp',
      alt: 'Färsk fisk'
    },
    {
      src: '/assets/img/bild7.webp',
      alt: 'Räkmacka'
    },
  ];

  return (
    <MUIThemeProvider>
      <Box className="min-h-screen">
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
            </Box>
          </Container>
        </Box>

        {/* Hero Section with Video Background */}
        <Box className="relative h-screen flex items-center justify-center overflow-hidden">
          <video 
            autoPlay 
            muted 
            loop 
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source src="/assets/video/havet.mp4" type="video/mp4" />
          </video>
          
          <Box className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10" />
          
          <Container maxWidth="lg" className="relative z-20 text-center text-white">
            <Box className="mb-12">
              <Image 
                src="/assets/img/logo.svg" 
                alt="Knallefisk Logo" 
                width={300} 
                height={180}
                className="mx-auto mb-8"
              />
            </Box>
            
            <Typography 
              variant="h2" 
              component="h1" 
              className="mb-12 font-light tracking-widest uppercase text-white"
              sx={{ 
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                fontWeight: 300,
                letterSpacing: '0.1em'
              }}
            >
              FÄRSKA DELIKATESSER FRÅN HAV OCH SJÖ
            </Typography>
            
            <Button 
              variant="contained" 
              size="large" 
              href="/bestall-online"
              className="bg-red-500 hover:bg-red-600 px-12 py-4 text-xl font-bold uppercase tracking-wide"
              sx={{
                backgroundColor: '#ef4444',
                '&:hover': {
                  backgroundColor: '#dc2626'
                },
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderRadius: '4px'
              }}
            >
              BESTÄLL NU
            </Button>
          </Container>
        </Box>

        {/* About Section */}
        <Container maxWidth="lg" className="py-24">
          <Box className="flex flex-col md:flex-row items-center gap-12">
            <Box className="flex-1">
              <Image 
                src="/assets/img/store_front.webp"
                alt="Bild på framsidan av fisk affären"
                width={600}
                height={500}
                className="rounded-lg shadow-lg w-full"
              />
            </Box>
            <Box className="flex-1">
              <Typography variant="h4" component="h2" className="mb-6 font-semibold text-gray-800">
                Om Knallefisk
              </Typography>
              <Typography variant="body1" className="text-gray-600 leading-relaxed text-lg">
                Knallefisk startades år 2006 av en trevlig fiskhandlare som såg fram
                emot att starta ett eget företag. Med 15 år av erfarenhet inom fiskbranchen
                erbjuder han och hans anställda alltid den bästa kvaliteten till det lägsta
                priset. Här hittar du allt från färsk fisk till färdiga delikatesser, som hämtas direkt
                från GÖTBORGS FISKAUKTION.
              </Typography>
            </Box>
          </Box>
        </Container>

        {/* Image Gallery */}
        <Box className="bg-gray-50 py-16">
          <Container maxWidth="lg">
            <Typography variant="h4" component="h2" className="text-center mb-12 font-semibold text-gray-800">
              Våra Produkter
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardMedia
                    component="img"
                    height="250"
                    image={image.src}
                    alt={image.alt}
                    className="h-64 object-cover"
                  />
                </Card>
              ))}
            </Box>
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
