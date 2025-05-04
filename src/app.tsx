import '@/app.css';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/core/constants/theme';
import { Router } from '@/router';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
};
