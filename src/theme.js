import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      sectionHeaderHeadline: {
        fontSize: '48px',
        lineHeight: 1.08349,
        fontWeight: 600,
        letterSpacing: '-0.003em',
        fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
      },
      sectionSubHeaderHeadline: {
        fontSize: '28px',
        lineHeight: 1.08349,
        fontWeight: 600,
        letterSpacing: '-0.003em',
        fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
      },
    },
  });

  export default theme;  