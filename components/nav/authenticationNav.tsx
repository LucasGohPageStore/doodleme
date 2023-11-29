import Head from "next/head";
import {
	Avatar,
	Button,
	Center,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Spinner,
	Stack,
	useColorMode,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { LocalStorage } from "../../utils/local_storage";
import { useRouter } from "next/router";
import { useGetUser } from "../../hooks/useSyncUser";
import { Auth } from "aws-amplify";
import { useEffect } from "react";

export const AuthNav: React.FC<any> = () => {
	const { getUser, getUserData, getUserError, getUserLoading } = useGetUser();
	const { colorMode, toggleColorMode } = useColorMode();
	const router = useRouter();

	const handleMenuChange = async (event: string) => {
		console.log(event);
		switch (event) {
			case "logout":
				await Auth.signOut();
				LocalStorage.resetStorage();
				router.push("/signin");
				break;
			case "dashboard":
				router.push("/dashboard");
				break;
			case "profile_edit":
				router.push("/profile_edit");
				break;
			case "change_password":
				router.push("/change_password");
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	if (!getUserData && getUserLoading) {
		return (
			<Spinner
				thickness="2px"
				speed="0.65s"
				emptyColor="gray.200"
				color="blue.500"
				size="sm"
			/>
		);
	}

	if (getUserData) {
		return (
			<Stack direction={"row"} spacing={7}>
				{/* <Button onClick={toggleColorMode}>
					{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
				</Button> */}
				<Menu>
					<MenuButton
						as={Button}
						rounded={"full"}
						variant={"link"}
						cursor={"pointer"}
						minW={0}
					>
						<Avatar size={"sm"} src={"https://picsum.photos/400"} />
					</MenuButton>
					<MenuList alignItems={"center"}>
						<br />
						<Center>
							<Avatar
								size={"2xl"}
								src={"https://picsum.photos/400"}
							/>
						</Center>
						<br />
						<Center>
							<p>{getUserData.username}</p>
						</Center>
						<br />
						<MenuDivider />
						<MenuItem
							onClick={() => handleMenuChange("dashboard")}
						></MenuItem>
						<MenuItem
							onClick={() => handleMenuChange("change_password")}
						>
							Change Password
						</MenuItem>
						<MenuItem
							onClick={() => handleMenuChange("profile_edit")}
						>
							Profile Edit
						</MenuItem>
						<MenuItem onClick={() => handleMenuChange("logout")}>
							Logout
						</MenuItem>
					</MenuList>
				</Menu>
			</Stack>
		);
	}

	return (
		<Stack
			flex={{ base: 1, md: 0 }}
			justify={"flex-end"}
			direction={"row"}
			spacing={6}
		>
			{/* <Button onClick={toggleColorMode}>
				{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
			</Button> */}
			{/* <Button
				as={"a"}
				fontSize={"sm"}
				fontWeight={400}
				variant={"link"}
				href={"http://app.localhost:3000/signin"}
			>
				Sign In
			</Button> */}
			<Button
				as={"a"}
				display={"inline-flex"}
				fontSize={"sm"}
				fontWeight={600}
				color={"white"}
				bg={"pink.400"}
				_hover={{
					bg: "pink.300",
				}}
				href={"http://app.doodleme.art/dashboard"}
			>
				Open App
			</Button>
		</Stack>
	);
};
