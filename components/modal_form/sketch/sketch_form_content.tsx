import {
	Grid,
	Box,
	Image,
	Flex,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from "@chakra-ui/react";
import FileSaver from "file-saver";
import { useEffect, useState } from "react";
import { SketchInput } from "../../../graphql/API";

interface SketchFormContentProps {
	sketch?: SketchInput;
	isModalOpen: boolean;
	closeModal: () => void;
}

export default function SketchFormContent(props: SketchFormContentProps) {
	const [generatedImg, setGeneratedImg] = useState<string[]>([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedImage, setSelectedImage] = useState<string>("");

	useEffect(() => {
		if (props.sketch) {
			// Assuming props.sketch.generatedImages is of type (string | null)[] | null | undefined
			const generatedImages = props.sketch.generatedImages;

			// Filter out null values and ensure the result is always a string array.
			// Use 'Boolean' as a type guard to filter out null values.
			const validImages: string[] = (generatedImages || []).filter(
				Boolean
			) as string[];

			setGeneratedImg([props.sketch.rawSketchImgPath!, ...validImages]);
		}
	}, [props.sketch]);

	const handleImageClick = (url: string) => {
		setSelectedImage(url);
		onOpen();
	};

	const downloadImage = async (url: string, index?: number) => {
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);

			const imageBlob = await response.blob();
			const imageURL = URL.createObjectURL(imageBlob);

			const link = document.createElement("a");
			link.href = imageURL;
			link.download = `image${index ? index : ""}`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			// It's a good practice to revoke the object URL after usage
			URL.revokeObjectURL(imageURL);
		} catch (error) {
			console.error("Error downloading image:", error);
		}
	};

	return (
		<Flex justifyContent="center">
			<Grid
				templateColumns={{
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
					lg: "repeat(4, 1fr)",
				}}
				gap={6}
			>
				{generatedImg.map((url, index) => (
					<Box key={index} boxSize="sm" position="relative">
						<Image
							src={url}
							alt={`Image ${index}`}
							objectFit="cover"
							borderRadius="md"
							onClick={() => handleImageClick(url)}
							_hover={{ opacity: 0.7 }}
						/>
						<Button
							colorScheme="blue"
							position="absolute"
							top="50%"
							left="50%"
							transform="translate(-50%, -50%)"
							opacity={0}
							_groupHover={{ opacity: 1 }}
							onClick={() => downloadImage(url, index)}
						>
							Download
						</Button>
					</Box>
				))}
			</Grid>

			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Image Preview</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Image src={selectedImage} alt="Selected Image" />
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => downloadImage(selectedImage)}
						>
							Download Image
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
}
