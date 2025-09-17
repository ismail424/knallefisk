'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { ShoppingCart, StorefrontOutlined } from '@mui/icons-material';
import Link from 'next/link';
import Pictures from '../components/Pictures';
import About from '../components/About';

export default function HomePage() {
  return (
    <Box>
      {/* Hero Section with Video Background */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #448f9b 0%, #5ba3b0 100%)'
        }}
      >
        {/* Background Video */}
        <Box
          component="video"
          autoPlay
          muted
          loop
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2
          }}
        >
          <source src="/video/havet.mp4" type="video/mp4" />
        </Box>

        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(68, 143, 155, 0.8)',
            zIndex: -1
          }}
        />

        {/* Hero Content */}
        <Container maxWidth="md" sx={{ textAlign: 'center', zIndex: 1, py: 8 }}>
          <Box sx={{ mb: 3 }}>
            <img
              src="/img/logo.svg"
              alt="Knallefisk Logo"
              style={{
                maxWidth: '300px',
                width: '100%',
                height: 'auto'
              }}
            />
          </Box>

          {/* CTA Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              href="/bestall_online"
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              sx={{
                backgroundColor: 'white',
                color: '#448f9b',
                px: 3,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#f0f9fa'
                }
              }}
            >
              Beställ här
            </Button>
            <Button
              component={Link}
              href="/hitta_butik"
              variant="outlined"
              size="large"
              startIcon={<StorefrontOutlined />}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 3,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#448f9b'
                }
              }}
            >
              Hitta butik
            </Button>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <About />

      {/* Gallery Section */}
      <Pictures />
    </Box>
  );
}
