import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	Text,
	Stack,
	SimpleGrid,
	InputGroup,
	InputRightElement,
	Tag,
	TagLabel,
	Icon,
	Box,
	Select,
	Center,
	Spinner,
	useColorModeValue,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillCrown } from "react-icons/ai";
import { useCreateNoteItem, useGetNoteItem } from "../../hooks/useSyncNoteItem";
import { v4 as uuidv4 } from "uuid";
import ReminderTypeInput from "./social_platform_type";
import { NoteItem } from "../../graphql/API";
import Moment from "moment";
import { updateNoteItem } from "../../graphql/mutations";
import { useUpdateNoteItem } from "../../hooks/useSyncNoteItem";
import SocialPlatformInput from "./social_platform_type";

interface ModalFormProps {
	isOpen: boolean;
	setOpen: (isModalOpen: boolean) => void;
	user: any;
	getNoteItemList: any;
	selectedNoteItemId: string;
	setNoteItemId: (id: string) => void;
}

export default function ModalForm(props: ModalFormProps) {
	const toast = useToast();

	const [title, setTitle] = useState({
		value: "",
		isValid: true,
		message: "",
	});
	const [description, setDescription] = useState({
		value: "",
		isValid: true,
		message: "",
	});
	const [startDateTime, setStartDateTime] = useState({
		value: "",
		isValid: true,
		message: "",
	});
	const [recurringType, setRecurringType] = useState({
		value: "",
		isValid: true,
		message: "",
	});
	const [email, setEmail] = useState({
		value: "",
		isValid: true,
		message: "",
	});
	const [password, setPassword] = useState({
		value: "",
		isValid: true,
		message: "",
	});
	const [reminderDuration, setReminderDuration] = useState({
		value: "",
		isValid: true,
		message: "",
	});
	const [emailCredential, setEmailCredential] = useState({
		value: "",
		isValid: true,
		message: "",
	});
	// const [whatsappCredential, setWhatsAppCredential] = useState({
	// 	value: "",
	// 	isValid: true,
	// 	message: "",
	// });
	// const [smsCredential, setSMSCredential] = useState({
	// 	value: "",
	// 	isValid: true,
	// 	message: "",
	// });
	const [isBtnLoading, setIsBtnLoading] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const { createNoteItem } = useCreateNoteItem();
	const { updateNoteItem } = useUpdateNoteItem();

	const {
		getNoteItem,
		getNoteItemData,
		getNoteItemLoading,
		getNoteItemError,
	} = useGetNoteItem();
	const router = useRouter();

	useEffect(() => {
		getNoteItem({
			variables: { id: props.selectedNoteItemId },
		}).then((item) => initForm(item.data?.getNoteItem));
	}, [props.selectedNoteItemId]);
	const setInput =
		(
			setter: (inp: {
				value: string;
				isValid: boolean;
				message: string;
			}) => void
		) =>
		(
			e:
				| React.ChangeEvent<HTMLInputElement>
				| React.ChangeEvent<HTMLTextAreaElement>
				| React.ChangeEvent<HTMLSelectElement>
		) => {
			setter({ value: e.target.value, isValid: true, message: "" });
		};

	const initForm = (noteItem?: NoteItem) => {
		setTitle({
			value: noteItem?.title ?? "",
			isValid: true,
			message: "",
		});
		setDescription({
			value: noteItem?.description ?? "",
			isValid: true,
			message: "",
		});
		setStartDateTime({
			value: noteItem?.startDateTime ?? "",
			isValid: true,
			message: "",
		});
		setRecurringType({
			value: noteItem?.recurringType ?? "",
			isValid: true,
			message: "",
		});
		setEmail({
			value: noteItem?.email ?? "",
			isValid: true,
			message: "",
		});
		setPassword({
			value: noteItem?.password ?? "",
			isValid: true,
			message: "",
		});
		setReminderDuration({
			value: noteItem?.reminderDuration ?? "",
			isValid: true,
			message: "",
		});
		setEmailCredential({
			value:
				noteItem?.reminderType?.find((item) => item?.content == "email")
					?.content ?? "",
			isValid: true,
			message: "",
		});
		// setWhatsAppCredential({
		// 	value:
		// 		noteItem?.reminderType?.find((item) => item?.name == "whatsapp")
		// 			?.requiredCredentials ?? "",
		// 	isValid: true,
		// 	message: "",
		// });
		// setSMSCredential({
		// 	value:
		// 		noteItem?.reminderType?.find((item) => item?.name == "sms")
		// 			?.requiredCredentials ?? "",
		// 	isValid: true,
		// 	message: "",
		// });
	};

	const handleSubmit = async () => {
		if (!title.value) {
			setTitle({
				value: "",
				isValid: false,
				message: "The title cannot be empty",
			});
			return;
		}

		if (!description.value) {
			setDescription({
				value: "",
				isValid: false,
				message: "The description cannot be empty",
			});
			return;
		}

		if (description.value.length > 200) {
			setDescription({
				value: description.value,
				isValid: false,
				message: "The description exceeded 200 characters",
			});
			return;
		}

		if (!startDateTime.value) {
			setStartDateTime({
				value: "",
				isValid: false,
				message: "The date & time cannot be empty",
			});
			return;
		}

		if (!recurringType.value) {
			setRecurringType({
				value: "",
				isValid: false,
				message: "The selection cannot be empty",
			});
			return;
		}

		setIsBtnLoading(true);

		try {
			let result = getNoteItemData
				? await updateNoteItem({
						variables: {
							noteItem: {
								id: getNoteItemData.id,
								title: title.value,
								description: description.value,
								startDateTime: new Date(
									startDateTime.value
								).toISOString(),
								recurringType: recurringType.value,
								email: email.value,
								password: password.value,
								reminderType: [
									{
										name: "email",
										requiredCredentials:
											emailCredential.value,
									},
									// {
									// 	name: "whatsapp",
									// 	requiredCredentials: whatsappCredential.value,
									// },
									// {
									// 	name: "sms",
									// 	requiredCredentials: smsCredential.value,
									// },
								],
								reminderDuration: reminderDuration.value,
								isActive: true,
							},
						},
				  })
				: await createNoteItem({
						variables: {
							noteItem: {
								id: uuidv4(),
								title: title.value,
								description: description.value,
								startDateTime: new Date(
									startDateTime.value
								).toISOString(),
								recurringType: recurringType.value,
								email: email.value,
								password: password.value,
								reminderType: [
									{
										name: "email",
										requiredCredentials:
											emailCredential.value,
									},
									// {
									// 	name: "whatsapp",
									// 	requiredCredentials: whatsappCredential.value,
									// },
									// {
									// 	name: "sms",
									// 	requiredCredentials: smsCredential.value,
									// },
								],
								reminderDuration: reminderDuration.value,
							},
						},
				  });

			const regex = /success(?:ful)?/i;

			if (
				regex.test(result.data.createNoteItem) ||
				regex.test(result.data.updateNoteItem)
			) {
				toast({
					title: "Submit Success.",
					description: "We've saved the item for you.",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
				props.getNoteItemList();
				props.setOpen(false);
				props.setNoteItemId("");
				initForm();
			}
		} catch (error) {
			console.error(error);
			toast({
				title: "Submit fail.",
				description: "The item is failed to be saved.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}

		setIsBtnLoading(false);
	};

	return (
		<Modal
			size="lg"
			onClose={() => props.setOpen(false)}
			isOpen={props.isOpen}
			scrollBehavior={"inside"}
			isCentered
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add new bot</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{getNoteItemLoading ? (
						<Center w="100%" h="20vh">
							<Spinner
								thickness="4px"
								speed="0.65s"
								emptyColor="gray.200"
								color="blue.500"
								size="xl"
							/>
						</Center>
					) : (
						<>
							<FormControl isRequired>
								<FormLabel>Title</FormLabel>
								<Input
									placeholder="Your title"
									isInvalid={!title.isValid}
									onChange={setInput(setTitle)}
									defaultValue={getNoteItemData?.title}
								/>
								<Text fontSize="xs" textColor={"red"}>
									{title.message}
								</Text>
							</FormControl>
							<FormControl mt={4} isRequired>
								<FormLabel>Description</FormLabel>
								<Textarea
									placeholder="Description (Max 200 characters)"
									size="sm"
									resize="none"
									isInvalid={!description.isValid}
									onChange={setInput(setDescription)}
									defaultValue={getNoteItemData?.description}
								/>
								<Text
									fontSize="xs"
									textColor={
										description.value.length > 200 ||
										description.isValid === false
											? "red"
											: "teal.400"
									}
								>
									{`${description.value.length}/200 character`}
								</Text>
							</FormControl>
							<Stack spacing={5}>
								<FormControl mt={4}>
									<Box display="flex" alignItems="baseline">
										<FormLabel>Social Platform</FormLabel>
										<Box
											color="gray.500"
											fontWeight="semibold"
											letterSpacing="wide"
											fontSize="xs"
											textTransform="uppercase"
											ml="2"
										>
											<Tag
												size={"sm"}
												variant="outline"
												colorScheme="yellow"
											>
												<Icon as={AiFillCrown} />
												<TagLabel>Pro</TagLabel>
											</Tag>
										</Box>
									</Box>
									<SocialPlatformInput
										setEmailCredential={setInput(
											setEmailCredential
										)}
										emailCredential={emailCredential}
										noteItem={getNoteItemData}
										// setWhatsAppCredential={setInput(
										// 	setWhatsAppCredential
										// )}
										// setSMSCredential={setInput(
										// 	setSMSCredential
										// )}
										// whatsappCredential={whatsappCredential}
										// smsCredential={smsCredential}
									/>
								</FormControl>
							</Stack>{" "}
						</>
					)}
				</ModalBody>
				<ModalFooter>
					<Stack direction={"row"} spacing="4">
						<Button
							colorScheme={"red"}
							onClick={() => props.setOpen(false)}
						>
							Close
						</Button>
						<Button
							colorScheme={"green"}
							onClick={handleSubmit}
							isLoading={isBtnLoading}
						>
							Submit
						</Button>
					</Stack>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
