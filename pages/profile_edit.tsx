import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	useColorModeValue,
	Center,
	Spinner,
	useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useGetUser, useUpdateUser } from "../hooks/useSyncUser";

export default function UserProfileEdit() {
	const [username, setUsername] = useState({ value: "", isValid: true });
	const { getUser, getUserData } = useGetUser();
	const { updateUser } = useUpdateUser();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const toast = useToast();

	const setInput =
		(setter: (inp: { value: string; isValid: boolean }) => void) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setter({ value: e.target.value, isValid: true });
		};

	const handleUpdate = async () => {
		if (!username.value) {
			setUsername({ value: "", isValid: false });
			toast({
				title: "Please enter your username",
				status: "error",
				duration: 1000,
				isClosable: true,
			});
			return;
		}

		setIsLoading(true);

		try {
			const user = await Auth.currentAuthenticatedUser();
			await Auth.updateUserAttributes(user, {
				name: username.value,
			});

			let result = await updateUser({
				variables: {
					cognitoUser: {
						id: getUserData!.id,
						username: username.value,
					},
				},
			});

			toast({
				title: "Profile Change Success",
				description: "Profile is chnaged successfully",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		} catch (error: any) {
			toast({
				title: "Profile is failed to be changed",
				description: error,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}

		setIsLoading(false);
	};
	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		setUsername({
			value: getUserData?.username ?? username.value,
			isValid: true,
		});
	}, [getUserData]);

	if (!getUserData) {
		return (
			<Center w="100vw" h="100vh">
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
			</Center>
		);
	}

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack
				spacing={4}
				w={"full"}
				maxW={"md"}
				bg={useColorModeValue("white", "gray.700")}
				rounded={"xl"}
				boxShadow={"lg"}
				p={6}
				my={12}
			>
				<Heading
					lineHeight={1.1}
					fontSize={{ base: "2xl", sm: "3xl" }}
					color={useColorModeValue("black", "white")}
				>
					User Profile Edit
				</Heading>

				<FormControl id="userName" isRequired>
					<FormLabel>User name</FormLabel>
					<Input
						placeholder="Username"
						_placeholder={{ color: "gray.500" }}
						type="text"
						value={username.value}
						onChange={setInput(setUsername)}
						isInvalid={!username.isValid}
					/>
				</FormControl>

				<Stack spacing={6} direction={["column", "row"]}>
					<Button
						bg={"red.400"}
						color={"white"}
						w="full"
						_hover={{
							bg: "red.500",
						}}
						onClick={() => router.replace("/")}
					>
						Cancel
					</Button>
					<Button
						bg={"blue.400"}
						color={"white"}
						w="full"
						_hover={{
							bg: "blue.500",
						}}
						onClick={handleUpdate}
						isLoading={isLoading}
					>
						Save
					</Button>
				</Stack>
			</Stack>
		</Flex>
	);
}
