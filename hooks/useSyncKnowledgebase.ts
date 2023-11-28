import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { CognitoUser, Knowledgebase } from "../graphql/API";
import {
	getKnowledgebaseById,
	getKnowledgebaseByUser,
} from "../graphql/queries";
import { deleteKnowledgebase } from "../graphql/mutations";

export const useGetKnowledgebaseListByUser = () => {
	const [call, { loading, error, data }] = useLazyQuery<{
		getKnowledgebaseByUser: Knowledgebase[];
	}>(gql(getKnowledgebaseByUser), {
		fetchPolicy: "no-cache",
	});

	return {
		getKnowledgebaseList: call,
		getKnowledgebaseListData: data?.getKnowledgebaseByUser,
		getKnowledgebaseListLoading: loading,
		getKnowledgebaseListError: error,
	};
};


export const useGetKnowledgebaseById = () => {
	const [call, { loading, error, data }] = useLazyQuery<{
		getKnowledgebaseById: Knowledgebase;
	}>(gql(getKnowledgebaseById), {
		fetchPolicy: "no-cache",
	});

	return {
		getKnowledgebase: call,
		getKnowledgebaseData: data?.getKnowledgebaseById,
		getKnowledgebaseLoading: loading,
		getKnowledgebaseError: error,
	};
};


export const useDeleteKnowledgebase = () => {
	const [call, { data, loading, error }] = useMutation(gql(deleteKnowledgebase), {
		fetchPolicy: "no-cache",
	});

	return {
		deleteKnowledgebase: call,
		dataResponse: data,
		deleteKnowledgebaseLoading: loading,
		deleteKnowledgebaseError: error,
	};
};



