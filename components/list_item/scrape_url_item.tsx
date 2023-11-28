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
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Moment from "moment";
import { AiOutlineWhatsApp, AiOutlineMail } from "react-icons/ai";
import { FaSms } from "react-icons/fa";
import { NoteItem } from "../../graphql/API";
import { useUpdateNoteItem } from "../../hooks/useSyncNoteItem";
import ConfirmationPopover from "../confirmation/confirmation_propover";
import { Tag } from "@chakra-ui/tag";
import { color1 } from "../../lib/utils/constants/color-constant";

interface ScrapeUrlItemProps {
	urlLink: string;
}
export default function ScrapeUrlItem(props: ScrapeUrlItemProps) {
	const { updateNoteItem } = useUpdateNoteItem();
	const { onOpen, onClose, isOpen } = useDisclosure();
	const toast = useToast();

	return (
		<Box
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			p={2}
			bg={useColorModeValue("gray.50", "gray.500")}
		>
			<Stack
				direction={{ base: "column", md: "row" }}
				alignItems="center"
			>
				<Text fontWeight="semibold">{props.urlLink}</Text>
			</Stack>
		</Box>
	);
}
