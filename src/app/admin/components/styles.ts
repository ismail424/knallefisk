// Soft, rounded design tokens for the admin panel, built around the brand teal
export const BRAND = '#448f9b';
export const BRAND_DARK = '#357a84';
export const DANGER = '#c2564e';
export const MUTED = '#607d8b';

export const priceInputSx = {
    '& .MuiOutlinedInput-root': { borderRadius: 3 },
    '& .MuiInputBase-input': {
        fontSize: '1.25rem',
        fontWeight: 600,
        py: 1.2
    },
    '& .MuiInputLabel-root': {
        fontSize: '1rem'
    }
};

export const pillButtonSx = {
    borderRadius: 999,
    textTransform: 'none' as const,
    boxShadow: 'none',
    fontSize: '0.95rem',
    '&:hover': { boxShadow: 'none' }
};

// iOS-style segmented control: light track, the selected option becomes a
// white pill with tinted text - soft but unmistakable state
export const toggleGroupSx = (yesColor: string, noColor: string = MUTED) => ({
    width: '100%',
    backgroundColor: '#eef2f3',
    borderRadius: 999,
    p: 0.5,
    gap: 0.5,
    '& .MuiToggleButton-root': {
        flex: 1,
        minHeight: 40,
        fontSize: '0.95rem',
        textTransform: 'none',
        color: '#90a4ae',
        border: 'none',
        borderRadius: '999px !important',
        '&.Mui-selected': {
            backgroundColor: 'white',
            color: yesColor,
            fontWeight: 600,
            boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
            '&:hover': { backgroundColor: 'white' }
        }
    },
    '& .MuiToggleButton-root:last-of-type.Mui-selected': {
        color: noColor
    }
});
