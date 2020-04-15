import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';

const globalStyles = css`
	html,
	body,
	#__next {
		overflow: hidden;
		height: 100%;
	}
`;

const App = ({ Component, pageProps }: AppProps) => (
	<ThemeProvider>
		<CSSReset></CSSReset>
		<Global styles={globalStyles} />
		<ColorModeProvider>
			<Component {...pageProps} />
		</ColorModeProvider>
	</ThemeProvider>
);

export default App;
