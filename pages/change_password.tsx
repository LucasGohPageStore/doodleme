import { ViewOffIcon, ViewIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
	Button,
	FormControl,
	Flex,
	Heading,
	Input,
	Stack,
	Text,
	useColorModeValue,
	InputGroup,
	InputRightElement,
	Center,
	Spinner,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { useGetUser } from "../hooks/useSyncUser";
import { LocalStorage } from "../utils/local_storage";
import DashboardNav from "../components/nav/dashboardNav";
import Header from "../components/nav/header";

export default function ChangePasswordForm(): JSX.Element {
	const { getUser, getUserData, getUserLoading, getUserError } = useGetUser();
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();

	const [oldPassword, setOldPassword] = useState({
		value: "",
		isValid: true,
		message: "",
	});
	const [newPassword, setNewPassword] = useState({
		value: "",
		isValid: true,
		message: "",
	});

	const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
	const [newPasswordVisible, setNewPasswordVisible] = useState(false);

	const router = useRouter();

	useEffect(() => {
		getUser();
	}, []);

	const setInput =
		(
			setter: (inp: {
				value: string;
				isValid: boolean;
				message: string;
			}) => void
		) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setter({ value: e.target.value, isValid: true, message: "" });
		};

	const handlePasswordChangeSubmit = async () => {
		setIsLoading(true);

		if (!oldPassword.value) {
			setOldPassword({
				value: "",
				isValid: false,
				message: "The old password cannot be empty",
			});
			setIsLoading(false);

			return;
		}

		if (!newPassword.value) {
			setOldPassword({
				value: "",
				isValid: false,
				message: "The new password cannot be empty",
			});
			setIsLoading(false);

			return;
		}

		let result = await changePasswordFunction();
		if (result !== "SUCCESS") {
			toast({
				title: "Change Password fail.",
				description: "Password is failed to be changed.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Change Password Success.",
				description: "Password is changed successfully.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			router.push("/");
		}

		setIsLoading(false);
	};

	const changePasswordFunction = async () => {
		try {
			const user = await Auth.currentAuthenticatedUser();
			return await Auth.changePassword(
				user,
				oldPassword.value,
				newPassword.value
			);
		} catch (error: any) {
			let resultError = error.toString().split(":")[1].trim();
			return resultError;
		}
	};

	if (getUserLoading || !getUserData) {
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

	if (getUserError) {
		console.error(getUserError);

		return (
			<Center w="100vw" h="100vh">
				<Text color={"gray.500"}>Your session has expired :(</Text>
			</Center>
		);
	}

	return (
		<>
			<Header />
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
						fontSize={{ base: "2xl", md: "3xl" }}
						color={useColorModeValue("black", "white")}
					>
						Change your password?
					</Heading>
					<FormControl id="old_password" isRequired>
						<InputGroup>
							<Input
								type={oldPasswordVisible ? "text" : "password"}
								onChange={setInput(setOldPassword)}
								placeholder="Old Password"
							/>
							<InputRightElement width="4.5rem">
								<Button
									h="1.75rem"
									size="sm"
									onClick={() =>
										setOldPasswordVisible(
											oldPasswordVisible ? false : true
										)
									}
								>
									{oldPasswordVisible ? (
										<ViewOffIcon />
									) : (
										<ViewIcon />
									)}
								</Button>
							</InputRightElement>
						</InputGroup>
						<Text fontSize="xs" textColor={"red"}>
							{oldPassword.message}
						</Text>
					</FormControl>
					<FormControl id="new_password" isRequired>
						<InputGroup>
							<Input
								type={newPasswordVisible ? "text" : "password"}
								onChange={setInput(setNewPassword)}
								placeholder="New Password"
							/>
							<InputRightElement width="4.5rem">
								<Button
									h="1.75rem"
									size="sm"
									onClick={() =>
										setNewPasswordVisible(
											newPasswordVisible ? false : true
										)
									}
								>
									{newPasswordVisible ? (
										<ViewOffIcon />
									) : (
										<ViewIcon />
									)}
								</Button>
							</InputRightElement>
						</InputGroup>
						<Text fontSize="xs" textColor={"red"}>
							{newPassword.message}
						</Text>
					</FormControl>
					<Stack spacing={4}>
						<Button
							bg={"blue.400"}
							color={"white"}
							_hover={{
								bg: "blue.500",
							}}
							onClick={handlePasswordChangeSubmit}
							isLoading={isLoading}
						>
							Submit
						</Button>
					</Stack>
				</Stack>
			</Flex>
		</>
	);
}
