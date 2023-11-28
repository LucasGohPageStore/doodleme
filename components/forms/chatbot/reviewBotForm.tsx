import { AddIcon } from "@chakra-ui/icons";
import {
	Text,
	Stack,
	Icon,
	Box,
	Button,
	Center,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spinner,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineInbox } from "react-icons/ai";
import CreateKnowledgebaseForm from "../knowledgebase/createKnowledgebase";
import { useGetKnowledgebaseListByUser } from "../../../hooks/useSyncKnowledgebase";
import { Chatbot, Knowledgebase } from "../../../graphql/API";
import KnowledgebaseItem from "../../list_item/knowledgebase_item";
import CreateBotForm from "./createBot";
import { useGetChatbotListByUser } from "../../../hooks/useSyncChatbot";
import ChatbotItem from "../../list_item/chatbot_item";

interface ReviewBotFormProps {}

export default function ReviewBotbaseForm(props: ReviewBotFormProps) {
	const toast = useToast();
	const [selectedChatbot, setSelectedChatbot] = useState<Chatbot>();

	const {
		getChatbotList,
		getChatbotListData,
		getChatbotListError,
		getChatbotListLoading,
	} = useGetChatbotListByUser();

	const [isModalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		getChatbotList();
	}, []);

	const closeModal = async () => {
		setModalOpen(false);
		setSelectedChatbot(undefined);
	};

	const CreateBotModal = () => {
		return (
			<Modal
				size="lg"
				onClose={() => {
					closeModal();
				}}
				isOpen={isModalOpen}
				scrollBehavior={"outside"}
				closeOnOverlayClick={false}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add chatbot</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<CreateBotForm
							chatbot={selectedChatbot}
							closeModal={closeModal}
							getChatbotList={getChatbotList}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		);
	};

	if (getChatbotListLoading) {
		return (
			<Center p={8}>
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="lg"
				/>
			</Center>
		);
	}

	if (!getChatbotListData) {
		return (
			<>
				<Button
					leftIcon={<AddIcon />}
					variant="solid"
					colorScheme={"gray"}
					borderRadius="lg"
					px={6}
					_hover={{
						bg: "pink.400",
					}}
					marginTop={3}
					onClick={() => setModalOpen(true)}
				>
					Create chatbot
				</Button>
				<Stack p={4} spacing={"3"}>
					<Center>
						<Icon as={AiOutlineInbox} w={20} h={20} />
					</Center>
					<Center>
						<Text colorScheme={"facebook"}>Empty Chatbot List</Text>
					</Center>
				</Stack>
				<CreateBotModal />
			</>
		);
	}

	if (getChatbotListError) {
		return (
			<>
				<Button
					leftIcon={<AddIcon />}
					variant="solid"
					colorScheme={"gray"}
					borderRadius="lg"
					px={6}
					_hover={{
						bg: "pink.400",
					}}
					marginTop={3}
					onClick={() => setModalOpen(true)}
				>
					Create chatbot
				</Button>
				<Center>
					<Text color={"gray.500"}>No knowledgebase found:(</Text>
				</Center>
				<CreateBotModal />
			</>
		);
	}

	return (
		<>
			<Button
				leftIcon={<AddIcon />}
				variant="solid"
				colorScheme={"gray"}
				borderRadius="lg"
				px={6}
				_hover={{
					bg: "pink.400",
				}}
				marginTop={3}
				onClick={() => setModalOpen(true)}
			>
				Create chatbot
			</Button>
			<Stack
				as={Box}
				spacing={{ base: 8, md: 12 }}
				py={{ base: 2, md: 4 }}
			>
				{getChatbotListData ? (
					getChatbotListData.map((chatbot: Chatbot) => (
						<ChatbotItem
							setSelectedChatbotItem={setSelectedChatbot}
							chatbot={chatbot}
							setModalOpen={setModalOpen}
							key={chatbot.id}
							getChatbotList={getChatbotList}
						/>
					))
				) : (
					<></>
				)}
			</Stack>
			<CreateBotModal />
		</>
	);
}
