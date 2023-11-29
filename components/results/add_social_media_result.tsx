import {
	AddIcon,
	CheckCircleIcon,
	CloseIcon,
	ViewIcon,
	ViewOffIcon,
	WarningIcon,
} from "@chakra-ui/icons";
import {
	Text,
	Stack,
	Icon,
	Box,
	Center,
	Spinner,
	RadioGroup,
	Radio,
	Heading,
	Flex,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { ApolloError } from "@apollo/client";

interface AddSocialMediaResultFormProps {
	dataResponse: any;
	createLoading: boolean;
	createError: ApolloError | undefined;
}

export default function AddSocialMediaResultForm(
	props: AddSocialMediaResultFormProps
) {
	const toast = useToast();
	const regex = /success(?:ful)?/i;

	if (props.createLoading) {
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

	if (props.createError) {
		console.error(props.createError);

		return (
			<Center>
				<Text color={"gray.500"}>
					Loading error. Please contact the developer :(
				</Text>
			</Center>
		);
	}

	if (!props.dataResponse) {
		return (
			<Center>
				<Text colorScheme={"facebook"}>No response</Text>
			</Center>
		);
	}
	return (
		<>
			{regex.test(props.dataResponse.createSocialAccount) ? (
				<Box textAlign="center" py={10} px={6}>
					<CheckCircleIcon boxSize={"50px"} color={"green.500"} />
					<Heading as="h2" size="xl" mt={6} mb={2}>
						Success
					</Heading>
					<Text color={"gray.500"}>
						The account is added successfully.
					</Text>
				</Box>
			) : (
				<Box textAlign="center" py={10} px={6}>
					<WarningIcon boxSize={"50px"} color={"red.500"} />
					<Heading as="h2" size="xl" mt={6} mb={2}>
						Fail
					</Heading>
					<Text color={"gray.500"}>
						The account is failed to be added.
					</Text>
				</Box>
			)}
		</>
	);
}
