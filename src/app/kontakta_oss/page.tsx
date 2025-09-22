'use client';

import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { Email, Phone, LocationOn, AccessTime } from '@mui/icons-material';

export default function KontaktaOssPage() {
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
    },
    {
      icon: <AccessTime sx={{ fontSize: '3rem', color: '#448f9b' }} />,
      title: 'Öppettider',
      details: [
        'Borås: Tis-Tor 10-18, Fre 10-19, Lör 10-15',
        'Skene: Tor 10-18, Fre 10-19, Lör 10-15'
      ]
    }
  ];

  return (
    <Box sx={{ pt: { xs: '140px', md: '120px' }, pb: 8, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Simple Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              color: '#448f9b',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              mb: 3
            }}
          >
            Kontakta oss
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#666',
              fontFamily: 'Poppins, sans-serif',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Vi finns här för att hjälpa dig med alla dina frågor om våra färska produkter från havet
          </Typography>
        </Box>

        {/* Contact Cards Grid */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 4,
          mb: 8
        }}>
          {contactInfo.map((contact, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid rgba(68, 143, 155, 0.1)',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                }
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                <Box sx={{ mb: 3 }}>
                  {contact.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#333',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    mb: 2,
                    fontSize: '1.3rem'
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
                      mb: 1,
                      fontSize: '1rem',
                      lineHeight: 1.5
                    }}
                  >
                    {detail}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Simple Call to Action */}
        <Box 
          sx={{ 
            textAlign: 'center',
            p: 6,
            backgroundColor: 'white',
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#448f9b',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              mb: 2
            }}
          >
            Välkommen!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#666',
              fontFamily: 'Poppins, sans-serif',
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Kom och besök oss i butiken eller kontakta oss direkt. Vi ser fram emot att hjälpa dig hitta de bästa produkterna från havet!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}