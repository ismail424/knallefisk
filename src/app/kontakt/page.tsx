'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import MUIThemeProvider from '../../components/ThemeProvider';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Kontakt() {
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
            </Box>
          </Container>
        </Box>

        {/* Main Content */}
        <Box className="pt-24 pb-16">
          <Container maxWidth="lg">
            <Typography 
              variant="h3" 
              component="h1" 
              className="text-center mb-16 font-bold text-gray-800"
            >
              KONTAKTA OSS
            </Typography>

            <Box className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Email Card */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="text-center p-8">
                  <Box className="mb-6">
                    <EmailIcon className="text-teal-500 text-6xl" />
                  </Box>
                  <Typography variant="h5" component="h2" className="mb-4 font-semibold text-gray-800">
                    Email
                  </Typography>
                  <Typography variant="body1" className="text-gray-600 leading-relaxed">
                    rsacic@yahoo.se<br />
                    almir.hamza@hotmail.com
                  </Typography>
                </CardContent>
              </Card>

              {/* Phone Card */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="text-center p-8">
                  <Box className="mb-6">
                    <PhoneIcon className="text-teal-500 text-6xl" />
                  </Box>
                  <Typography variant="h5" component="h2" className="mb-4 font-semibold text-gray-800">
                    Nummer
                  </Typography>
                  <Typography variant="body1" className="text-gray-600 leading-relaxed">
                    073 535 09 17<br />
                    070 836 59 71
                  </Typography>
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="text-center p-8">
                  <Box className="mb-6">
                    <LocationOnIcon className="text-teal-500 text-6xl" />
                  </Box>
                  <Typography variant="h5" component="h2" className="mb-4 font-semibold text-gray-800">
                    Plats
                  </Typography>
                  <Typography variant="body1" className="text-gray-600 leading-relaxed">
                    Ålgårdsvägen 3, 506 30 Borås<br />
                    Örbyvägen 27, 511 61 Skene
                  </Typography>
                </CardContent>
              </Card>
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
