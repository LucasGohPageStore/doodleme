import {
	Box,
	Button,
	Center,
	FormControl,
	Grid,
	GridItem,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Text,
	Tag,
	TagLabel,
	TagLeftIcon,
	Tooltip,
} from "@chakra-ui/react";
import { AiOutlineWhatsApp, AiOutlineMail } from "react-icons/ai";
import { FaInstagram, FaInstagramSquare, FaSms } from "react-icons/fa";
import { NoteItem } from "../../graphql/API";
import { useState } from "react";

interface ReminderTypeInputProps {
	setEmailCredential: (input: any) => void;
	emailCredential: {
		value: string;
		isValid: boolean;
		message: string;
	};
	// setWhatsAppCredential: (input: any) => void;
	// setSMSCredential: (input: any) => void;
	// whatsappCredential: {
	// 	value: string;
	// 	isValid: boolean;
	// 	message: string;
	// };
	// smsCredential: {
	// 	value: string;
	// 	isValid: boolean;
	// 	message: string;
	// };
	noteItem?: NoteItem;
}

export default function SocialPlatformInput(props: ReminderTypeInputProps) {
	const [instagramLoginMsg, setInstagramLoginMsg] = useState<string>("");
	// Facebook Login with JavaScript SDK
	function instagramLogin() {
		FB.login(
			function (response) {
				if (response.authResponse) {
					// User successfully logged in and authorized the app
					// Retrieve the access token
					const accessToken = response.authResponse.accessToken;
					// Use the access token to make API requests
					console.log(accessToken);
					// Example: Fetch Instagram user's media
					fetch(
						`https://graph.instagram.com/me/media?fields=id,caption&access_token=${accessToken}`
					)
						.then((response) => response.json())
						.then((data) => {
							console.log(data);
						});
				} else {
					// User cancelled the login or didn't authorize the app
					setInstagramLoginMsg(
						"User cancelled login or did not fully authorize."
					);
				}
			},
			{
				scope: "instagram_basic,pages_show_list,instagram_manage_messages,pages_manage_metadata",
			}
		);
	}

	return (
		<Stack spacing={"2"} p={"5"}>
			<Tooltip label="Will be connected through Facebook ">
				<Button
					leftIcon={<Icon as={FaInstagram} />}
					aria-label="Verdana"
					fontSize="md"
					colorScheme="pink"
					onClick={() => {
						instagramLogin();
					}}
				>
					Connect your instagram page
				</Button>
			</Tooltip>
			{instagramLoginMsg === "" ? (
				<></>
			) : (
				<Text color={"red"} fontSize={"xs"}>{instagramLoginMsg}</Text>
			)}
		</Stack>
	);
}
