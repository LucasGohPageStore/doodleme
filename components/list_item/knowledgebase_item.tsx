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
import { Knowledgebase, NoteItem } from "../../graphql/API";
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

interface KnowledgebaseItemProps {
	knowledgebase: Knowledgebase;
	setModalOpen: (isOpen: boolean) => void;
	getKnowledgebaseList: any;
	setSelectedKnowledgebaseItem: (knowledge: Knowledgebase) => void;
}

export default function KnowledgebaseItem(props: KnowledgebaseItemProps) {
	const {
		deleteKnowledgebase,
		deleteKnowledgebaseLoading,
		deleteKnowledgebaseError,
	} = useDeleteKnowledgebase();
	const { onOpen, onClose, isOpen } = useDisclosure();
	const toast = useToast();

	const handleDelete = async () => {
		try {
			deleteKnowledgebase({
				variables: {
					knowledgebase: {
						id: props.knowledgebase!.id,
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
				props.getKnowledgebaseList();
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

	const sourceTypeHTML = () => {
		switch (props.knowledgebase.sourceType) {
			case pdfScrapeSource:
				return (
					<Tag
						size="lg"
						variant="subtle"
						colorScheme="messenger"
						borderRadius="full"
					>
						<Icon as={FaFilePdf} />
					</Tag>
				);
			case websiteScrapeSource:
				return (
					<Tag
						size="lg"
						variant="subtle"
						colorScheme="whatsapp"
						borderRadius="full"
					>
						<Icon as={FaGlobe} />
					</Tag>
				);

			default:
				const isUrl =
					props.knowledgebase.content?.length &&
					isValidURL(
						props.knowledgebase.content[0]?.contentName ?? ""
					);
				return isUrl ? (
					<Tag
						size="lg"
						variant="subtle"
						colorScheme="whatsapp"
						borderRadius="full"
					>
						<Icon as={FaGlobe} />
					</Tag>
				) : (
					<Tag
						size="lg"
						variant="subtle"
						colorScheme="messenger"
						borderRadius="full"
					>
						<Icon as={FaFilePdf} />
					</Tag>
				);
		}
	};

	return (
		<Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
			<Stack>
				<Stack
					direction={{ base: "column", md: "row" }}
					alignItems="center"
				>
					<Text fontWeight="semibold">
						{props.knowledgebase.title}
					</Text>
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
							{Moment(props.knowledgebase.createdDateTime)
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
							{!props.knowledgebase.description
								? ""
								: props.knowledgebase.description.length > 125
								? `${props.knowledgebase.description.substring(
										0,
										125
								  )}....`
								: props.knowledgebase.description}
						</Text>
						<Stack
							direction={"row"}
							spacing={4}
							alignItems="center"
						>
							<Box display="flex" alignItems="center">
								<Badge variant="outline" colorScheme="telegram">
									Total of{" "}
									{props.knowledgebase.content?.length}{" "}
									sources
								</Badge>
							</Box>
							<Text
								fontSize={{ base: "sm" }}
								textAlign={"left"}
								maxW={"4xl"}
							>
								&bull; via &bull;
							</Text>

							{sourceTypeHTML()}
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
								props.setSelectedKnowledgebaseItem(
									props.knowledgebase
								);
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
