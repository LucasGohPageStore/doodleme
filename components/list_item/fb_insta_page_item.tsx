import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Text,
	Stack,
	IconButton,
	Badge,
	Icon,
	Popover,
	PopoverTrigger,
	useDisclosure,
	useColorModeValue,
	Avatar,
	Flex,
	Checkbox,
} from "@chakra-ui/react";
import { FbAccount } from "../../graphql/API";


interface FbPageItemProps {
	socialAccount: FbAccount;
	onClick?: () => void;
}

export default function FbInstaPageItem(props: FbPageItemProps) {
	return (
		<Stack direction={"row"} align={"center"} spacing={3} p={"4"}>
			<Flex
				w={8}
				h={8}
				align={"center"}
				justify={"center"}
				rounded={"full"}
			>
				<Avatar
					name={props.socialAccount.name!}
					src={props.socialAccount.profilePictureUrl!}
					borderWidth="1px"
				/>{" "}
			</Flex>
			<Text fontWeight={600}>{props.socialAccount.name}</Text>
		</Stack>
	);
}
