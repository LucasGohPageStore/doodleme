import {
	Box,
	Button,
	ButtonGroup,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverHeader,
} from "@chakra-ui/react";
import { useState } from "react";

interface ConfirmationPopoverProps {
	onOk: () => void;
	onCancel: () => void;
	title: string;
	description: string;
}

export default function ConfirmationPopover(props: ConfirmationPopoverProps) {
	const [isOKloading, setOKLoading] = useState(false);

	const handleOk = async () => {
		console.log("delete loading")
		setOKLoading(true);
		props.onOk();
		await new Promise(f => setTimeout(f, 1000));
		setOKLoading(false);

	};

	return (
		<PopoverContent color="white" bg="blue.800" borderColor="blue.800">
			<PopoverHeader pt={4} fontWeight="bold" border="0">
				{props.title}
			</PopoverHeader>
			<PopoverArrow />
			<PopoverCloseButton onClick={props.onCancel} />
			<PopoverBody>{props.description}</PopoverBody>
			<PopoverFooter
				border="0"
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				pb={4}
			>
				<ButtonGroup size="sm">
					<Button colorScheme="yellow" onClick={props.onCancel}>
						Cancel
					</Button>

					<Button
						colorScheme="red"
						onClick={handleOk}
						isLoading={isOKloading}
					>
						OK
					</Button>
				</ButtonGroup>
			</PopoverFooter>
		</PopoverContent>
	);
}
