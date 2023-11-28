import { CheckIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Text,
	Stack,
	Center,
	Spinner,
	FormErrorMessage,
	Collapse,
	useDisclosure,
	RadioGroup,
	Radio,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Chatbot, ChatbotInput, FbAccount } from "../../../graphql/API";
import {
	Select as ReactSelect,
	CreatableSelect,
	AsyncSelect,
	MultiValue,
	ActionMeta,
} from "chakra-react-select";
import { useGetSocialAccountList } from "../../../hooks/useSyncSocialAccount";
import ScrapeUrlItem from "../../list_item/scrape_url_item";
import { useCreateChatbot } from "../../../hooks/useSyncChatbot";
import { useGetKnowledgebaseListByUser } from "../../../hooks/useSyncKnowledgebase";

interface CreateBotFromSocialProps {
	chatbot?: Chatbot;
	closeModal: () => void;
	refreshKnowledgebaseList: () => void;
}

export default function CreateBotFromSocial(props: CreateBotFromSocialProps) {
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

	const [socialAccounts, setSocialAccounts] = useState({
		value: [] as {
			value: string;
			label: string;
		}[],
		isValid: true,
		message: "",
	});

	const [knowledgebase, setKnowledgebase] = useState({
		value: [] as {
			value: string;
			label: string;
		}[],
		isValid: true,
		message: "",
	});

	const [gptEngine, setGPTEngine] = useState({
		value: "",
		isValid: true,
		message: "",
	});

	const {
		getSocialAccountList,
		getSocialAccountListData,
		getSocialAccountListError,
		getSocialAccountListLoading,
	} = useGetSocialAccountList();

	const {
		getKnowledgebaseList,
		getKnowledgebaseListData,
		getKnowledgebaseListError,
		getKnowledgebaseListLoading,
	} = useGetKnowledgebaseListByUser();

	const { createChatbot, createError, createLoading, dataResponse } =
		useCreateChatbot();

	useEffect(() => {
		getSocialAccountList();
		getKnowledgebaseList();
	}, []);

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

	const handleOnChangeSelectedSocialAccounts = (selectedAccounts: any) => {
		console.log(selectedAccounts);
		setSocialAccounts({
			isValid: true,
			message: "",
			value: selectedAccounts,
		});
	};

	const handleOnChangeSelectedKnowledgebase = (
		selectedKnowledgeItems: any
	) => {
		setKnowledgebase({
			isValid: true,
			message: "",
			value: selectedKnowledgeItems,
		});
	};

	const handleOnChangeSelectedGPTEngine = (selectedGPTEngine: any) => {
		setGPTEngine({
			isValid: true,
			message: "",
			value: selectedGPTEngine,
		});
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

		if (socialAccounts.value.length === 0) {
			console.log("The social account cannot be empty");
			setSocialAccounts({
				value: [],
				isValid: false,
				message: "The social account cannot be empty",
			});
			return;
		}

		if (knowledgebase.value.length === 0) {
			console.log("The knowledgebase cannot be empty");
			setKnowledgebase({
				value: [],
				isValid: false,
				message: "The knowledgebase cannot be empty",
			});
			return;
		}

		if (!gptEngine.value) {
			setGPTEngine({
				value: "",
				isValid: false,
				message: "Please select the GPT Engine",
			});
			return;
		}
		try {
			createChatbot({
				variables: {
					chatbot: {
						id: props.chatbot?.id,
						gptType: gptEngine.value,
						description: description.value,
						knowledgebase: knowledgebase.value.map(
							(item) => item.value
						),
						socialAccounts: socialAccounts.value.map(
							(item) => item.value
						),
						title: title.value,
						isActive: false,
					},
				},
			}).then((data) => {
				toast({
					title: "Create Success.",
					description: "We've created the bot for you.",
					status: "success",
					duration: 9000,
					isClosable: true,
				});

				props.closeModal();
				props.refreshKnowledgebaseList();
			});
		} catch (error: any) {
			toast({
				title: "Create fail.",
				description: "Bot is failed to be created.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	function initForm() {
		console.log(props.chatbot);
		if (!props.chatbot) {
			return;
		}

		setTitle({
			value: props.chatbot.title ?? "",
			message: "",
			isValid: true,
		});
		setDescription({
			value: props.chatbot.description ?? "",
			message: "",
			isValid: true,
		});

		setGPTEngine({
			value: props.chatbot.gptType ?? "",
			message: "",
			isValid: true,
		});

		const tempSocialAccountList: { value: string; label: string }[] = [];
		props.chatbot.socialAccounts!.forEach((item) =>
			tempSocialAccountList.push({
				value: item?.id ?? "",
				label: item?.name ?? "",
			})
		);

		setSocialAccounts({
			value: tempSocialAccountList,
			message: "",
			isValid: true,
		});

		const tempKnowledgeList: { value: string; label: string }[] = [];
		props.chatbot.knowledgebase!.forEach((item) =>
			tempKnowledgeList.push({
				value: item!.id ?? "",
				label: item!.title ?? "",
			})
		);

		setKnowledgebase({
			value: tempKnowledgeList,
			message: "",
			isValid: true,
		});
	}

	useEffect(() => {
		initForm();
	}, [props.chatbot]);

	return (
		<>
			<FormControl isRequired>
				<FormLabel>Title</FormLabel>
				<Input
					placeholder="Your title"
					isInvalid={!title.isValid}
					onChange={setInput(setTitle)}
					defaultValue={title.value}
				/>
				<Text fontSize="xs" textColor={"red"}>
					{title.message}
				</Text>
			</FormControl>
			<FormControl mt={4} isRequired>
				<FormLabel>Bot Description</FormLabel>
				<Textarea
					placeholder="Bot Description (Max 200 characters)"
					size="sm"
					resize="none"
					isInvalid={!description.isValid}
					onChange={setInput(setDescription)}
					defaultValue={description.value}
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
				<FormControl
					mt={4}
					isInvalid={
						getSocialAccountListError === undefined
							? !socialAccounts.isValid
							: getSocialAccountListError
							? true
							: !socialAccounts.isValid
					}
					isRequired
				>
					<Stack>
						<FormLabel>Social Account</FormLabel>
						<ReactSelect
							isMulti
							isLoading={getSocialAccountListLoading}
							name="colors"
							options={[
								{
									label: "Instagram",
									options: [
										...socialAccounts.value,
										...(getSocialAccountListData ==
										undefined
											? []
											: getSocialAccountListData.map(
													(item) => {
														return {
															value: item.id!,
															label: item.name!,
														};
													}
											  )),
									].filter(
										(option, index, self) =>
											index ===
											self.findIndex(
												(opt) =>
													opt.value ===
														option.value &&
													opt.label === option.label
											)
									),
								},
							]}
							placeholder="Select your social account..."
							closeMenuOnSelect={false}
							onChange={handleOnChangeSelectedSocialAccounts}
							value={socialAccounts.value}
						/>
						<FormErrorMessage>
							{getSocialAccountListError
								? getSocialAccountListError.message
								: socialAccounts.message}
						</FormErrorMessage>
					</Stack>
				</FormControl>
				<FormControl
					mt={4}
					isInvalid={
						getKnowledgebaseListError === undefined
							? !knowledgebase.isValid
							: getKnowledgebaseListError
							? true
							: !knowledgebase.isValid
					}
					isRequired
				>
					<Stack>
						<FormLabel>Knowledgebase</FormLabel>
						<ReactSelect
							isMulti
							isLoading={getKnowledgebaseListLoading}
							name="colors"
							options={[
								{
									label: "Knowledgebase",
									options: [
										...knowledgebase.value,
										...(getKnowledgebaseListData ==
										undefined
											? []
											: getKnowledgebaseListData.map(
													(item) => {
														return {
															value: item.id!,
															label: item.title!,
														};
													}
											  )),
									].filter(
										(option, index, self) =>
											index ===
											self.findIndex(
												(opt) =>
													opt.value ===
														option.value &&
													opt.label === option.label
											)
									),
								},
							]}
							placeholder="Select your knowledgebase..."
							closeMenuOnSelect={false}
							onChange={handleOnChangeSelectedKnowledgebase}
							value={knowledgebase.value}
						/>
						<FormErrorMessage>
							{getKnowledgebaseListError
								? getKnowledgebaseListError.message
								: knowledgebase.message}
						</FormErrorMessage>
					</Stack>
				</FormControl>
				<FormControl isInvalid={!gptEngine.isValid}>
					<FormLabel>GPT Engine</FormLabel>
					<Stack>
						<RadioGroup
							onChange={handleOnChangeSelectedGPTEngine}
							value={gptEngine.value}
						>
							<Stack direction="row" spacing={5}>
								<Radio value="GPT-3.5">GPT-3.5</Radio>
								<Radio value="GPT-4">GPT-4</Radio>
							</Stack>
						</RadioGroup>
						<FormErrorMessage>{gptEngine.message}</FormErrorMessage>
					</Stack>
				</FormControl>
				<Button
					leftIcon={<CheckIcon />}
					colorScheme="messenger"
					variant="solid"
					size={"md"}
					onClick={handleSubmit}
					isLoading={createLoading}
				>
					Let's build
				</Button>
			</Stack>{" "}
		</>
	);
}
