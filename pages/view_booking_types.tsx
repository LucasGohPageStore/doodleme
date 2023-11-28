import {
	Container,
	Text,
	useDisclosure,
	Heading,
	useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useGetUser } from "../hooks/useSyncUser";
import DashboardTemplate from "../components/page_frame/dashboardTemplate";
import ReviewKnowledgebaseForm from "../components/forms/knowledgebase/reviewKnowledgebaseForm";

export default function ViewBookingType() {

	return (
		<DashboardTemplate>
			<Container maxW={"4xl"} py={{ base: 2, md: 6 }}>
				<Heading as="h4" size="lg">
					Create new booking type
				</Heading>
				<Text>
					View all the booking type
				</Text>
				<ReviewKnowledgebaseForm />
			</Container>
		</DashboardTemplate>
	);
}
