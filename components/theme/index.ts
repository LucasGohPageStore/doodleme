import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
	config,
	styles: {
		global: {
			body: {
				bg: "#E4E5F1", // Update the background color here
			},
		},
	},
  fonts: {
    body: "Verdana, sans-serif", // Update the font here
    heading: "Verdana, sans-serif", // Update the font here
  },
});

export default theme;
