import Head from "next/head";
import {
	Box,
	Container,
	Text,
	Button,
	Stack,
	Center,
	Spinner,
	useColorMode,
	Flex,
	Spacer,
	Heading,
	Icon,
	createIcon,
	useColorModeValue,
	AspectRatio,
	Grid,
	GridItem,
	SimpleGrid,
	Image,
	Link,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import DashboardNav from "../components/nav/dashboardNav";
import {
	AiFillNotification,
	AiOutlineCheck,
	AiOutlineFieldTime,
	AiOutlineReload,
	AiOutlineShareAlt,
	AiTwotoneCalendar,
	AiTwotoneContainer,
} from "react-icons/ai";
import {
	color1,
	color2,
	color3,
	color4,
} from "../lib/utils/constants/color-constant";
import { useRouter } from "next/router";
import { AuthNav } from "../components/nav/authenticationNav";
import Header from "../components/nav/header";

export default function LandingPage() {
	const router = useRouter();

	return (
		<>
			<Header />
			<Container maxW={{ base: "3xl", sm: "5xl", md: "8xl" }}>
				{" "}
				<Box px={4}>
					<Flex
						h={16}
						alignItems={"center"}
						justifyContent={"space-between"}
					>
						<Box display={"flex"}>
							<Image
								boxSize="100px"
								objectFit="cover"
								src="pagestore_logo.png"
							/>
						</Box>

						<Flex alignItems={"center"}>
							<AuthNav />
						</Flex>
					</Flex>
				</Box>
			</Container>
			<Container maxW={"3xl"}>
				<Stack
					as={Box}
					textAlign={"left"}
					spacing={{ base: 8, md: 14 }}
					py={{ base: 20, md: 36 }}
				>
					<Heading
						lineHeight={1.1}
						fontWeight={700}
						fontSize={{ base: "3xl", sm: "5xl", md: "7xl" }}
					>
						<Text as={"span"}>Never forget,</Text>
						<br />
						<Text as={"span"}>Never waste,</Text>
						<br />
						<Text
							as={"span"}
							position={"relative"}
							_after={{
								content: "''",
								width: "full",
								height: "30%",
								position: "absolute",
								bottom: 1,
								left: 0,
								bg: color2,
								zIndex: -1,
							}}
						>
							Your subscription.
						</Text>
					</Heading>
					<Text color={"gray.500"}>
						Oops! Invoice surprise: Subscribed without realizing!
					</Text>

					<Flex direction="row" align="center" justify="flex-end">
						<Stack spacing={{ base: 2, md: 4 }}>
							<Button
								leftIcon={<Icon as={AiOutlineCheck} />}
								rounded={"full"}
								bg={color3}
								color={"white"}
								_hover={{
									bg: "blue.700",
								}}
								size={"lg"}
								onClick={() => {
									router.push(
										process.env.NODE_ENV === "development"
											? "http://app.localhost:3000/dashboard"
											: "http://app.pagemate.space/dashboard"
									);
								}}
							>
								Savings on Autopilot
							</Button>
							<Stack direction="row" align="center">
								<Text fontSize={"md"} fontFamily={"fantasy"}>
									Starting at FREE
								</Text>

								<Icon
									as={Arrow}
									color={useColorModeValue(
										"gray.800",
										"gray.300"
									)}
									w={71}
									transform={"rotate(-10deg)"}
								/>
							</Stack>
						</Stack>
					</Flex>
				</Stack>
				<Box
					rounded={"lg"}
					boxShadow={"lg"}
					p={8}
					bgGradient={`linear(to-tr, ${color2}, ${color4}, ${color1}, ${color3})`}
				>
					<AspectRatio maxW="3xl" ratio={16 / 9}>
						<iframe
							src={
								"https://www.loom.com/embed/3353cbd6ea0a496380c79cf47e4f5a10?sid=bbc17c75-fdce-43d8-a45e-95e1c2150ddb"
							}
							allowFullScreen
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
							}}
						/>
					</AspectRatio>
				</Box>
			</Container>
			<Box p={8}>
				<Container maxW={"4xl"} mt={10}>
					<Stack spacing={10} as={Box} textAlign={"center"}>
						<Flex flexWrap="wrap" gridGap={2} justify="center">
							<Card
								heading={"Automated reminders"}
								icon={
									<Icon as={AiOutlineReload} w={10} h={10} />
								}
							/>
							<Card
								heading={"Non-spam notification"}
								icon={
									<Icon
										as={AiFillNotification}
										w={10}
										h={10}
									/>
								}
							/>
							<Card
								heading={"On-time and reliable notifications"}
								icon={
									<Icon
										as={AiOutlineFieldTime}
										w={10}
										h={10}
									/>
								}
							/>
							<Card
								heading={"Schedule in a few clicks"}
								icon={
									<Icon
										as={AiTwotoneCalendar}
										w={10}
										h={10}
									/>
								}
							/>
							<Card
								heading={"Notify your friends"}
								icon={
									<Icon
										as={AiOutlineShareAlt}
										w={10}
										h={10}
									/>
								}
							/>
							<Card
								heading={"Keep every subscriptions on-track"}
								icon={
									<Icon
										as={AiTwotoneContainer}
										w={10}
										h={10}
									/>
								}
							/>
						</Flex>
						<Stack spacing={{ base: 1, md: 2 }} align={"center"}>
							<Button
								leftIcon={<Icon as={AiOutlineCheck} />}
								rounded={"full"}
								bg={color3}
								color={"white"}
								_hover={{
									bg: "blue.700",
								}}
								maxW={"350px"}
								size={"lg"}
								onClick={() => {
									router.push(
										process.env.NODE_ENV === "development"
											? "http://app.localhost:3000/dashboard"
											: "http://app.pagemate.space/dashboard"
									);
								}}
							>
								Savings on Autopilot
							</Button>
							<Text>Try it now</Text>
						</Stack>
					</Stack>
				</Container>
			</Box>
			<Container maxW={"2xl"} py={{ base: 12, md: 30 }}>
				<Stack
					as={Box}
					textAlign={"center"}
					spacing={{ base: 8, md: 14 }}
					py={{ base: 4, md: 6 }}
				>
					<Text as="samp" color={"gray.500"}>
						Penny wise, shop wise
					</Text>{" "}
					<Heading
						lineHeight={1.1}
						fontWeight={700}
						fontSize={{ base: "xl", sm: "3xl", md: "5xl" }}
					>
						<Text as={"span"}>Keep an eye on your cloud spend</Text>
					</Heading>
					<Text color={"gray.500"}>
						Isn't it good to have someone reminding you when your
						subscription is expiring soon? Take control of your
						choices and decide whether to continue.
					</Text>{" "}
				</Stack>
				<Box
					rounded={"lg"}
					boxShadow={"lg"}
					p={8}
					bgGradient={`linear(to-tr, ${color2}, ${color4}, ${color1}, ${color3})`}
				>
					<AspectRatio maxW="3xl" ratio={16 / 9}>
						<iframe
							title="second video"
							src="https://www.loom.com/embed/f2ed3994cb6540888f1e05746fad2273?sid=e15bbab8-b986-4737-9229-9e6ade6f4f9b"
							allowFullScreen
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
							}}
						/>
					</AspectRatio>
				</Box>
			</Container>
			<Container maxW={"5xl"} py={12}>
				<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
					<Stack spacing={4}>
						<Text
							textTransform={"uppercase"}
							color={useColorModeValue(color3, color1)}
							fontWeight={600}
							fontSize={"sm"}
							bg={useColorModeValue(color1, color4)}
							p={2}
							alignSelf={"flex-start"}
							rounded={"md"}
						>
							Easily schedule
						</Text>
						<Heading>Recur reminders with a few clicks</Heading>
						<Text color={"gray.500"} fontSize={"lg"}>
							Simply provide your subscription details, and we'll
							handle the rest seamlessly. Receive timely reminders
							tailored to your subscriptions, ensuring you're
							notified before they expire.
						</Text>
					</Stack>
					<Flex>
						<Image
							rounded={"md"}
							alt={"feature image"}
							src={
								"https://appresourcespagestore.s3.amazonaws.com/recur_reminders.png"
							}
							objectFit={"cover"}
						/>
					</Flex>
				</SimpleGrid>
			</Container>
			<Container maxW={"5xl"} py={12}>
				<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
					<Flex>
						<Image
							rounded={"md"}
							alt={"feature image"}
							src={
								"https://appresourcespagestore.s3.amazonaws.com/view_all_subs.png"
							}
							objectFit={"cover"}
						/>
					</Flex>
					<Stack spacing={4}>
						<Text
							textTransform={"uppercase"}
							color={useColorModeValue(color3, color1)}
							fontWeight={600}
							fontSize={"sm"}
							bg={useColorModeValue(color1, color4)}
							p={2}
							alignSelf={"flex-start"}
							rounded={"md"}
						>
							Keep an eye
						</Text>
						<Heading>Keep track of all the subscriptioins</Heading>
						<Text color={"gray.500"} fontSize={"lg"}>
							Effortlessly manage your subscription and access
							them anytime. Seamlessly integrate them into your
							financial planning or utilize them for various
							purposes. Stay in control of your subscriptions with
							ease and convenience.{" "}
						</Text>
					</Stack>
				</SimpleGrid>
			</Container>
			<Container maxW={"5xl"} py={12}>
				<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
					<Stack spacing={4}>
						<Text
							textTransform={"uppercase"}
							color={useColorModeValue(color3, color1)}
							fontWeight={600}
							fontSize={"sm"}
							bg={useColorModeValue(color1, color4)}
							p={2}
							alignSelf={"flex-start"}
							rounded={"md"}
						>
							On-time and reliable
						</Text>
						<Heading>Reminders will be sent to your inbox</Heading>
						<Text color={"gray.500"} fontSize={"lg"}>
							Receive reminders directly in your preferred inbox,
							granting you instant notifications to consider. Stay
							informed and make informed decisions effortlessly,
							all at your convenience.{" "}
						</Text>
					</Stack>
					<Flex>
						<Image
							rounded={"md"}
							alt={"feature image"}
							src={
								"https://appresourcespagestore.s3.amazonaws.com/sample_reminder.png"
							}
							objectFit={"cover"}
						/>
					</Flex>
				</SimpleGrid>
			</Container>
			<Box
				bg={useColorModeValue(color4, color1)}
				color={useColorModeValue(color1, color4)}
			>
				<Container
					as={Stack}
					maxW={"4xl"}
					py={4}
					direction={{ base: "column", md: "row" }}
					spacing={4}
					justify={{ base: "center", md: "space-between" }}
					align={{ base: "center", md: "center" }}
				>
					<Stack direction={"row"} spacing={6}>
						<Link href={"#"}>Home</Link>
						<Link href={"#"}>About</Link>
						<Link href="https://www.instagram.com/saculniotanf/">
							Contact
						</Link>
					</Stack>
					<Text>
						Powered by Lucas Fancation. Built by{" "}
						<a
							href="https://www.instagram.com/saculniotanf/"
							style={{ textDecoration: "underline" }}
						>
							Lucas Fancation
						</a>
					</Text>
				</Container>
			</Box>
		</>
	);
}

const Arrow = createIcon({
	displayName: "Arrow",
	viewBox: "0 0 72 24",
	path: (
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
			fill="currentColor"
		/>
	),
});
interface CardProps {
	heading: string;
	icon: ReactElement;
}
const Card = ({ heading, icon }: CardProps) => {
	return (
		<Box
			maxW={{ base: "full", md: "275px" }}
			w={"full"}
			borderWidth="1px"
			borderRadius="lg"
			borderColor={color2}
			overflow="hidden"
			p={5}
		>
			<Stack align={"center"} spacing={2}>
				<Flex
					w={16}
					h={16}
					align={"center"}
					justify={"center"}
					color={color4}
					rounded={"full"}
					bg={color1}
				>
					{icon}
				</Flex>
				<Box mt={2}>
					<Heading size="md" textAlign={"center"}>
						{heading}
					</Heading>
				</Box>
			</Stack>
		</Box>
	);
};
