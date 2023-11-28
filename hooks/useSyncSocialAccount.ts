import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { FbAccount } from "../graphql/API";

import {
	getFbPages,
	getInstaAcct,
	getSocialAccount,
	getSocialAccountList,
} from "../graphql/queries";
import { createSocialAccount, removeSocialAccount, updateSocialAccount } from "../graphql/mutations";

export const useGetSocialAccountList = () => {
	const [call, { loading, error, data }] = useLazyQuery<{
		getSocialAccountList: FbAccount[];
	}>(gql(getSocialAccountList), {
		fetchPolicy: "no-cache",
	});

	return {
		getSocialAccountList: call,
		getSocialAccountListData: data?.getSocialAccountList,
		getSocialAccountListLoading: loading,
		getSocialAccountListError: error,
	};
};

export const useGetFbPages = () => {
	const [call, { loading, error, data }] = useLazyQuery<{
		getFbPages: FbAccount[];
	}>(gql(getFbPages), {
		fetchPolicy: "no-cache",
	});

	return {
		getFbPages: call,
		getFbPagesData: data?.getFbPages,
		getFbPagesLoading: loading,
		getFbPagesError: error,
	};
};

export const useGetInstaAccts = () => {
	const [call, { loading, error, data }] = useLazyQuery<{
		getInstaAcct: FbAccount[];
	}>(gql(getInstaAcct), {
		fetchPolicy: "no-cache",
	});

	return {
		getInstaAcct: call,
		getInstaAcctData: data?.getInstaAcct,
		getInstaAcctLoading: loading,
		getInstaAcctError: error,
	};
};

export const useCreateSocialAccount = () => {
	const [call, { data, loading, error }] = useMutation(
		gql(createSocialAccount),
		{
			fetchPolicy: "no-cache",
		}
	);

	return {
		createSocialAccount: call,
		dataResponse: data,
		createLoading: loading,
		createError: error,
	};
};

export const useRemoveSocialAccount = () => {
	const [call, { data, loading, error }] = useMutation(
		gql(removeSocialAccount),
		{
			fetchPolicy: "no-cache",
		}
	);

	return {
		removeSocialAccount: call,
		removeDataResponse: data,
		removeLoading: loading,
		removeError: error,
	};
};

export const useGetSocialAccount = () => {
	const [call, { loading, error, data }] = useLazyQuery<{
		getSocialAccount: FbAccount;
	}>(gql(getSocialAccount), {
		fetchPolicy: "no-cache",
	});

	return {
		getSocialAccount: call,
		getSocialAccountData: data?.getSocialAccount,
		getSocialAccountLoading: loading,
		getSocialAccountError: error,
	};
};

export const useUpdateSocialAccount = () => {
	const [call, { data, loading, error }] = useMutation(
		gql(updateSocialAccount),
		{
			fetchPolicy: "no-cache",
		}
	);

	return {
		updateSocialAccount: call,
		dataResponse: data,
		updateLoading: loading,
		updateError: error,
	};
};
