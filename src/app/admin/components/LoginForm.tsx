'use client';

import { Box, Container, Card, Typography, TextField, Button } from '@mui/material';

interface LoginFormProps {
    password: string;
    loginError: string;
    isLoggingIn: boolean;
    onPasswordChange: (value: string) => void;
    onSubmit: () => void;
}

const LoginForm = ({ password, loginError, isLoggingIn, onPasswordChange, onSubmit }: LoginFormProps) => (
    <Box sx={{
        pt: { xs: '260px', md: '220px' },
        pb: 8,
        px: { xs: 2, md: 4 },
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <Container maxWidth="sm">
            <Card sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h4" sx={{
                    mb: 3,
                    textAlign: 'center',
                    fontSize: { xs: '1.75rem', md: '2.125rem' },
                    color: '#448f9b'
                }}>
                    Admin-inloggning
                </Typography>
                <TextField
                    fullWidth
                    type="password"
                    label="Lösenord"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                    error={!!loginError}
                    helperText={loginError}
                    sx={{ mb: 3 }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    onClick={onSubmit}
                    disabled={isLoggingIn}
                    sx={{
                        py: 1.5,
                        backgroundColor: '#448f9b',
                        '&:hover': {
                            backgroundColor: '#357a84'
                        }
                    }}
                >
                    {isLoggingIn ? 'Loggar in...' : 'Logga in'}
                </Button>
            </Card>
        </Container>
    </Box>
);

export default LoginForm;
