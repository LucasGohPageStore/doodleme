import { Box, Container, Flex, IconButton, Image } from "@chakra-ui/react";
import { AuthNav } from "./authenticationNav";
import Header from "./header";
import { FiMenu } from "react-icons/fi";

interface DashboardNavProps {
	onOpen?: () => void;
	isLogo?: boolean;
}

export default function DashboardNav(props: DashboardNavProps) {
	return (
		<>
			<Header />
			<Container maxW={{ base: "3xl", sm: "5xl", md: "8xl" }}>
				<Box px={4}>
					<Flex
						h={16}
						alignItems={"center"}
						justifyContent={"space-between"}
					>
						<IconButton
							display={{ base: "flex", md: "none" }}
							onClick={props.onOpen!}
							variant="outline"
							aria-label="open menu"
							icon={<FiMenu />}
						/>
						{props.isLogo ? (
							<Box display={{ base: "none", md: "flex" }}>
								<Image
									boxSize="100px"
									objectFit="cover"
									src="pagestore_logo.png"
								/>
							</Box>
						) : (
							<div></div>
						)}

						<Flex alignItems={"center"}>
							<AuthNav />
						</Flex>
					</Flex>
				</Box>
			</Container>
		</>
	);
}
