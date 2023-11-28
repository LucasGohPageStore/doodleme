import { AddIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Text,
	Stack,
	Icon,
	Box,
	Center,
	Spinner,
	RadioGroup,
	Radio,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
	color1,
	color2,
	color3,
	color4,
} from "../../../lib/utils/constants/color-constant";
import {
	Dispatch,
	ReactElement,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { FbAccount } from "../../../graphql/API";
import { ApolloError } from "@apollo/client";
import { AiOutlineInbox } from "react-icons/ai";
import FbInstaPageItem from "../../list_item/fb_insta_page_item";

interface SelectFbPagesFormProps {
	getFbPagesData: FbAccount[] | undefined;
	getFbPagesLoading: boolean;
	getFbPagesError: ApolloError | undefined;
	setFbPageId: Dispatch<SetStateAction<string>>;
	selectedFbPageId: string;
}

export default function SelectFbPagesForm(props: SelectFbPagesFormProps) {
	const toast = useToast();

	if (props.getFbPagesLoading) {
		return (
			<Center>
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


	if (props.getFbPagesError) {
		console.error(props.getFbPagesError);

		return (
			<Center>
				<Text color={"gray.500"}>
					Loading error. Please contact the developer :(
				</Text>
			</Center>
		);
	}

	if (!props.getFbPagesData || props.getFbPagesData.length === 0) {
		return (
			<Stack p={4} spacing={"3"}>
				<Center>
					<Icon as={AiOutlineInbox} size={"lg"} />
				</Center>
				<Center>
					<Text colorScheme={"facebook"}>No FB page is found</Text>
				</Center>
			</Stack>
		);
	}


	return (
		<RadioGroup onChange={props.setFbPageId} value={props.selectedFbPageId}>
			<Stack p={8} spacing={3}>
				{props.getFbPagesData.map((socialAccount) => {
					return (
						<Box
							borderWidth="1px"
							borderRadius="lg"
							overflow="hidden"
							p={2}
						>
							<Radio value={socialAccount.fbPageId!}>
								<FbInstaPageItem socialAccount={socialAccount} />
							</Radio>
						</Box>
					);
				})}
			</Stack>
		</RadioGroup>
	);
}
