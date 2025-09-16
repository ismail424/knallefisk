'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
} from '@mui/material';
import MUIThemeProvider from '../components/ThemeProvider';
import Navbar from '../components/Navbar';
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
    {
      src: '/assets/img/bild8.webp',
      alt: 'Laxmacka'
    },
    {
      src: '/assets/img/bild4.jpg',
      alt: 'Butiksbild'
    },
    {
      src: '/assets/img/bild5.webp',
      alt: 'Färsk fisk'
    },
    {
      src: '/assets/img/bild2.webp',
      alt: 'Räkor'
    },
    {
      src: '/assets/img/bild6.webp',
      alt: 'Skaldjur'
    }
  ];

  return (
    <MUIThemeProvider>
      <Navbar />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero Text Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#1976d2',
              mb: 3
            }}
          >
            Färska delikatesser från hav och sjö
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Knallefisk startades år 2006 av en trevlig fiskhandlare som såg fram emot att starta ett eget företag.
            Med 15 år av erfarenhet inom fiskbranchen erbjuder han och hans anställda alltid den bästa kvaliteten
            till det lägsta priset. Här hittar du allt från färsk fisk till färdiga delikatesser,
            som hämtas direkt från GÖTBORGS FISKAUKTION.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: '#1565c0',
              }
            }}
          >
            Beställ nu
          </Button>
        </Box>

        {/* Image Gallery */}
        <Grid container spacing={3}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={image.src}
                  alt={image.alt}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

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