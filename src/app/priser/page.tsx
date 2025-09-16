'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import MUIThemeProvider from '../../components/ThemeProvider';
import Navbar from '../../components/Navbar';

export default function Priser() {
  const fiskPriser = [
    { namn: 'Lax, färsk', pris: '189 kr/kg', kategori: 'Färsk fisk' },
    { namn: 'Torsk', pris: '159 kr/kg', kategori: 'Färsk fisk' },
    { namn: 'Kolja', pris: '149 kr/kg', kategori: 'Färsk fisk' },
    { namn: 'Rödspätta', pris: '179 kr/kg', kategori: 'Färsk fisk' },
    { namn: 'Makrill', pris: '89 kr/kg', kategori: 'Färsk fisk' },
    { namn: 'Sill', pris: '69 kr/kg', kategori: 'Färsk fisk' },
  ];

  const skaldjur = [
    { namn: 'Räkor, färska', pris: '245 kr/kg', kategori: 'Skaldjur' },
    { namn: 'Hummer', pris: '489 kr/kg', kategori: 'Skaldjur' },
    { namn: 'Krabba', pris: '329 kr/kg', kategori: 'Skaldjur' },
    { namn: 'Musslor', pris: '45 kr/kg', kategori: 'Skaldjur' },
    { namn: 'Ostron', pris: '25 kr/st', kategori: 'Skaldjur' },
  ];

  const delikatesser = [
    { namn: 'Gravlax', pris: '289 kr/kg', kategori: 'Delikatesser' },
    { namn: 'Rökt lax', pris: '349 kr/kg', kategori: 'Delikatesser' },
    { namn: 'Fiskbullar, hemlagade', pris: '89 kr/kg', kategori: 'Delikatesser' },
    { namn: 'Fiskpudding', pris: '79 kr/kg', kategori: 'Delikatesser' },
    { namn: 'Inlagd sill', pris: '129 kr/kg', kategori: 'Delikatesser' },
    { namn: 'Räksallad', pris: '189 kr/kg', kategori: 'Delikatesser' },
  ];

  const allaProdukter = [...fiskPriser, ...skaldjur, ...delikatesser];

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
          Priser
        </Typography>

        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 4,
            color: 'text.secondary'
          }}
        >
          Alla priser är aktuella och hämtas dagligen från Göteborgs Fiskauktion.
          Priserna kan variera beroende på säsong och tillgänglighet.
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 4, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Produkt
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Kategori
                </TableCell>
                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Pris
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allaProdukter.map((produkt, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                    '&:hover': { backgroundColor: '#e3f2fd' }
                  }}
                >
                  <TableCell sx={{ fontWeight: 'medium' }}>
                    {produkt.namn}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={produkt.kategori}
                      size="small"
                      color={
                        produkt.kategori === 'Färsk fisk' ? 'primary' :
                        produkt.kategori === 'Skaldjur' ? 'secondary' : 'default'
                      }
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {produkt.pris}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 4, p: 3, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
            📞 Kontakta oss för aktuella priser
          </Typography>
          <Typography>
            Priserna uppdateras dagligen. För de senaste priserna och specialerbjudanden,
            ring oss eller besök vår butik. Vi erbjuder även volymrabatter för större beställningar.
          </Typography>
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