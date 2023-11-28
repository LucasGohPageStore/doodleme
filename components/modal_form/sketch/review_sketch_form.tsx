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
import { useGetKnowledgebaseListByUser } from "../../../hooks/useSyncKnowledgebase";
import { Chatbot, Knowledgebase, SketchInput } from "../../../graphql/API";

import { useGetChatbotListByUser } from "../../../hooks/useSyncChatbot";
import SketchFormContent from "./sketch_form_content";

interface ReviewSketchFormProps {
	sketch?: SketchInput;
	isModalOpen: boolean;
	closeModal: () => void;
}

export default function ReviewSketchFormProps(props: ReviewSketchFormProps) {
	const toast = useToast();

	return (
		<Modal
			size="4xl"
			onClose={() => {
				props.closeModal();
			}}
			isOpen={props.isModalOpen}
			scrollBehavior={"outside"}
			closeOnOverlayClick={false}
			isCentered
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{props.sketch?.object}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<SketchFormContent
						isModalOpen={props.isModalOpen}
						closeModal={props.closeModal}
						sketch={props.sketch}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
