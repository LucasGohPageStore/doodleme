import {
	Box,
	Center,
	Container,
	Flex,
	IconButton,
	Image,
} from "@chakra-ui/react";
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
			<Center>
				<Container
					maxW={{ base: "3xl", sm: "5xl", md: "8xl" }}
					position="fixed"
					top={0}
					width="100%"
					zIndex={10}
				>
					{" "}
					<Box px={4}>
						<Flex
							h={16}
							alignItems={"center"}
							justifyContent={"space-between"}
						>
							<Box display={"flex"}>
								<Image
									boxSize="100px"
									objectFit="cover"
									src="doodleme_logo.png"
								/>
							</Box>

							<Flex alignItems={"center"}>
								<AuthNav />
							</Flex>
						</Flex>
					</Box>
				</Container>
			</Center>
		</>
	);
}
