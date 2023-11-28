import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { AuthNav } from "./authenticationNav";
import Head from "next/head";

export default function Header() {
	return (
			<Head>
				<title>Pagestore - Subscription management platform</title>
				<meta name="description" content="Created by Lucas Goh" />
				<link rel="icon" href="/pagestore_bg_logo.png" />
			</Head>
	);
}
