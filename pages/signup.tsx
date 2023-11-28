import {
	Center,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
	InputRightElement,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";
import NextLink from "next/link";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

const Signup: NextPage = () => {
	const [firstName, setFirstName] = useState({
		value: "",
		isValid: true,
		message: "",
	});
	const [lastName, setLastName] = useState({
		value: "",
		isValid: true,
		message: "",
	});
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
	const [passwordVisible, setPasswordVisible] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const toast = useToast();

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

	const handleSignUp = async () => {
		if (!firstName.value) {
			setFirstName({
				value: "",
				isValid: false,
				message: "The first name cannot be empty",
			});
			return;
		}

		if (!lastName.value) {
			setLastName({
				value: "",
				isValid: false,
				message: "The second name cannot be empty",
			});
			return;
		}

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
			await Auth.signUp({
				username: email.value,
				password: password.value,
				attributes: {
					email: email.value,
					name: `${firstName.value} ${lastName.value}`,
				},
			});

			if (typeof window !== "undefined") {
				localStorage.setItem("pending_verification_email", email.value);
			}

			router.push("/confirm");
		} catch (error: any) {
			toast({
				title: "Sign Up fail.",
				description: error!.toString().split(":")[1].trim(),
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}

		setIsLoading(false);
	};

	return (
		<Center w="100vw" h="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up
					</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to enjoy all of our cool features ✌️
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl id="firstName" isRequired>
									<FormLabel>First Name</FormLabel>
									<Input
										type="text"
										value={firstName.value}
										onChange={setInput(setFirstName)}
										isInvalid={!firstName.isValid}
									/>
									<Text fontSize="xs" textColor={"red"}>
										{firstName.message}
									</Text>
								</FormControl>
							</Box>
							<Box>
								<FormControl id="lastName">
									<FormLabel>Last Name</FormLabel>
									<Input
										type="text"
										value={lastName.value}
										onChange={setInput(setLastName)}
										isInvalid={!lastName.isValid}
									/>
									<Text fontSize="xs" textColor={"red"}>
										{lastName.message}
									</Text>
								</FormControl>
							</Box>
						</HStack>
						<FormControl id="email" isRequired>
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
						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<InputGroup>
									<Input
										type={
											passwordVisible
												? "text"
												: "password"
										}
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
													passwordVisible
														? false
														: true
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
							</InputGroup>
							<Text fontSize="xs" textColor={"red"}>
								{password.message}
							</Text>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								isLoading={isLoading}
								size="lg"
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
								onClick={handleSignUp}
							>
								Sign up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Already a user?{" "}
								<NextLink href="/signin">
									<Link color={"blue.400"}>Login</Link>
								</NextLink>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Center>
	);
};

export default Signup;
