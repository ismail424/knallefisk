'use client';

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { LocationOn, AccessTime, StorefrontOutlined } from '@mui/icons-material';

const HittaButik = () => {
  const stores = [
    {
      name: 'Skene',
      address: 'Utanför Willys',
      hours: [
        'Måndag: Stängt',
        'Tisdag-Torsdag: 10:00 - 18:00',
        'Fredag: 10:00 - 19:00',
        'Lördag: 10:00 - 15:00',
        'Söndag: Stängt'
      ],
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2134.123456789!2d12.123456!3d57.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zWW91ciBTa2VuZSBMb2NhdGlvbg!5e0!3m2!1sen!2sse!4v1234567890123'
    },
    {
      name: 'Borås',
      address: 'Utanför Willys',
      hours: [
        'Måndag: Stängt',
        'Tisdag-Torsdag: 10:00 - 18:00',
        'Fredag: 10:00 - 19:00',
        'Lördag: 10:00 - 15:00',
        'Söndag: Stängt'
      ],
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2134.123456789!2d12.123456!3d57.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zWW91ciBCb3LDpXMgTG9jYXRpb24!5e0!3m2!1sen!2sse!4v1234567890123'
    }
  ];

  return (
    <Box sx={{ py: 6, backgroundColor: 'white', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Stores Grid */}
        <Grid container spacing={4}>
          {stores.map((store, index) => (
            <Grid item xs={12} lg={6} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  overflow: 'hidden'
                }}
              >
                {/* Store Header */}
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: '#448f9b',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <StorefrontOutlined sx={{ fontSize: '2rem' }} />
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600
                    }}
                  >
                    {store.name}
                  </Typography>
                </Box>

                <CardContent sx={{ p: 0 }}>
                  {/* Google Map */}
                  <Box sx={{ height: 250, width: '100%' }}>
                    <iframe
                      src={store.mapEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </Box>

                  <Box sx={{ p: 3 }}>
                    {/* Address */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                      <LocationOn sx={{ color: '#448f9b', mt: 0.5, mr: 1 }} />
                      <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                        {store.address}
                      </Typography>
                    </Box>

                    {/* Opening Hours */}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccessTime sx={{ color: '#448f9b', mr: 1 }} />
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600,
                            color: '#333'
                          }}
                        >
                          Öppettider
                        </Typography>
                      </Box>
                      <Box sx={{ ml: 4 }}>
                        {store.hours.map((hour, idx) => (
                          <Typography
                            key={idx}
                            variant="body2"
                            sx={{ mb: 0.5, fontFamily: 'Poppins, sans-serif' }}
                          >
                            {hour}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HittaButik;