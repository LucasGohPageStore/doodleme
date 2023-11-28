import {
	AddIcon,
	ChevronDownIcon,
	DeleteIcon,
	EditIcon,
	ExternalLinkIcon,
	HamburgerIcon,
	RepeatIcon,
} from "@chakra-ui/icons";
import {
	Stack,
	Heading,
	Box,
	Center,
	Flex,
	Avatar,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import { FbAccount } from "../../graphql/API";
import {
	color2,
	color4,
	color1,
} from "../../lib/utils/constants/color-constant";

interface SocialAccountDisplayItemProps {
	socialAccount: FbAccount;
	onClickItem: (id: string) => void;
}

export default function SocialAccountDisplayItem(
	props: SocialAccountDisplayItemProps
) {
	return (
		<Box>
			<Center
				borderWidth="1px"
				borderRadius="lg"
				borderColor={color2}
				borderStyle={"solid"}
				p={5}
				maxW={200}
				position={"relative"}
			>
				<Box position="absolute" top="2" right="2">
					<Menu>
						<MenuButton
							as={IconButton}
							aria-label="Options"
							icon={<HamburgerIcon />}
							variant="ghost"
							size="sm"
						/>
						<MenuList>
							<MenuItem
								onClick={() =>
									props.onClickItem(props.socialAccount.id!)
								}
							>
								Remove
							</MenuItem>
						</MenuList>
					</Menu>
				</Box>
				<Stack align={"center"} spacing={2}>
					<Flex
						w={16}
						h={16}
						align={"center"}
						justify={"center"}
						rounded={"full"}
					>
						<Avatar
							name={props.socialAccount.name ?? ""}
							src={props.socialAccount.profilePictureUrl ?? ""}
						/>
					</Flex>
					<Box mt={2}>
						<Heading size="md" textAlign={"center"}>
							{props.socialAccount.name}
						</Heading>
					</Box>
				</Stack>{" "}
			</Center>
		</Box>
	);
}
