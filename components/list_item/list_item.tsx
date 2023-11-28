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

interface CustomizedListItemProps {
	noteItem: NoteItem;
	setModalOpen: (isOpen: boolean) => void;
	setNoteItemId: (id: string) => void;
	getNoteItemList: any;
}

export default function CustomizedListItem(props: CustomizedListItemProps) {
	const { updateNoteItem } = useUpdateNoteItem();
	const { onOpen, onClose, isOpen } = useDisclosure();
	const toast = useToast();

	const handleDelete = async () => {
		try {
			let result = await updateNoteItem({
				variables: {
					noteItem: {
						id: props.noteItem!.id,
						isActive: false,
					},
				},
			});
			onOpen();
			toast({
				title: "Delete Success.",
				description: "We've deleted the item for you.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			props.getNoteItemList();
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
					<Text fontWeight="semibold">{props.noteItem.title}</Text>
					<Box display="flex" alignItems="baseline">
						<Badge borderRadius="full" px="2" colorScheme="yellow">
							Expired at
						</Badge>
						<Box
							color="gray.500"
							fontWeight="semibold"
							letterSpacing="wide"
							fontSize="xs"
							ml="2"
						>
							{Moment(props.noteItem.expiryDate)
								.local()
								.format("DD MMM YYYY h:mm A")}{" "}
							&bull; {props.noteItem.recurringType.toUpperCase()}{" "}
							RENEWAL
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
							{props.noteItem.description.length > 125
								? `${props.noteItem.description.substring(
										0,
										125
								  )}....`
								: props.noteItem.description}
						</Text>
						<Stack
							direction={"row"}
							spacing={4}
							alignItems="center"
						>
							<Box display="flex" alignItems="center">
								<Badge variant="outline" colorScheme="telegram">
									Remind before{" "}
									{props.noteItem.reminderDuration?.replace(
										/[a-z](?=\d)|\d(?=[a-z])/gi,
										"$& "
									)}
								</Badge>
							</Box>
							{props.noteItem.reminderType!.filter(
								(item) =>
									item?.id !== undefined &&
									item?.id !== ""
							).length > 0 ? (
								<Text
									fontSize={{ base: "sm" }}
									textAlign={"left"}
									maxW={"4xl"}
								>
									&bull; via &bull;
								</Text>
							) : (
								<></>
							)}

							{props.noteItem.reminderType?.map((item) => {
								if (
									item?.content === "email" &&
									item.content
								)
									return (
										<Tag
											size="lg"
											variant="subtle"
											colorScheme="messenger"
											borderRadius="full"
										>
											<Icon as={AiOutlineMail} />
										</Tag>
									);
								if (
									item?.content === "whatsapp" &&
									item.content
								)
									return (
										<Tag
											size="lg"
											colorScheme="whatsapp"
											variant="subtle"
											borderRadius="full"
										>
											<Icon as={AiOutlineWhatsApp} />
										</Tag>
									);
								if (
									item?.content === "sms" &&
									item.content
								)
									return (
										<Tag
											size="lg"
											colorScheme="orange"
											variant="subtle"
											borderRadius="full"
										>
											<Icon as={FaSms} />
										</Tag>
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
								props.setNoteItemId(props.noteItem.id);
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
