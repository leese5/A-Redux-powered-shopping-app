import { Global, css } from '@emotion/react';
import { theme } from './theme';

export const GlobalStyles = () => (
    <Global
      styles={css`
        body {
          margin: 0;
          padding: 0;
          background-color: ${theme.colors.background};
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: ${theme.colors.text};
        }
  
        h2, h3, p {
          margin: 0;
          padding: ${theme.spacing(1)} 0;
        }
  
        button {
          font-family: inherit;
        }
      `}
    />
  );