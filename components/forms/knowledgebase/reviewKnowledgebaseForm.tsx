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
import CreateKnowledgebaseForm from "./createKnowledgebase";
import { useGetKnowledgebaseListByUser } from "../../../hooks/useSyncKnowledgebase";
import { Knowledgebase } from "../../../graphql/API";
import KnowledgebaseItem from "../../list_item/knowledgebase_item";

interface ReviewKnowlegebaseFormProps {}

export default function ReviewKnowledgebaseForm(
	props: ReviewKnowlegebaseFormProps
) {
	const toast = useToast();
	const [selectedKnowledgeItem, setSelectedKnowledgeItem] =
		useState<Knowledgebase>();
	const {
		getKnowledgebaseList,
		getKnowledgebaseListData,
		getKnowledgebaseListError,
		getKnowledgebaseListLoading,
	} = useGetKnowledgebaseListByUser();

	const [isModalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		getKnowledgebaseList();
	}, []);

	const closeModal = async () => {
		setModalOpen(false);
		setSelectedKnowledgeItem(undefined);
	};

	const CreateKnowledgebaseModal = () => {
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
					<ModalHeader>Add knowledgebase</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<CreateKnowledgebaseForm
							knowledgebase={selectedKnowledgeItem}
							closeModal={closeModal}
							getKnowledgebaseList={getKnowledgebaseList}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		);
	};

	if (getKnowledgebaseListLoading) {
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

	if (!getKnowledgebaseListData) {
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
					Create knowledgebase
				</Button>
				<Stack p={4} spacing={"3"}>
					<Center>
						<Icon as={AiOutlineInbox} w={20} h={20} />
					</Center>
					<Center>
						<Text colorScheme={"facebook"}>
							Empty knowledgebase List
						</Text>
					</Center>
				</Stack>
				<CreateKnowledgebaseModal />
			</>
		);
	}

	if (getKnowledgebaseListError) {
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
					Create knowledgebase
				</Button>
				<Center>
					<Text color={"gray.500"}>No knowledgebase found:(</Text>
				</Center>
				<CreateKnowledgebaseModal />
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
				Create knowledgebase
			</Button>
			<Stack
				as={Box}
				spacing={{ base: 8, md: 12 }}
				py={{ base: 2, md: 4 }}
			>
				{getKnowledgebaseListData ? (
					getKnowledgebaseListData.map(
						(knowledgebase: Knowledgebase) => (
							<KnowledgebaseItem
								setSelectedKnowledgebaseItem={
									setSelectedKnowledgeItem
								}
								knowledgebase={knowledgebase}
								setModalOpen={setModalOpen}
								key={knowledgebase.id}
								getKnowledgebaseList={getKnowledgebaseList}
							/>
						)
					)
				) : (
					<></>
				)}
			</Stack>
			<CreateKnowledgebaseModal />
		</>
	);
}
