import { CheckIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	Modal,
	Center,
	Stack,
	Button,
	useToast,
	Text,
	Textarea,
	Box,
	AbsoluteCenter,
	FormErrorMessage,
	Divider,
} from "@chakra-ui/react";
import { Upload } from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FaUpload } from "react-icons/fa";
import { useScrapeFiles } from "../../../restapi/rest-api";
import { Knowledgebase } from "../../../graphql/API";

interface UploadDocumentFormProps {
	knowledgebase?: Knowledgebase;
	closeModal: () => void;
	refreshKnowledgebaseList: () => void;
}

export default function UploadDocumentForm(props: UploadDocumentFormProps) {
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

	const [knowledgeFile, setKnowledgeFile] = useState({
		value: [] as UploadFile[],
		isValid: true,
		message: "",
	});

	const {
		mutate: mutateScrapeFiles,
		isLoading: isFileScrapingLoading,
		data: fileData,
	} = useScrapeFiles();

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

	const handleManualFileUpload = async (
		e: UploadChangeParam<UploadFile<any>>
	) => {
		if (e.fileList && e.fileList.length > 0) {
			const files = [
				...e.fileList.map(async (item: UploadFile<any>) => {
					if (item.originFileObj) {
						const bas64String = await getBase64(item.originFileObj);
						return {
							uid: "",
							name: item.originFileObj.name,
							status: "done",
							type: "Website",
							url: bas64String, // This will store the content of the file
						};
					} else {
						return {
							uid: item.uid,
							name: item.name as string,
							status: "done",
							type: "Website",
							url: item.url,
						};
					}
				}),
			];

			const resolvedFiles = await Promise.all(files);

			setKnowledgeFile({
				value: resolvedFiles as UploadFile[],
				isValid: true,
				message: "",
			});
		}
	};

	const getBase64 = (file: RcFile): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});

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

		if (knowledgeFile.value.length === 0) {
			setKnowledgeFile({
				value: knowledgeFile.value,
				isValid: false,
				message: "The file cannot be empty",
			});
			return;
		}

		const regex = /__AUTO__\d+_\d+__/;

		const content = knowledgeFile.value.map((item) =>
			item.uid === "" ||
			item.uid.match(regex) ||
			item.uid.match("rc-upload")
				? `name:${item.name};${item.url}`
				: `uid:${item.uid};name:${item.name};`
		);

		console.log(content);
		mutateScrapeFiles(
			{
				id: props.knowledgebase?.id,
				title: title.value,
				description: description.value,
				content: content,
			},
			{
				onSuccess: (data) => {
					// You can handle successful mutation here
					toast({
						title: "File Upload Success.",
						description: `File Upload Success.`,
						status: "success",
						duration: 9000,
						isClosable: true,
					});
					props.refreshKnowledgebaseList();
					props.closeModal();
				},
				onError: (error) => {
					console.error(error);

					// Handle error
					toast({
						title: "File Upload fail.",
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

		const tempFileList: UploadFile[] = [];
		props.knowledgebase.content!.forEach((item) =>
			tempFileList.push({
				uid: item?.id ?? "",
				name: item?.contentName ?? "",
				status: "done",
				type: "Website",
			})
		);

		setKnowledgeFile({
			value: tempFileList,
			message: "",
			isValid: true,
		});
	}

	useEffect(() => {
		initForm();
	}, [props.knowledgebase]);

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
				<FormLabel>Knowledge Description</FormLabel>
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
				<AbsoluteCenter px="4">Documents</AbsoluteCenter>
			</Box>
			<Stack spacing="5">
				<FormControl isRequired isInvalid={!knowledgeFile.isValid}>
					<FormLabel>Files</FormLabel>
					<Upload
						listType="picture-card"
						name="file"
						showUploadList={true}
						className="upload-list-inline"
						multiple={true}
						beforeUpload={() => false}
						maxCount={3}
						fileList={knowledgeFile.value}
						onChange={handleManualFileUpload}
					>
						<div>
							<Center>
								<PlusSquareIcon />
							</Center>
							<div style={{ marginTop: 8 }}>Upload</div>
							Max(3)
						</div>
					</Upload>
					<FormHelperText>
						Attach any related documents.
					</FormHelperText>
					<FormErrorMessage>
						The file cannot be empty
					</FormErrorMessage>
				</FormControl>

				<Button
					leftIcon={<CheckIcon />}
					colorScheme="messenger"
					variant="solid"
					size={"md"}
					onClick={handleSubmit}
					isLoading={isFileScrapingLoading}
				>
					Let's build
				</Button>
			</Stack>
		</>
	);
}
