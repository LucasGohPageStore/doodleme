import { ArrowForwardIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTimer } from "react-timer-hook";

const Signin: NextPage = () => {
	const [confirmationCode, setConfirmationCode] = useState({
		value: "",
		isValid: true,
	});
	const [isLoading, setIsLoading] = useState(false);
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

	const handleConfirmUser = async () => {
		if (!confirmationCode) {
			setConfirmationCode({ value: "", isValid: false });
			return;
		}

		setIsLoading(true);

		if (typeof window === "undefined") {
			return;
		}

		const email = localStorage.getItem("pending_verification_email");

		if (!email) {
			setIsLoading(false);

			return;
		}

		try {
			await Auth.confirmSignUp(email, confirmationCode.value);
			localStorage.removeItem("pending_verification_email");
			router.push("/signin");
		} catch (error) {
			console.error(error);
		}

		setIsLoading(false);
	};

	const resendVerificationEmail = async () => {
		setResendButtonLoading(true);
		const email = localStorage.getItem("pending_verification_email");

		if (!email) {
			setResendButtonLoading(false);

			return;
		}

		try {
			await Auth.resendSignUp(email);
		} catch (error) {
			console.error(error);
		}

		setResendButtonLoading(false);
		setBtn(false);
		start();
	};

	return (
		<Center w="100vw" h="100vh" bg={"gray.50"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>Confirm your account</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						Check your email. We sent you a code.
					</Text>
				</Stack>
				<Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
					<Stack spacing={4}>
						<FormControl id="confirmation_code">
							<FormLabel>Confirmation code</FormLabel>
							<Input
								type="text"
								value={confirmationCode.value}
								onChange={(e) =>
									setConfirmationCode({
										value: e.target.value,
										isValid: true,
									})
								}
								isInvalid={!confirmationCode.isValid}
							/>
						</FormControl>
						<Stack spacing={4}>
							<Button
								colorScheme={"blue"}
								isLoading={isLoading}
								onClick={handleConfirmUser}
							>
								Confirm
							</Button>
							{isBtnEnabled ? (
								<Button
									rightIcon={<ArrowForwardIcon />}
									colorScheme="teal"
									variant="outline"
									isLoading={isResendButtonLoading}
									onClick={resendVerificationEmail}
								>
									Resend Confirmation Email
								</Button>
							) : (
								<p>
									{" "}
									Please send again in {seconds} second if not
									found.
								</p>
							)}
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Center>
	);
};

export default Signin;
