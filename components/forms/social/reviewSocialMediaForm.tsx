import {
	AddIcon,
	CheckCircleIcon,
	ViewIcon,
	ViewOffIcon,
} from "@chakra-ui/icons";
import {
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Text,
	Stack,
	Tag,
	TagLabel,
	Icon,
	Box,
	Button,
	Container,
	Flex,
	Heading,
	SimpleGrid,
	Center,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Progress,
	useSteps,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
	color1,
	color2,
	color3,
	color4,
} from "../../../lib/utils/constants/color-constant";
import { ReactElement, useEffect, useState } from "react";
import {
	useCreateSocialAccount,
	useGetFbPages,
	useGetInstaAccts,
	useGetSocialAccountList,
	useRemoveSocialAccount,
} from "../../../hooks/useSyncSocialAccount";
import { useRouter } from "next/router";
import { title } from "process";
import { AiFillCrown } from "react-icons/ai";
import SocialPlatformInput from "../../modal_form/social_platform_type";
import SelectFbPagesForm from "./selectFbPagesForm";
import SelectInstaForm from "./selectInstaFrom";
import AddSocialMediaResultForm from "../../results/add_social_media_result";
import SocialAccountDisplayItem from "../../list_item/social_account_display_item";

interface ReviewSocialFormProps {}

const steps = [
	{ title: "First", description: "Fb page" },
	{ title: "Second", description: "Instagram" },
	{ title: "Third", description: "Result" },
];

export default function ReviewSocialForm(props: ReviewSocialFormProps) {
	const toast = useToast();
	const { getFbPages, getFbPagesData, getFbPagesLoading, getFbPagesError } =
		useGetFbPages();
	const {
		getInstaAcct,
		getInstaAcctData,
		getInstaAcctLoading,
		getInstaAcctError,
	} = useGetInstaAccts();
	const { createSocialAccount, dataResponse, createLoading, createError } =
		useCreateSocialAccount();
	const { removeSocialAccount, removeDataResponse, removeLoading, removeError } =
		useRemoveSocialAccount();
	const {
		getSocialAccountList,
		getSocialAccountListData,
		getSocialAccountListLoading,
		getSocialAccountListError,
	} = useGetSocialAccountList();
	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: steps.length,
	});
	const [accessToken, setAccessToken] = useState("");
	const [isModalOpen, setModalOpen] = useState(false);
	const [selectedFbPageId, setFbPageId] = useState("");
	const [selectedInstaId, setInstaId] = useState("");

	const regex = /success(?:ful)?/i;


	useEffect(() => {
		callGetSocialAccountList();
	}, []);

	if (getSocialAccountListLoading) {
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

	const addSocialMedia = () => {
		FB.login(
			function (response) {
				console.log(response);

				if (response.authResponse) {
					setModalOpen(true);
					setAccessToken(response.authResponse.accessToken);
					callGetFbPages(response.authResponse.accessToken);
				} else {
					console.log("Fail to login fb");
				}
			},
			{
				config_id: "940633717222989", // configuration ID goes here
			}
		);
	};

	const handleNext = async () => {
		switch (activeStep) {
			case 0:
				if (selectedFbPageId != "") {
					setActiveStep(1);
					callGetInstaAcct();
				} else {
					toast({
						title: "Please select a FB page.",
						status: "error",
						duration: 9000,
						isClosable: true,
					});
				}
				break;
			case 1:
				if (selectedInstaId != "") {
					setActiveStep(2);
					callCreateSocialAccount();
				} else {
					toast({
						title: "Please select an Insta account.",
						status: "error",
						duration: 9000,
						isClosable: true,
					});
				}
				break;
			default:
				closeModal();
				break;
		}
	};

	const callGetFbPages = async (accessTokenParam?: string) => {
		const result = await getFbPages({
			variables: {
				fbAccount: {
					longLiveToken: accessTokenParam
						? accessTokenParam
						: accessToken,
				},
			},
		});
	};

	const callGetInstaAcct = async (accessTokenParam?: string) => {
		const result = await getInstaAcct({
			variables: {
				fbAccount: {
					longLiveToken: accessTokenParam
						? accessTokenParam
						: accessToken,
					fbPageId: selectedFbPageId,
				},
			},
		});
	};

	const callCreateSocialAccount = async (accessTokenParam?: string) => {
		const result = await createSocialAccount({
			variables: {
				fbAccount: {
					longLiveToken: accessTokenParam
						? accessTokenParam
						: accessToken,
					fbPageId: selectedFbPageId, // Each page has only one ig. And we need the page id to get page acceess token then send message through ig
					igId: selectedInstaId, // Each page has only one ig. And we need the page id to get page acceess token then send message through ig
				},
			},
		});
	};

	const callGetSocialAccountList = async () => {
		await getSocialAccountList();
	};

	const callRemoveSocialAccount = async (id :string) => {
		let result = await removeSocialAccount({
			variables: {
				fbAccount: {
					id : id
				},
			},
		});

		if (regex.test(result.data.removeSocialAccount)){
			toast({
				title: "Successfully removed.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Failed to removed.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
		await callGetSocialAccountList();
	};

	const closeModal = async () => {
		setActiveStep(0);
		setAccessToken("");
		setFbPageId("");
		setInstaId("");
		if (activeStep === 2) {
			await getSocialAccountList();
		}
		setModalOpen(false);
	};

	return (
		<>
			<Box p={8}>
				<SimpleGrid
					columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
					spacing={10}
				>
					{getSocialAccountListData ? (
						getSocialAccountListData.map((socialAccount) => {
							return (
								<SocialAccountDisplayItem
									socialAccount={socialAccount}
									onClickItem={callRemoveSocialAccount}
								/>
							);
						})
					) : (
						<></>
					)}

					<SocialMediaCard
						heading={"Add Instagram account"}
						icon={<Icon as={AddIcon} w={10} h={10} />}
						onClick={addSocialMedia}
					/>
				</SimpleGrid>
			</Box>
			<Modal
				size="lg"
				onClose={() => {
					closeModal();
				}}
				isOpen={isModalOpen}
				scrollBehavior={"inside"}
				closeOnOverlayClick={false}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add new social account</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stepper index={activeStep}>
							{steps.map((step, index) => (
								<Step key={index}>
									<StepIndicator>
										<StepStatus
											complete={<StepIcon />}
											incomplete={<StepNumber />}
											active={<StepNumber />}
										/>
									</StepIndicator>

									<Box flexShrink="0">
										<StepTitle>{step.title}</StepTitle>
										<StepDescription>
											{step.description}
										</StepDescription>
									</Box>

									<StepSeparator />
								</Step>
							))}
						</Stepper>
						{activeStep === 0 ? (
							<SelectFbPagesForm
								getFbPagesData={getFbPagesData}
								getFbPagesError={getFbPagesError}
								getFbPagesLoading={getFbPagesLoading}
								selectedFbPageId={selectedFbPageId}
								setFbPageId={setFbPageId}
							/>
						) : activeStep === 1 ? (
							<SelectInstaForm
								getInstaAcctData={getInstaAcctData}
								getInstaAcctError={getInstaAcctError}
								getInstaAcctLoading={getInstaAcctLoading}
								selectedInstaId={selectedInstaId}
								setInstaId={setInstaId}
							/>
						) : (
							<AddSocialMediaResultForm
								dataResponse={dataResponse}
								createLoading={createLoading}
								createError={createError}
							/>
						)}
					</ModalBody>
					<ModalFooter>
						<Stack direction={"row"} spacing="4">
							<Button
								colorScheme={"red"}
								onClick={() => {
									closeModal();
								}}
							>
								Close
							</Button>
							<Button colorScheme={"green"} onClick={handleNext}>
								Next
							</Button>
						</Stack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

interface SocialMediaCardProps {
	heading: string;
	icon: ReactElement;
	onClick: () => void;
}
const SocialMediaCard = ({ heading, icon, onClick }: SocialMediaCardProps) => {
	return (
		<Box>
			<Center
				borderWidth="1px"
				borderRadius="lg"
				borderColor={color2}
				borderStyle={"dashed"}
				overflow="hidden"
				p={5}
				cursor="pointer"
				_hover={{
					bg: color2,
				}}
				onClick={onClick}
				maxW={200}
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
				</Stack>{" "}
			</Center>
		</Box>
	);
};
