import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { createChatbot, deleteChatbot } from "../graphql/mutations";
import { Chatbot } from "../graphql/API";
import { getChatbotByUser } from "../graphql/queries";

export const useCreateChatbot = () => {
	const [call, { data, loading, error }] = useMutation(gql(createChatbot), {
		fetchPolicy: "no-cache",
	});

	return {
		createChatbot: call,
		dataResponse: data,
		createLoading: loading,
		createError: error,
	};
};

export const useGetChatbotListByUser = () => {
	const [call, { loading, error, data }] = useLazyQuery<{
		getChatbotByUser: Chatbot[];
	}>(gql(getChatbotByUser), {
		fetchPolicy: "no-cache",
	});

	return {
		getChatbotList: call,
		getChatbotListData: data?.getChatbotByUser,
		getChatbotListLoading: loading,
		getChatbotListError: error,
	};
};

export const useDeleteChatbot = () => {
	const [call, { data, loading, error }] = useMutation(gql(deleteChatbot), {
		fetchPolicy: "no-cache",
	});

	return {
		deleteChatbot: call,
		dataResponse: data,
		deleteChatbotLoading: loading,
		deleteChatbotError: error,
	};
};
