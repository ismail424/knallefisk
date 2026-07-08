export const priceInputSx = {
    '& .MuiInputBase-input': {
        fontSize: '1.4rem',
        fontWeight: 600,
        py: 1.5
    },
    '& .MuiInputLabel-root': {
        fontSize: '1.05rem'
    }
};

export const toggleGroupSx = (activeColor: string) => ({
    width: '100%',
    '& .MuiToggleButton-root': {
        flex: 1,
        minHeight: 52,
        fontSize: '1rem',
        textTransform: 'none',
        color: '#666',
        '&.Mui-selected': {
            backgroundColor: activeColor,
            color: 'white',
            fontWeight: 600,
            '&:hover': {
                backgroundColor: activeColor
            }
        }
    }
});
