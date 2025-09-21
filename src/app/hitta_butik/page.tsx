'use client';

import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { StorefrontOutlined } from '@mui/icons-material';

const HittaButik = () => {
  const stores = [
    {
      name: 'Knalle Fisk - Skene',
      hours: [
        'Måndag: Stängt',
        'Tisdag: Stängt',
        'Onsdag: Stängt',
        'Torsdag: 10:00 - 18:00',
        'Fredag: 10:00 - 19:00',
        'Lördag: 10:00 - 15:00',
        'Söndag: Stängt'
      ],
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d536.1354135958156!2d12.647960488173517!3d57.48614171965853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x96f6138a27b74bc5!2zNTfCsDI5JzEwLjEiTiAxMsKwMzgnNTQuNiJF!5e0!3m2!1ssv!2sse!4v1667306940644!5m2!1ssv!2sse'
    },
    {
      name: 'Knalle Fisk - Borås',
      hours: [
        'Måndag: Stängt',
        'Tisdag: 10:00 - 18:00',
        'Onsdag: 10:00 - 18:00',
        'Torsdag: 10:00 - 18:00',
        'Fredag: 10:00 - 19:00',
        'Lördag: 10:00 - 15:00',
        'Söndag: Stängt'
      ],
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1065.0512317216635!2d12.933504154929423!3d57.73170229381581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465aa7204c244b79%3A0x1d516f3454bd77dd!2sKnalle%20Fisk!5e0!3m2!1ssv!2sse!4v1616927781991!5m2!1ssv!2sse'
    }
  ];

  return (
    <Box sx={{ pt: { xs: '240px', md: '200px' }, pb: 6, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Simple Page Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              color: '#448f9b',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              mb: 2
            }}
          >
            Hitta Vår Butik
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            Besök oss på någon av våra två platser
          </Typography>
        </Box>

        {/* Simple Stores Grid */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 4
        }}>
          {stores.map((store, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}
            >
              {/* Simple Store Header */}
              <Box
                sx={{
                  p: 3,
                  backgroundColor: '#448f9b',
                  color: 'white'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <StorefrontOutlined />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600
                    }}
                  >
                    {store.name}
                  </Typography>
                </Box>
              </Box>

              <CardContent sx={{ p: 0 }}>
                {/* Google Map */}
                <Box sx={{ height: 300, width: '100%' }}>
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

                {/* Simple Opening Hours */}
                <Box sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                      color: '#333',
                      mb: 2
                    }}
                  >
                    Öppettider
                  </Typography>
                  
                  <Box>
                    {store.hours.map((hour, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          color: hour.includes('Stängt') ? '#999' : '#333',
                          mb: 0.5
                        }}
                      >
                        {hour}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HittaButik;