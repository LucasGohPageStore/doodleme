// App.tsx
import React, { useCallback, useState, useRef, useEffect } from "react";
import { Stage, Layer, Line, Rect } from "react-konva";
import Konva from "konva";
import {
	Box,
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Stack,
	useBreakpointValue,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import {
	FaEraser,
	FaPaintBrush,
	FaRedo,
	FaTrash,
	FaUndo,
} from "react-icons/fa";
import { useGetImageUploadUrl } from "../hooks/useSyncSketch";
import axios from "axios";
import { useGenSketch } from "../restapi/rest-api";
import { getRandomStyle, getRandomTitle } from "../lib/utils/utils";
import ReviewSketchFormProps from "../components/modal_form/sketch/review_sketch_form";
import DashboardTemplate from "../components/page_frame/dashboardTemplate";

interface LineInfo {
	tool: string;
	points: number[];
	color: string;
	size: number;
}

const DrawingApp: React.FC = () => {
	const toast = useToast();

	const [lines, setLines] = useState<LineInfo[]>([]);
	const [tool, setTool] = useState<string>("brush");
	const [color, setColor] = useState<string>("#000000");
	const [size, setSize] = useState<number>(5);
	const [isDrawing, setIsDrawing] = useState<boolean>(false);
	const stageRef = useRef<Konva.Stage>(null);
	const stageContainerRef = useRef<HTMLDivElement>(null);
	const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
	const maxWidth = 500; // Set your desired max width here
	const maxHeight = 500; // Set your desired max height here
	const [history, setHistory] = useState<LineInfo[][]>([[]]);
	const [historyStep, setHistoryStep] = useState<number>(0);
	const [redoStack, setRedoStack] = useState<LineInfo[][]>([]);
	const [isModalOpen, setModalOpen] = useState(false);
	const [sketch, setSketch] = useState();
	const [isGeneratingLoading, setGeneratingLoading] =
		useState<boolean>(false);

	const [title, setTitle] = useState({
		value: "",
		isValid: true,
		message: "",
	});

	const {
		mutate: mutateGenSketch,
		isLoading: isGenSketchLoading,
		data: imageData,
	} = useGenSketch();

	const {
		getImageUploadURL,
		getImageUploadURLData,
		getImageUploadURLError,
		getImageUploadURLLoading,
	} = useGetImageUploadUrl();

	const updateStageSize = () => {
		if (stageContainerRef.current) {
			const containerWidth = stageContainerRef.current.offsetWidth;
			const containerHeight = stageContainerRef.current.offsetHeight;

			// Calculate the size while maintaining a 1:1 aspect ratio
			let size = Math.min(
				containerWidth,
				containerHeight,
				maxWidth,
				maxHeight
			);
			setStageSize({ width: size, height: size });
		}
	};

	useEffect(() => {
		initForm();
		updateStageSize();
		const resizeObserver = new ResizeObserver(() => updateStageSize());
		resizeObserver.observe(stageContainerRef.current!);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
		setIsDrawing(true);
		const stage = stageRef.current;
		if (!stage) return;

		const point = stage.getPointerPosition();
		if (!point) return;

		// Initialize a new line with a single set of points to represent a dot
		const newLine: LineInfo = {
			tool,
			points: [point.x, point.y, point.x, point.y], // Duplicate the point to create a dot
			color: tool === "eraser" ? "#FFFFFF" : color,
			size: tool === "eraser" ? 30 : size,
		};
		setLines([...lines, newLine]);
	};

	const handleTouchStart = (e: Konva.KonvaEventObject<TouchEvent>) => {
		setIsDrawing(true);
		const stage = stageRef.current;
		if (!stage) return;

		const point = stage.getPointerPosition();
		if (!point) return;

		// Initialize a new line with a single set of points to represent a dot
		const newLine: LineInfo = {
			tool,
			points: [point.x, point.y, point.x, point.y], // Duplicate the point to create a dot
			color: tool === "eraser" ? "#FFFFFF" : color,
			size: tool === "eraser" ? 30 : size,
		};
		setLines([...lines, newLine]);
	};

	const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
		if (!isDrawing) return;
		const stage = stageRef.current;
		if (!stage) return;

		const point = stage.getPointerPosition();
		if (!point) return;

		let lastLine = lines[lines.length - 1];
		lastLine.points = lastLine.points.concat([point.x, point.y]);

		setLines(lines.concat());
	};

	const handleTouchMove = (e: Konva.KonvaEventObject<TouchEvent>) => {
		if (!isDrawing) return;
		const stage = stageRef.current;
		if (!stage) return;

		const point = stage.getPointerPosition();
		if (!point) return;

		let lastLine = lines[lines.length - 1];
		lastLine.points = lastLine.points.concat([point.x, point.y]);

		setLines(lines.concat());
	};

	const handleMouseUp = () => {
		setIsDrawing(false);
		addToHistory(lines);
	};

	const addToHistory = (newLines: LineInfo[]) => {
		// Only take the history up to the current step to overwrite any future history if redo was used
		const newHistory = history.slice(0, historyStep + 1);
		setHistory([...newHistory, newLines]);
		setHistoryStep(newHistory.length); // Increment the step to the new snapshot
		setRedoStack([]); // Clear the redo stack whenever a new action is recorded
	};

	const undo = () => {
		if (historyStep > 0) {
			const prevHistory = history[historyStep - 1] || [];
			setLines(prevHistory);
			setHistoryStep(historyStep - 1);
			// Add the current lines to the redo stack
			setRedoStack([lines, ...redoStack]);
		}
	};

	const redo = () => {
		if (redoStack.length > 0) {
			const [nextLines, ...newRedoStack] = redoStack;
			setLines(nextLines);
			setRedoStack(newRedoStack);
			// Add the previous lines to the history
			setHistory([...history, nextLines]);
			setHistoryStep(historyStep + 1);
		}
	};

	const clear = () => {
		// Save current lines before clearing for undo action
		addToHistory([]);
		setLines([]);
	};

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

	const getImageUploaderPath = async () => {
		setGeneratingLoading(true);

		if (!title.value) {
			setTitle({
				value: "",
				isValid: false,
				message: "The title cannot be empty",
			});
			return;
		}

		try {
			const uploadPath = await getUploadPath();
			if (!uploadPath) {
				throw new Error("Failed to get upload path.");
			}

			const imageBytes = await getImageBytes();
			await uploadImageAndGenerateSketch(imageBytes, uploadPath);
		} catch (error) {
			toast({
				title: "Failed to generate image.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			setGeneratingLoading(false);
		}
	};

	const getUploadPath = async () => {
		const response = await getImageUploadURL({
			variables: {
				presignedUrlRequest: {
					count: 1,
					mediaType: "SKETCH_FILE",
				},
			},
		});

		return response.data?.getImageUploadURL.uploadUrls?.[0] ?? "";
	};

	const getImageBytes = async () => {
		const imageBase64 = stageRef.current?.toDataURL({
			width: stageSize.width,
			height: stageSize.height,
		});
		const base64WithoutPrefix = imageBase64?.split(",")[1];
		return Buffer.from(base64WithoutPrefix ?? "", "base64");
	};

	const uploadImageAndGenerateSketch = async (
		imageBytes: Buffer,
		uploadPath: string
	) => {
		await uploadImage(imageBytes, uploadPath);

		const s3FilePath = extractS3FilePath(uploadPath);
		const style = getRandomStyle();

		mutateGenSketch(
			{
				rawSketchImgPath: s3FilePath,
				prompt: `${title.value}, ${style}`,
				object: title.value,
				style: style,
			},
			{
				onSuccess: (response) => {
					setSketch(response.data);
					setModalOpen(true);
					setGeneratingLoading(false);
				},
				onError: (error) => {
					console.error(error);
					setGeneratingLoading(false);
				},
			}
		);
	};

	const extractS3FilePath = (uploadPath: string) => {
		const regex = new RegExp("s3.amazonaws.com/(.+?)\\?");
		const match = regex.exec(uploadPath);
		return match ? match[1] : "";
	};

	const uploadImage = async (
		imageBytes: Buffer,
		presignedUrl: string
	): Promise<{ isSuccess: boolean; message?: string }> => {
		try {
			await axios.put(presignedUrl, imageBytes, {
				headers: { "Content-Type": "image/png" },
			});
			return { isSuccess: true };
		} catch (error: any) {
			// Error handling: logging the error or custom error messages can be added here
			console.error(error.message || error);
			return { isSuccess: false, message: "Error uploading image" };
		}
	};

	const refreshTitle = async () => {
		setTitle({
			value: getRandomTitle(),
			message: "",
			isValid: true,
		});
	};

	const closeModal = async () => {
		setModalOpen(false);
	};

	const initForm = () => {
		setTitle({
			value: getRandomTitle(),
			message: "",
			isValid: true,
		});
	};

	function MyToolbar() {
		// Adjust the size of the icons based on the screen width
		const iconSize = useBreakpointValue({ base: "sm", md: "md" });
		const spacing = useBreakpointValue({ base: 2, md: 4 });
		const sliderSize = useBreakpointValue({ base: "200px", md: "300px" });

		return (
			<Stack
				direction={"row"}
				spacing={spacing}
				justify="center"
				align="center"
			>
				<IconButton
					icon={<FaPaintBrush />}
					size={iconSize}
					isRound
					aria-label="Brush"
					onClick={() => setTool("brush")}
					colorScheme="twitter"
				/>
				<IconButton
					icon={<FaEraser />}
					size={iconSize}
					isRound
					aria-label="Eraser"
					onClick={() => setTool("eraser")}
					colorScheme="twitter"
				/>
				<IconButton
					icon={<FaUndo />}
					size={iconSize}
					isRound
					aria-label="Undo"
					onClick={undo}
					colorScheme="twitter"
				/>
				<IconButton
					icon={<FaRedo />}
					size={iconSize}
					isRound
					aria-label="Redo"
					onClick={redo}
					colorScheme="twitter"
				/>
				<IconButton
					icon={<FaTrash />}
					size={iconSize}
					isRound
					aria-label="Clear"
					onClick={clear}
					colorScheme="twitter"
				/>
				<Slider
					aria-label="brush-size"
					defaultValue={size}
					min={1}
					max={30}
					onChange={(val) => setSize(val)}
					width={sliderSize}
					colorScheme="twitter"
				>
					<SliderTrack>
						<SliderFilledTrack />
					</SliderTrack>
					<SliderThumb />
				</Slider>
				{/* <Input
					type="color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
					w={{ base: "36px", md: "44px" }} // Adjust the width for different screen sizes
					h={{ base: "36px", md: "44px" }} // Adjust the height for different screen sizes
					p={0} // Remove padding to make the color picker more compact
					colorScheme="twitter"
				/> */}
			</Stack>
		);
	}

	return (
		<DashboardTemplate>
			<Center
				w="100vw"
				h="100vh"
				bgGradient="linear(135deg, #FDE2F3 0%, #FFFFFF 100%)"
			>
				<Box
					width={{ base: "90%", md: "70%" }}
					height="70%"
					ref={stageContainerRef}
				>
					<Stack spacing={4}>
						{MyToolbar()}
						<Center>
							<Stage
								width={stageSize.width}
								height={stageSize.height}
								onMouseDown={handleMouseDown}
								onMouseMove={handleMouseMove}
								onMouseUp={handleMouseUp}
								onTouchStart={handleTouchStart}
								onTouchMove={handleTouchMove}
								onTouchEnd={handleMouseUp}
								ref={stageRef}
								style={{
									border: "2px solid black",
									borderRadius: "8px",
								}}
							>
								<Layer>
									<Rect
										x={0}
										y={0}
										width={stageSize.width}
										height={stageSize.height}
										fill="white"
									/>
								</Layer>
								<Layer>
									{lines.map((line, i) => (
										<Line
											key={i}
											points={line.points}
											stroke={line.color}
											strokeWidth={line.size}
											tension={0.5}
											lineCap="round"
											lineJoin="round"
											globalCompositeOperation={
												line.tool === "eraser"
													? "destination-out"
													: "source-over"
											}
										/>
									))}
								</Layer>
							</Stage>
						</Center>
						<FormControl isRequired isInvalid={!title.isValid}>
							<Center>
								<InputGroup width={stageSize.width}>
									<Input
										type={"text"}
										isInvalid={!title.isValid}
										placeholder="Enter title"
										onChange={setInput(setTitle)}
										defaultValue={title.value}
										isDisabled={true}
									/>
									<InputRightElement
										width="6.5rem"
										padding={2}
									>
										<Stack direction={"row"} spacing={2}>
											<IconButton
												icon={<FaRedo />}
												h="1.75rem"
												size="sm"
												isRound
												aria-label="RefreshTitle"
												onClick={refreshTitle}
												colorScheme="teal"
											/>
											<Button
												h="1.75rem"
												size="sm"
												onClick={getImageUploaderPath}
												isLoading={isGeneratingLoading}
											>
												Generate
											</Button>
										</Stack>
									</InputRightElement>
									<FormErrorMessage>
										{" "}
										{title.message}
									</FormErrorMessage>
								</InputGroup>
							</Center>
						</FormControl>
					</Stack>
					<ReviewSketchFormProps
						isModalOpen={isModalOpen}
						closeModal={closeModal}
						sketch={sketch}
					/>
				</Box>
			</Center>
		</DashboardTemplate>
	);
};

export default DrawingApp;
