import type { AppProps } from "next/app";
import {
	ChakraProvider,
	ColorModeScript,
	defineStyleConfig,
	extendTheme,
} from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { useEffect } from "react";
import { Auth, Amplify } from "aws-amplify";
import { createAppSyncClient } from "../appsync/AppSyncClient";
import amplifyConfig from "../deployment/amplify-config";
import theme from "../components/theme";
import "./_app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

Amplify.configure(amplifyConfig);

function App({ Component, pageProps, router }: AppProps) {
	const AnyComponent = Component as any;
	const validateUserSession = async () => {
		try {
			await Auth.currentSession();
		} catch (error) {
			console.error(error);
			const currentDomain = window.location.host;

			if (currentDomain.includes("app.")) {
				router.push("/signin");
			}
		}
	};

	// const chakratheme = extendTheme(
	// 	{
	// 	  components: {
	// 		Tag
	// 	  }
	// 	}
	//   )

	const getUserSession = async () => {
		try {
			await Auth.currentSession();
		} catch (error) {
			const currentDomain = window.location.host;

			if (currentDomain.includes("app.")) {
				router.push("/signin");
			}
		}
	};

	useEffect(() => {
		getUserSession();
	}, []);

	const queryClient = new QueryClient();

	return (
		<ChakraProvider>
			<ApolloProvider client={createAppSyncClient(validateUserSession)}>
				<QueryClientProvider client={queryClient}>
					<ColorModeScript
						initialColorMode={theme.config.initialColorMode}
					/>
					<AnyComponent {...pageProps} />
				</QueryClientProvider>
			</ApolloProvider>
		</ChakraProvider>
	);
}

export default App;
