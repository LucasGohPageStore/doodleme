import {
	Grid,
	Box,
	Image,
	Flex,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
	SketchInput,
} from "../../../graphql/API"

interface SketchFormContentProps {
	sketch?: SketchInput;
	isModalOpen: boolean;
	closeModal: () => void;
}

export default function SketchFormContent(props: SketchFormContentProps) {
	const toast = useToast();
	const [generatedImg, setGeneratedImg] = useState<string[]>([]);

	const initForm = () => {
		if (!props.sketch) {
			return;
		}
		// Assuming props.sketch.generatedImages is of type (string | null)[] | null | undefined
		const generatedImages = props.sketch.generatedImages;

		// Filter out null values and ensure the result is always a string array.
		// If generatedImages is null or undefined, default to an empty array.
		const validImages = (generatedImages || []).filter(
			(img): img is string => img !== null
		);

		setGeneratedImg([props.sketch.rawSketchImgPath!, ...validImages]);
	};

	useEffect(() => {
		initForm();
	}, [props.sketch]);
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
					<Box key={index} boxSize="sm">
						<Image
							src={url}
							alt={`Image ${index}`}
							objectFit="cover"
							borderRadius="md"
						/>
					</Box>
				))}
			</Grid>
		</Flex>
	);
}
