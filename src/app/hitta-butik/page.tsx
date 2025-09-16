'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Phone as PhoneIcon,
  DirectionsCar as ParkingIcon,
} from '@mui/icons-material';
import MUIThemeProvider from '../../components/ThemeProvider';
import Navbar from '../../components/Navbar';

export default function HittaButik() {
  return (
    <MUIThemeProvider>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#1976d2',
            mb: 4
          }}
        >
          Hitta butik
        </Typography>

        <Grid container spacing={4}>
          {/* Store Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  📍 Knallefisk Göteborg
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationIcon sx={{ mr: 2, color: '#1976d2' }} />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Adress
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Feskekôrka<br />
                        Rosenlundsgatan<br />
                        411 20 Göteborg
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ mr: 2, color: '#1976d2' }} />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Telefon
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        031-13 90 00
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TimeIcon sx={{ mr: 2, color: '#1976d2' }} />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Öppettider
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Måndag - Fredag: 09:00 - 18:00<br />
                        Lördag: 09:00 - 15:00<br />
                        Söndag: 11:00 - 15:00
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ParkingIcon sx={{ mr: 2, color: '#1976d2' }} />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Parkering
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Begränsad gatuparkering<br />
                        Parkering finns på Rosenlundsgatan
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label="Färsk fisk" color="primary" size="small" />
                  <Chip label="Skaldjur" color="secondary" size="small" />
                  <Chip label="Delikatesser" color="default" size="small" />
                  <Chip label="Specialbeställningar" color="primary" variant="outlined" size="small" />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Map Placeholder */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent sx={{ p: 0, height: '100%' }}>
                <Box
                  sx={{
                    height: '100%',
                    minHeight: 400,
                    backgroundColor: '#e8f5e8',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: 'linear-gradient(45deg, #e3f2fd 25%, transparent 25%), linear-gradient(-45deg, #e3f2fd 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e3f2fd 75%), linear-gradient(-45deg, transparent 75%, #e3f2fd 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                  }}
                >
                  <LocationIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#1976d2', textAlign: 'center' }}>
                    🗺️ Karta
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
                    Vi ligger i hjärtat av Göteborgs fiskmarknad<br />
                    Lätt att hitta med kollektivtrafik
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Directions */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            🚗 Vägbeskrivning
          </Typography>
          <Card sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  🚌 Kollektivtrafik
                </Typography>
                <Typography variant="body2">
                  • Spårvagn linje 3, 9, 11: Hållplats Rosenlund<br />
                  • Buss 16, 19: Hållplats Rosenlund<br />
                  • 2 minuters promenad från hållplatsen
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  🚗 Med bil
                </Typography>
                <Typography variant="body2">
                  • Från E6: Avfart Göteborg centrum<br />
                  • Följ skyltarna mot "Centrum"<br />
                  • Kör till Rosenlundsgatan<br />
                  • Begränsad gatuparkering tillgänglig
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Box>
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