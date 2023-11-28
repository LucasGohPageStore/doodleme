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
	Tooltip,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Moment from "moment";
import { AiOutlineWhatsApp, AiOutlineMail } from "react-icons/ai";
import { FaSms } from "react-icons/fa";
import { Chatbot, Knowledgebase, NoteItem } from "../../graphql/API";
import { useUpdateNoteItem } from "../../hooks/useSyncNoteItem";
import ConfirmationPopover from "../confirmation/confirmation_propover";
import { Tag } from "@chakra-ui/tag";
import {
	pdfScrapeSource,
	websiteScrapeSource,
} from "../../lib/utils/constants/constants";
import { FaFilePdf, FaGlobe, FaFile } from "react-icons/fa";
import { isValidURL } from "../../lib/utils/utils";
import { useDeleteKnowledgebase } from "../../hooks/useSyncKnowledgebase";
import { useDeleteChatbot } from "../../hooks/useSyncChatbot";

interface ChatbotItemProps {
	chatbot: Chatbot;
	setModalOpen: (isOpen: boolean) => void;
	getChatbotList: any;
	setSelectedChatbotItem: (chatbot: Chatbot) => void;
}

export default function ChatbotItem(props: ChatbotItemProps) {
	const { deleteChatbot } =
		useDeleteChatbot();
	const { onOpen, onClose, isOpen } = useDisclosure();
	const toast = useToast();

	const handleDelete = async () => {
		try {
			deleteChatbot({
				variables: {
					chatbot: {
						id: props.chatbot!.id,
						isActive: false,
					},
				},
			}).then((data) => {
				toast({
					title: "Delete Success.",
					description: "We've deleted the item for you.",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
				props.getChatbotList();
			});
		} catch (error: any) {
			toast({
				title: "Delete fail.",
				description: "Item is failed to be deleted.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return (
		<Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
			<Stack>
				<Stack
					direction={{ base: "column", md: "row" }}
					alignItems="center"
				>
					<Text fontWeight="semibold">{props.chatbot.title}</Text>
					<Box display="flex" alignItems="baseline">
						<Badge borderRadius="full" px="2" colorScheme="yellow">
							Created at
						</Badge>
						<Box
							color="gray.500"
							fontWeight="semibold"
							letterSpacing="wide"
							fontSize="xs"
							ml="2"
						>
							{Moment(props.chatbot.createdDateTime)
								.local()
								.format("DD MMM YYYY h:mm A")}{" "}
						</Box>
					</Box>
				</Stack>

				<Stack
					direction={{ base: "column", md: "row" }}
					justifyContent="space-between"
				>
					<Stack spacing={4}>
						<Text
							fontSize={{ base: "sm" }}
							textAlign={"left"}
							maxW={"4xl"}
						>
							{!props.chatbot.description
								? ""
								: props.chatbot.description.length > 125
								? `${props.chatbot.description.substring(
										0,
										125
								  )}....`
								: props.chatbot.description}
						</Text>
						<Stack
							direction={"row"}
							spacing={4}
							alignItems="center"
						>
							<Box display="flex" alignItems="center">
								<Badge variant="outline" colorScheme="telegram">
									Total of{" "}
									{props.chatbot.knowledgebase?.length}{" "}
									sources
								</Badge>
							</Box>
							<Text
								fontSize={{ base: "sm" }}
								textAlign={"left"}
								maxW={"4xl"}
							>
								&bull; by &bull;
							</Text>

							<Stack spacing={5} direction={"row"}></Stack>

							{props.chatbot.socialAccounts?.map((item) => {
								return (
									<Tooltip label={item?.name}>
										<Avatar
											name={item?.name ?? ""}
											src={item?.profilePictureUrl ?? ""}
											size={"sm"}
										/>
									</Tooltip>
								);
							})}
						</Stack>
					</Stack>

					<Stack direction={{ base: "column", md: "row" }}>
						<IconButton
							colorScheme="teal"
							aria-label="Call Segun"
							size="lg"
							variant={"outline"}
							icon={<EditIcon />}
							onClick={() => {
								props.setSelectedChatbotItem(props.chatbot);
								props.setModalOpen(true);
							}}
						/>
						<Popover isOpen={isOpen} placement="bottom">
							<PopoverTrigger>
								<IconButton
									colorScheme="red"
									aria-label="Call Segun"
									size="lg"
									variant={"solid"}
									icon={<DeleteIcon />}
									onClick={onOpen}
								/>
							</PopoverTrigger>

							<ConfirmationPopover
								onOk={handleDelete}
								onCancel={onClose}
								title="Delete confirmation"
								description="Are you sure you want to delete?"
							/>
						</Popover>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
}
