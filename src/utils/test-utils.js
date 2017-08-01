import React from 'react';
import { render } from 'enzyme'; // eslint-disable-line
import { ThemeProvider } from 'styled-components';

// eslint-disable-next-line
export const renderWithTheme = component => render(React.createElement(ThemeProvider, { theme: {} }, component));
