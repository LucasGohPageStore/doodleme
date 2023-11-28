import { Center, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { AiOutlineInbox } from "react-icons/ai";
import { NoteItem } from "../../graphql/API";
import { useGetNoteItemList } from "../../hooks/useSyncNoteItem";
import CustomizedListItem from "./list_item";

interface SubscriptionListProps {
	getNoteItemList: any;
	getNoteItemListLoading: boolean;
	getNoteItemListData?: NoteItem[];
	getNoteItemListError: any;
	setModalOpen: (isOpen: boolean) => void;
	setNoteItemId: (id: string) => void;
}

export default function SubscriptionList(props: SubscriptionListProps) {
	useEffect(() => {
		handleGet();
	}, []);

	const handleGet = async () => {
		let result = await props.getNoteItemList();
		console.log(result);
	};

	if (props.getNoteItemListLoading) {
		return (
			<Center>
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
			</Center>
		);
	}

	if (!props.getNoteItemListData) {
		return (
			<Stack p={4} spacing={"3"}>
				<Center>
					<Icon as={AiOutlineInbox} w={20} h={20} />
				</Center>
				<Center>
					<Text colorScheme={"facebook"}>
						Empty subscription List
					</Text>
				</Center>
			</Stack>
		);
	}

	if (props.getNoteItemListError) {
		console.error(props.getNoteItemListError);

		return (
			<Center>
				<Text color={"gray.500"}>No subcriptions found:(</Text>
			</Center>
		);
	}
	console.log(props.getNoteItemListData);
	return (
		<>
			{props.getNoteItemListData?.map((item) => (
				<CustomizedListItem
					noteItem={item}
					setModalOpen={props.setModalOpen}
					setNoteItemId={props.setNoteItemId}
					getNoteItemList={props.getNoteItemList}
				/>
			))}
		</>
	);
}
