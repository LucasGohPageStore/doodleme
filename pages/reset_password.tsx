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
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTimer } from "react-timer-hook";
import { LocalStorage } from "../utils/local_storage";

export default function ResetPasswordForm(): JSX.Element {
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();

	const [password, setPassword] = useState({
		value: "",
		isValid: true,
		message: "",
	});
	const [verificationCode, setVerificationCode] = useState({
		value: "",
		isValid: true,
		message: "",
	});
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [isResendButtonLoading, setResendButtonLoading] = useState(false);
	const [isBtnEnabled, setBtn] = useState(true);
	const router = useRouter();
	const time = new Date();

	time.setSeconds(time.getSeconds() + 60);

	const { seconds, start, restart } = useTimer({
		autoStart: false,
		expiryTimestamp: time,
		onExpire: () => {
			// Show the button on expiring time
			setBtn(true);
			// Reset the time to 60 seconds after the expiring time
			restart(time, false);
		},
	});

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

	const handleForgotPasswordSubmit = async () => {
		setIsLoading(true);
		const email = await LocalStorage.getTempEmail();

		if (!email) {
			setIsLoading(false);
			return;
		}
		if (!verificationCode.value) {
			setVerificationCode({
				value: "",
				isValid: false,
				message: "The verification code cannot be empty",
			});
			setIsLoading(false);

			return;
		}

		if (!password.value) {
			setPassword({
				value: "",
				isValid: false,
				message: "The new password cannot be empty",
			});
			setIsLoading(false);

			return;
		}

		try {
			await Auth.forgotPasswordSubmit(
				email,
				verificationCode.value,
				password.value
			);
			toast({
				title: "Change Password Success.",
				description: "Password is changed successfully.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			router.push("/sign_in");
		} catch (error: any) {
			let resultError = error!.toString().split(":")[1].trim();
			toast({
				title: "Change Password fail.",
				description: resultError,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}

		setIsLoading(false);
	};

	const resendVerificationEmail = async () => {
		setResendButtonLoading(true);
		const email = await LocalStorage.getTempEmail();

		if (!email) {
			setResendButtonLoading(false);
			return;
		}

		await Auth.forgotPassword(email);
		setResendButtonLoading(false);
		start();
		setBtn(false);
	};

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
				<Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
					Reset your password?
				</Heading>
				<Text
					fontSize={{ base: "sm", sm: "md" }}
					color={useColorModeValue("gray.800", "gray.400")}
				>
					Input your the verification code from email and new
					password.
				</Text>
				<FormControl id="confirmation_code" isRequired>
					<Input
						type="text"
						onChange={setInput(setVerificationCode)}
						placeholder={"Verification Code"}
						isInvalid={!verificationCode.isValid}
					/>
					<Text fontSize="xs" textColor={"red"}>
						{verificationCode.message}
					</Text>
				</FormControl>
				<FormControl id="password" isRequired>
					<InputGroup>
						<Input
							type={passwordVisible ? "text" : "password"}
							onChange={setInput(setPassword)}
							placeholder="New Password"
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
				<Stack spacing={4}>
					<Button
						bg={"blue.400"}
						color={"white"}
						_hover={{
							bg: "blue.500",
						}}
						onClick={handleForgotPasswordSubmit}
						isLoading={isLoading}
					>
						Submit
					</Button>
					{isBtnEnabled ? (
						<Button
							rightIcon={<ArrowForwardIcon />}
							colorScheme="teal"
							variant="outline"
							isLoading={isResendButtonLoading}
							onClick={resendVerificationEmail}
						>
							Resend Verification Email
						</Button>
					) : (
						<p>
							{" "}
							Please send again in {seconds} second if not found.
						</p>
					)}
				</Stack>
			</Stack>
		</Flex>
	);
}
