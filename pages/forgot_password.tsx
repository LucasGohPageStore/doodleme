import {
	Button,
	FormControl,
	Flex,
	Heading,
	Input,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useState } from "react";
import { LocalStorage } from "../utils/local_storage";

type ForgotPasswordFormInputs = {
	email: string;
};

export default function ForgotPasswordForm(): JSX.Element {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState({
		value: "",
		isValid: true,
		message: "",
	});

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
	const handleForgotPassword = async () => {
		setIsLoading(true);
		if (!email.value) {
			setEmail({
				value: "",
				isValid: false,
				message: "The email cannot be empty",
			});
			setIsLoading(false);

			return;
		}

		await Auth.forgotPassword(email.value);
        await LocalStorage.setTempEmail(email.value);
        router.push("/reset_password")
		setIsLoading(false);
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
					Forgot your password?
				</Heading>
				<Text
					fontSize={{ base: "sm", sm: "md" }}
					color={useColorModeValue("gray.800", "gray.400")}
				>
					You&apos;ll get an email with a reset link
				</Text>
				<FormControl id="email" isRequired>
					<Input
						placeholder="your-email@example.com"
						_placeholder={{ color: "gray.500" }}
						type="email"
						isInvalid={!email.isValid}
						onChange={setInput(setEmail)}
					/>
					<Text fontSize="xs" textColor={"red"}>
						{email.message}
					</Text>
				</FormControl>
				<Stack spacing={6}>
					<Button
						bg={"blue.400"}
						color={"white"}
						_hover={{
							bg: "blue.500",
						}}
						onClick={handleForgotPassword}
						isLoading={isLoading}
					>
						Request Reset
					</Button>
				</Stack>
			</Stack>
		</Flex>
	);
}
