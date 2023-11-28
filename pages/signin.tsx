import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Center,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	InputRightElement,
	InputGroup,
	useColorModeValue,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { LocalStorage } from "../utils/local_storage";

const Signin: NextPage = () => {
	const [email, setEmail] = useState({
		value: "",
		isValid: true,
		message: "",
	});

	const [password, setPassword] = useState({
		value: "",
		isValid: true,
		message: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [signInResult, setSignInResult] = useState("");
	const toast = useToast();

	const router = useRouter();

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

	const handleSignIn = async () => {
		setSignInResult("");
		if (!email.value) {
			setEmail({
				value: "",
				isValid: false,
				message: "The email cannot be empty",
			});
			return;
		}

		if (!password.value) {
			setPassword({
				value: "",
				isValid: false,
				message: "The password cannot be empty",
			});
			return;
		}

		setIsLoading(true);

		try {
			await Auth.signIn({
				username: email.value,
				password: password.value,
			});
			await LocalStorage.setTempEmail(email.value);
			router.push("/");
			toast({
				title: "Sign In Success.",
				description: "Successfully signed in.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		} catch (error: any) {
			let resultError = error!.toString().split(":")[1].trim();
			toast({
				title: "Sign In failed.",
				description: resultError,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			if (resultError === "User is not confirmed.") {
				LocalStorage.setTempEmail(email.value);
				router.push("/confirm");
			}
		}

		setIsLoading(false);
	};

	return (
		<Center
			w="100vw"
			h="100vh"
			bg={useColorModeValue("gray.50", "gray.900")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign in to your account
					</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						Don&apos;t have a user? Go and{" "}
						<NextLink href="/signup">
							<Link color={"blue.400"}>sign up</Link>
						</NextLink>{" "}
						✌️
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					boxShadow={"lg"}
					p={8}
					border="0.1px solid white"
				>
					<Stack spacing={4}>
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								value={email.value}
								onChange={setInput(setEmail)}
								isInvalid={!email.isValid}
							/>
							<Text fontSize="xs" textColor={"red"}>
								{email.message}
							</Text>
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={passwordVisible ? "text" : "password"}
									value={password.value}
									isInvalid={!password.isValid}
									onChange={setInput(setPassword)}
								/>
								<InputRightElement width="4.5rem">
									<Button
										h="1.75rem"
										size="sm"
										onClick={() =>
											setPasswordVisible(
												passwordVisible ? false : true
											)
										}
									>
										{passwordVisible ? (
											<ViewOffIcon />
										) : (
											<ViewIcon />
										)}
									</Button>
								</InputRightElement>
							</InputGroup>
							<Text fontSize="xs" textColor={"red"}>
								{password.message}
							</Text>
						</FormControl>
						<Stack spacing={10}>
							<Stack
								direction={{ base: "column", sm: "row" }}
								align={"start"}
								justify={"space-between"}
							>
								<NextLink href="/forgot_password" passHref>
									<Link color={"blue.400"}>
										Forgot password?
									</Link>
								</NextLink>
							</Stack>
							<Button
								isLoading={isLoading}
								onClick={handleSignIn}
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
							>
								Sign in
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Center>
	);
};

export default Signin;
