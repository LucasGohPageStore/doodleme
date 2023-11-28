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
	Collapse,
	useDisclosure,
	Divider,
	Box,
	AbsoluteCenter,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
	Knowledgebase,
} from "../../../graphql/API";
import {
	useCreateKnowledgebaseLink,
	useScrapeLinks,
} from "../../../restapi/rest-api";
import { useMutation } from "@tanstack/react-query";
import ScrapeUrlItem from "../../list_item/scrape_url_item";

interface UploadWebsiteFormProps {
	knowledgebase?: Knowledgebase;
}

export default function UploadWebsiteForm(props: UploadWebsiteFormProps) {
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

	const [scrappingUrl, setScrappingUrl] = useState({
		value: "",
		isValid: true,
		message: "",
	});

	const [linkList, setLinkList] = useState({
		value: "" as any,
		isValid: true,
		message: "",
	});

	const {
		isOpen: isShowUrlsCollapseOpen,
		onToggle: onShowUrlsCollapseToggle,
	} = useDisclosure();

	const {
		mutate: mutateScrapeLink,
		isLoading: isLinkScrapingLoading,
		data: linkData,
	} = useScrapeLinks();

	const {
		mutate: mutateCreateKnowledgebaseLink,
		isLoading: isCreateKnowledgebaseLinkLoading,
		data: createKnowledgebaseData,
	} = useCreateKnowledgebaseLink();

	const router = useRouter();

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

		if (!linkList.value) {
			setScrappingUrl({
				value: scrappingUrl.value,
				isValid: false,
				message: "Please crawl the link first before submit",
			});
			return;
		}

		mutateCreateKnowledgebaseLink(
			{
				title: title.value,
				description: description.value,
				content:
					linkList.value.length == 0
						? [scrappingUrl.value]
						: linkList.value,
			},
			{
				onSuccess: (data) => {
					console.log(data); // Response data from your API

					// You can handle successful mutation here
					toast({
						title: "Submit Success.",
						description: "We've saved the item for you.",
						status: "success",
						duration: 9000,
						isClosable: true,
					});
				},
				onError: (error: any) => {
					console.error(error);

					// Handle error
					toast({
						title: "Submit fail.",
						description: error.response.data,
						status: "error",
						duration: 9000,
						isClosable: true,
					});
				},
			}
		);
	};

	function initForm() {
		if (!props.knowledgebase) {
			return;
		}

		setTitle({
			value: props.knowledgebase.title ?? "",
			message: "",
			isValid: true,
		});
		setDescription({
			value: props.knowledgebase.description ?? "",
			message: "",
			isValid: true,
		});

		const tempLinkList : string[]= []
		props.knowledgebase.content!.forEach((item)=>tempLinkList.push(item?.contentName??""))

		setLinkList({
			value: tempLinkList,
			message: "",
			isValid: true,
		});
	}

	useEffect(() => {
		initForm();
	}, [props.knowledgebase]);

	const handleCrawlLink = () => {
		console.log(scrappingUrl.value);
		if (!scrappingUrl.value) {
			setScrappingUrl({
				value: "",
				isValid: false,
				message: "The url cannot be empty",
			});
			return;
		}
		mutateScrapeLink(
			{
				content: [scrappingUrl.value],
			},
			{
				onSuccess: (linkData) => {
					console.log(linkData); // Response data from your API
					setLinkList({
						value: linkData,
						message: "",
						isValid: true,
					});
					// You can handle successful mutation here
					toast({
						title: "Crawl Success.",
						description: `We have found ${linkData.data.length} links`,
						status: "success",
						duration: 9000,
						isClosable: true,
					});
				},
				onError: (error) => {
					console.error(error);

					// Handle error
					toast({
						title: "Crawl fail.",
						description:
							"The url provided is failed to be crawled.",
						status: "error",
						duration: 9000,
						isClosable: true,
					});
				},
			}
		);
	};

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
			<Box position="relative" padding="10">
				<Divider />
				<AbsoluteCenter px="4">
					Website
				</AbsoluteCenter>
			</Box>
			<Stack spacing={5}>
				<FormControl>
					<FormLabel>URL</FormLabel>
					<Stack direction={"row"} spacing={4}>
						<Input
							placeholder="Crawl the link"
							isInvalid={!scrappingUrl.isValid}
							onChange={setInput(setScrappingUrl)}
							defaultValue={""}
						/>
						<Button onClick={handleCrawlLink}>Crawl</Button>
					</Stack>
					<Text fontSize="xs" textColor={"red"}>
						{scrappingUrl.message}
					</Text>
				</FormControl>
				{isLinkScrapingLoading ? (
					<Center>
						{" "}
						<Spinner />
					</Center>
				) : linkList.value ? (
					<>
						<Button onClick={onShowUrlsCollapseToggle}>
							Show links
						</Button>
						<Collapse in={isShowUrlsCollapseOpen} animateOpacity>
							<Stack spacing={4}>
								{linkList.value.length == 0 ? (
									<Center>
										<Text as="em">
											No links found (But you can proceed
											now)
										</Text>
									</Center>
								) : (
									linkList.value.map((item: any) => (
										<ScrapeUrlItem urlLink={item} />
									))
								)}
							</Stack>
						</Collapse>
					</>
				) : (
					<></>
				)}

				<Button
					leftIcon={<CheckIcon />}
					colorScheme="messenger"
					variant="solid"
					size={"md"}
					onClick={handleSubmit}
					isLoading={isCreateKnowledgebaseLinkLoading}
				>
					Let's build
				</Button>
			</Stack>{" "}
		</>
	);
}
