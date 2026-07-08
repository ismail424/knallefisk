'use client';

import { useState } from 'react';
import { Box, Container, Card, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginFormProps {
    password: string;
    loginError: string;
    isLoggingIn: boolean;
    onPasswordChange: (value: string) => void;
    onSubmit: () => void;
}

const LoginForm = ({ password, loginError, isLoggingIn, onPasswordChange, onSubmit }: LoginFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
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
                        type={showPassword ? 'text' : 'password'}
                        label="Lösenord"
                        value={password}
                        onChange={(e) => onPasswordChange(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                        error={!!loginError}
                        helperText={loginError}
                        sx={{
                            mb: 3,
                            '& .MuiInputBase-input': { fontSize: '1.2rem', py: 1.8 }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? 'Dölj lösenord' : 'Visa lösenord'}
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={onSubmit}
                        disabled={isLoggingIn}
                        sx={{
                            py: 1.8,
                            fontSize: '1.15rem',
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
};

export default LoginForm;
