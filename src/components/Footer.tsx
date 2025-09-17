'use client';

import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#f8f9fa',
                py: 3,
                mt: 'auto',
                borderTop: '1px solid #e0e0e0'
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#666',
                            fontFamily: 'Poppins, sans-serif'
                        }}
                    >
                        © 2025 Knallefisk - Färska delikatesser från hav och sjö
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;