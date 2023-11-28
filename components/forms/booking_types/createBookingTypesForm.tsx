import { Box } from "@chakra-ui/react";
import { Chatbot } from "../../../graphql/API";
import CreateBotFromSocial from "../chatbot/createBotForSocials";

interface CreateBookingTypesFormProps {
	chatbot?: Chatbot;
	closeModal: () => void;
	getChatbotList: () => void;
}

export default function CreateBookingTypesForm(props: CreateBookingTypesFormProps) {
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
