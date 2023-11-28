import { Box } from "@chakra-ui/react";
import {
	Chatbot,
	Knowledgebase,
	KnowledgebaseContent,
} from "../../../graphql/API";
import CreateBotFromSocial from "./createBotForSocials";

interface CreateBotFormProps {
	chatbot?: Chatbot;
	closeModal: () => void;
	getChatbotList: () => void;
}

export default function CreateBotForm(props: CreateBotFormProps) {
	return (
		<Box padding={6}>
			<CreateBotFromSocial
				chatbot={props.chatbot}
				closeModal={props.closeModal}
				refreshKnowledgebaseList={props.getChatbotList}
			/>
		</Box>
	);
}
