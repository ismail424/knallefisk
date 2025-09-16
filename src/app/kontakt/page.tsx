'use client';'use client';'use client';



import React from 'react';

import {

  Box,import React from 'react';import React from 'react';

  Container,

  Typography,import {import {

  Grid,

  Card,  Box,  Box,

  CardContent,

} from '@mui/material';  Container,  Container,

import {

  Phone as PhoneIcon,  Typography,  Typography,

  Email as EmailIcon,

  LocationOn as LocationIcon,  Grid2 as Grid,  Grid,

} from '@mui/icons-material';

  Card,  Card,

export default function KontaktPage() {

  return (  CardContent,  CardContent,

    <Box className="mt-24">

      <Container maxWidth="lg" className="py-16">} from '@mui/material';} from '@mui/material';

        <div className="grid-kontakta-oss">

          <div className="text-center mb-8">import {import {

            <Typography 

              variant="h2"   Phone as PhoneIcon,  Phone as PhoneIcon,

              component="h1" 

              className="text-4xl font-bold text-gray-800 mb-8"  Email as EmailIcon,  Email as EmailIcon,

            >

              KONTAKTA OSS  LocationOn as LocationIcon,  LocationOn as LocationIcon,

            </Typography>

          </div>} from '@mui/icons-material';} from '@mui/icons-material';



          <Grid container spacing={4}>

            <Grid item xs={12} md={4}>

              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">export default function KontaktPage() {export default function KontaktPage() {

                <CardContent className="text-center p-8">

                  <EmailIcon className="text-6xl text-blue-600 mb-4" />  return (  return (

                  <Typography variant="h5" component="h3" className="font-semibold mb-4">

                    Email    <Box className="mt-24">    <Box className="mt-24">

                  </Typography>

                  <Typography variant="body1" className="text-gray-600">      <Container maxWidth="lg" className="py-16">      <Container maxWidth="lg" className="py-16">

                    rsacic@yahoo.se<br />

                    almir.hamza@hotmail.com        <Grid container spacing={4} className="grid-kontakta-oss">        <Grid container spacing={4} className="grid-kontakta-oss">

                  </Typography>

                </CardContent>          <Grid xs={12} className="text-center mb-8">          <Grid item xs={12} className="text-center mb-8">

              </Card>

            </Grid>            <Typography             <Typography 



            <Grid item xs={12} md={4}>              variant="h2"               variant="h2" 

              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">

                <CardContent className="text-center p-8">              component="h1"               component="h1" 

                  <PhoneIcon className="text-6xl text-green-600 mb-4" />

                  <Typography variant="h5" component="h3" className="font-semibold mb-4">              className="text-4xl font-bold text-gray-800 mb-8"              className="text-4xl font-bold text-gray-800 mb-8"

                    Nummer

                  </Typography>            >            >

                  <Typography variant="body1" className="text-gray-600">

                    073 535 09 17<br />              KONTAKTA OSS              KONTAKTA OSS

                    070 836 59 71

                  </Typography>            </Typography>            </Typography>

                </CardContent>

              </Card>          </Grid>          </Grid>

            </Grid>



            <Grid item xs={12} md={4}>

              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">          <Grid xs={12} md={4}>          <Grid item xs={12} md={4}>

                <CardContent className="text-center p-8">

                  <LocationIcon className="text-6xl text-red-600 mb-4" />            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">

                  <Typography variant="h5" component="h3" className="font-semibold mb-4">

                    Plats              <CardContent className="text-center p-8">              <CardContent className="text-center p-8">

                  </Typography>

                  <Typography variant="body1" className="text-gray-600">                <EmailIcon className="text-6xl text-blue-600 mb-4" />                <EmailIcon className="text-6xl text-blue-600 mb-4" />

                    Ålgårdsvägen 3, 506 30 Borås<br />

                    Örbyvägen 27, 511 61 Skene                <Typography variant="h5" component="h3" className="font-semibold mb-4">                <Typography variant="h5" component="h3" className="font-semibold mb-4">

                  </Typography>

                </CardContent>                  Email                  Email

              </Card>

            </Grid>                </Typography>                </Typography>

          </Grid>

        </div>                <Typography variant="body1" className="text-gray-600">                <Typography variant="body1" className="text-gray-600">



        {/* Footer */}                  rsacic@yahoo.se<br />                  rsacic@yahoo.se<br />

        <Box className="mt-12 text-center py-8 bg-gray-50 rounded-lg">

          <Typography variant="body2" className="text-gray-600">                  almir.hamza@hotmail.com                  almir.hamza@hotmail.com

            Copyright © 2022 Knallefisk

          </Typography>                </Typography>                </Typography>

        </Box>

      </Container>              </CardContent>              </CardContent>

    </Box>

  );            </Card>            </Card>

}
          </Grid>          </Grid>



          <Grid xs={12} md={4}>          <Grid item xs={12} md={4}>

            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">

              <CardContent className="text-center p-8">              <CardContent className="text-center p-8">

                <PhoneIcon className="text-6xl text-green-600 mb-4" />                <PhoneIcon className="text-6xl text-green-600 mb-4" />

                <Typography variant="h5" component="h3" className="font-semibold mb-4">                <Typography variant="h5" component="h3" className="font-semibold mb-4">

                  Nummer                  Nummer

                </Typography>                </Typography>

                <Typography variant="body1" className="text-gray-600">                <Typography variant="body1" className="text-gray-600">

                  073 535 09 17<br />                  073 535 09 17<br />

                  070 836 59 71                  070 836 59 71

                </Typography>                </Typography>

              </CardContent>              </CardContent>

            </Card>            </Card>

          </Grid>          </Grid>



          <Grid xs={12} md={4}>          <Grid item xs={12} md={4}>

            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">

              <CardContent className="text-center p-8">              <CardContent className="text-center p-8">

                <LocationIcon className="text-6xl text-red-600 mb-4" />                <LocationIcon className="text-6xl text-red-600 mb-4" />

                <Typography variant="h5" component="h3" className="font-semibold mb-4">                <Typography variant="h5" component="h3" className="font-semibold mb-4">

                  Plats                  Plats

                </Typography>                </Typography>

                <Typography variant="body1" className="text-gray-600">                <Typography variant="body1" className="text-gray-600">

                  Ålgårdsvägen 3, 506 30 Borås<br />                  Ålgårdsvägen 3, 506 30 Borås<br />

                  Örbyvägen 27, 511 61 Skene                  Örbyvägen 27, 511 61 Skene

                </Typography>                </Typography>

              </CardContent>              </CardContent>

            </Card>            </Card>

          </Grid>          </Grid>

        </Grid>        </Grid>

      </Container>

        {/* Footer */}    </Box>

        <Box className="mt-12 text-center py-8 bg-gray-50 rounded-lg">  );

          <Typography variant="body2" className="text-gray-600">}

            Copyright © 2022 Knallefiskimport MUIThemeProvider from '../../components/ThemeProvider';

          </Typography>import Navbar from '../../components/Navbar';

        </Box>

      </Container>export default function Kontakt() {

    </Box>  const [formData, setFormData] = useState({

  );    namn: '',

}    email: '',
    telefon: '',
    meddelande: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ namn: '', email: '', telefon: '', meddelande: '' });
    }, 3000);
  };

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
          Kontakta oss
        </Typography>

        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 4,
            color: 'text.secondary'
          }}
        >
          Vi hjälper gärna till med dina frågor om färsk fisk och skaldjur!
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  📞 Kontaktinformation
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <PhoneIcon sx={{ mr: 2, color: '#1976d2' }} />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Telefon
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        031-13 90 00
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Ring oss för direktbeställningar och frågor
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <EmailIcon sx={{ mr: 2, color: '#1976d2' }} />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        E-post
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        info@knallefisk.se
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Vi svarar inom 24 timmar
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <TimeIcon sx={{ mr: 2, color: '#1976d2' }} />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Kundservice
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Måndag - Fredag: 09:00 - 18:00<br />
                        Lördag: 09:00 - 15:00<br />
                        Söndag: 11:00 - 15:00
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ p: 3, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
                    🐟 Specialbeställningar
                  </Typography>
                  <Typography variant="body2">
                    Behöver du speciell fisk eller större mängder? Kontakta oss minst
                    24 timmar i förväg så fixar vi det från Göteborgs Fiskauktion.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  💬 Skicka meddelande
                </Typography>

                {submitted && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Tack för ditt meddelande! Vi återkommer inom 24 timmar.
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Namn"
                    name="namn"
                    value={formData.namn}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="E-post"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Telefon (valfritt)"
                    name="telefon"
                    value={formData.telefon}
                    onChange={handleInputChange}
                    margin="normal"
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Meddelande"
                    name="meddelande"
                    value={formData.meddelande}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    margin="normal"
                    required
                    placeholder="Berätta vad vi kan hjälpa dig med..."
                    sx={{ mb: 3 }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<SendIcon />}
                    fullWidth
                    sx={{
                      backgroundColor: '#1976d2',
                      '&:hover': { backgroundColor: '#1565c0' }
                    }}
                  >
                    Skicka meddelande
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Additional Info */}
        <Box sx={{ mt: 4 }}>
          <Card sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
              ℹ️ Bra att veta
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  🕒 Bästa tiden att ringa
                </Typography>
                <Typography variant="body2">
                  Morgon 09:00-11:00 för färskaste fisk och bästa utbudet.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  📦 Leveranser
                </Typography>
                <Typography variant="body2">
                  Vi levererar inom Göteborg. Kontakta oss för mer information om våra leveransområden.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  🎣 Fiskråd
                </Typography>
                <Typography variant="body2">
                  Osäker på vilken fisk som passar bäst? Våra experter ger gärna råd och tips!
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