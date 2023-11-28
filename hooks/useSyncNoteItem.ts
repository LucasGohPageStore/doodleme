import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { CognitoUser, NoteItem } from "../graphql/API";
import { createNoteItem, updateNoteItem } from "../graphql/mutations";
import {
	getCognitoUser,
	getNoteItem,
	getNoteItemList,
} from "../graphql/queries";

export const useGetNoteItemList = () => {
	const [call, { loading, error, data }] = useLazyQuery<{
		getNoteItemList: NoteItem[];
	}>(gql(getNoteItemList), {
		fetchPolicy: "no-cache",
	});

	return {
		getNoteItemList: call,
		getNoteItemListData: data?.getNoteItemList,
		getNoteItemListLoading: loading,
		getNoteItemListError: error,
	};
};

export const useCreateNoteItem = () => {
	const [call, { data, loading, error }] = useMutation(gql(createNoteItem), {
		fetchPolicy: "no-cache",
	});

	return {
		createNoteItem: call,
		dataResponse: data,
		createLoading: loading,
		createError: error,
	};
};

export const useGetNoteItem = () => {
	const [call, { loading, error, data }] = useLazyQuery<{
		getNoteItem: NoteItem;
	}>(gql(getNoteItem), {
		fetchPolicy: "no-cache",
	});

	return {
		getNoteItem: call,
		getNoteItemData: data?.getNoteItem,
		getNoteItemLoading: loading,
		getNoteItemError: error,
	};
};

export const useUpdateNoteItem = () => {
	const [call, { data, loading, error }] = useMutation(
		gql(updateNoteItem),
		{
			fetchPolicy: "no-cache",
		}
	);

	return {
		updateNoteItem: call,
		dataResponse: data,
		updateLoading: loading,
		updateError: error,
	};
};
