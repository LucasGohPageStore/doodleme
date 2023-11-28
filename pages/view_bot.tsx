import {
	Box,
	Container,
	Text,
	Button,
	Stack,
	Center,
	Spinner,
	useColorModeValue,
	Flex,
	Spacer,
	useDisclosure,
	Drawer,
	DrawerContent,
	Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetUser } from "../hooks/useSyncUser";
import DashboardNav from "../components/nav/dashboardNav";
import { AddIcon } from "@chakra-ui/icons";
import SubscriptionList from "../components/list_item/subscription_item";
import ModalForm from "../components/modal_form";
import { useGetNoteItemList } from "../hooks/useSyncNoteItem";
import SidebarContent from "../components/sidebar/chatbot_panel_sidebar";
import DashboardTemplate from "../components/page_frame/dashboardTemplate";
import CreateBotForm from "../components/forms/chatbot/createBot";
import ReviewBotForm from "../components/forms/chatbot/reviewBotForm";

export default function CreateBot() {
	const { getUser, getUserData, getUserLoading, getUserError } = useGetUser();

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		window.fbAsyncInit = () => {
			window.FB.init({
				appId: "1308340486759495",
				autoLogAppEvents: true,
				xfbml: true,
				version: "v17.0",
			});
		};
		(function (d, s, id) {
			var js,
				fjs = d.getElementsByTagName(s)[0] as HTMLElement;
			if (d.getElementById(id)) return;
			js = d.createElement(s);
			js.id = id;
			(js as HTMLScriptElement).src =
				"https://connect.facebook.net/en_US/sdk.js";
			fjs.parentNode?.insertBefore(js, fjs);
		})(document, "script", "facebook-jssdk");
	}, []);

	if (getUserError) {
		console.error(getUserError);

		return (
			<Center w="100vw" h="100vh">
				<Text color={"gray.500"}>Your session has expired :(</Text>
			</Center>
		);
	}

	return (
		<DashboardTemplate>
			<Container maxW={"4xl"} py={{ base: 2, md: 6 }}>
				<Heading as="h4" size="lg">
					Create your bot
				</Heading>
				<Text>
					View all the bots that you have created
				</Text>
				<ReviewBotForm />
			</Container>
		</DashboardTemplate>
	);
}
