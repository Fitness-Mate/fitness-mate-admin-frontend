import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '.85rem', 
          borderRadius: '10px',
          padding: '15px',
          lineHeight: '2',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#272B2F', // hover 시 배경색 변경
          },
        },
      },
    },
  },
});

export default theme;