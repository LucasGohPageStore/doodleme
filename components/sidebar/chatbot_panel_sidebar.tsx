import {
	Box,
	Text,
	Flex,
	Image,
	BoxProps,
	useColorModeValue,
	CloseButton,
	FlexProps,
	Icon,
	Link,
	Container,
	Button,
} from "@chakra-ui/react";
import { ReactText } from "react";
import { IconType } from "react-icons";
import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiSettings,
	FiMenu,
	FiBell,
	FiChevronDown,
	FiGrid,
	FiBarChart,
	FiColumns,
	FiPhoneCall,
	FiBookOpen,
	FiInstagram,
} from "react-icons/fi";
import { color1, color3 } from "../../lib/utils/constants/color-constant";
import { AddIcon } from "@chakra-ui/icons";
import { FaBookOpen, FaPenSquare } from "react-icons/fa";
import router from "next/router";

interface LinkItemProps {
	name: string;
	icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
	{ name: "Home", icon: FiGrid },
	{ name: "Trending", icon: FiTrendingUp },
	{ name: "Explore", icon: FiCompass },
	{ name: "Favourites", icon: FiStar },
	{ name: "Settings", icon: FiSettings },
];

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {
	const onCreateBot = () => {
		router.push("/view_bot");
	};

	const onCreateBookingType = () => {
		router.push("/view_booking_types");
	};

	const onSocialConfig = () => {
		router.push("/view_social");
	};

	const onCreateKnowledgebase = () => {
		router.push("/view_knowledgebase");
	};

	return (
		<Container maxW={{ base: "3xl", sm: "5xl", md: "8xl" }}>
			<Box
				transition="3s ease"
				borderRight="1px"
				borderRightColor={useColorModeValue("gray.200", "gray.700")}
				w={{ base: "full", md: 60 }}
				pos="fixed"
				h="full"
				{...rest}
			>
				<Flex
					h="20"
					alignItems="center"
					mx="8"
					justifyContent="space-between"
				>
					<Box>
						<Image
							boxSize="100px"
							objectFit="cover"
							src="doodleme_logo.png"
						/>
					</Box>
					<CloseButton
						display={{ base: "flex", md: "none" }}
						onClick={onClose}
					/>
				</Flex>

				<Flex align="center" p="4" mx="4">
					<Button
						leftIcon={<AddIcon />}
						variant="solid"
						colorScheme={"messenger"}
						borderRadius="lg"
						px={6}
						_hover={{
							bg: "pink.400",
						}}
						onClick={onCreateBot}
					>
						Create booking
					</Button>
				</Flex>
				<TitleItem>Overview</TitleItem>
				<NavItem icon={FiGrid}>{"Dashboard"}</NavItem>
				<NavItem icon={FiBarChart}>{"Analytics"}</NavItem>
				<TitleItem>Booking</TitleItem>
				<NavItem icon={FaPenSquare} onClick={onCreateBookingType}>
					{"Booking types"}
				</NavItem>
				<NavItem icon={FaBookOpen} onClick={onCreateKnowledgebase}>
					{"My booking"}
				</NavItem>
				<NavItem icon={FiPhoneCall}>{"My contact"}</NavItem>
				{/* <TitleItem>Chatbot</TitleItem>
				<NavItem icon={FaPenSquare} onClick={onCreateBot}>
					{"Chatbot"}
				</NavItem>
				<NavItem icon={FaBookOpen} onClick={onCreateKnowledgebase}>
					{"Knowledgebase"}
				</NavItem>
				<NavItem icon={FiColumns}>{"View all"}</NavItem>
				<TitleItem>Configuration</TitleItem>
				<NavItem icon={FiInstagram} onClick={onSocialConfig}>{"Social"}</NavItem>
				<TitleItem>Help</TitleItem> */}

				<NavItem icon={FiPhoneCall}>{"Support"}</NavItem>
				<NavItem icon={FiBookOpen}>{"Documentation"}</NavItem>
			</Box>
		</Container>
	);
}

interface NavItemProps extends FlexProps {
	icon: IconType;
	children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
	return (
		<Flex
			align="center"
			p="3"
			mx="4"
			borderRadius="lg"
			role="group"
			cursor="pointer"
			_hover={{
				bg: color1,
				color: color3,
			}}
			{...rest}
		>
			{icon && (
				<Icon
					mr="4"
					fontSize="16"
					_groupHover={{
						color: color3,
					}}
					as={icon}
				/>
			)}
			{children}
		</Flex>
	);
};

interface TitleItemProps extends FlexProps {
	children: ReactText;
}
const TitleItem = ({ children, ...rest }: TitleItemProps) => {
	return (
		<Flex align="center" p="4" mx="4" {...rest}>
			<Text as="b">{children}</Text>
		</Flex>
	);
};
