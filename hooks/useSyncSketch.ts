import { gql, useLazyQuery } from "@apollo/client";
import { Chatbot, PresignedUrlResponse } from "../graphql/API";
import { getImageUploadURL } from "../graphql/queries";

export const useGetImageUploadUrl = () => {
	const [call, { loading, error, data }] = useLazyQuery<{
		getImageUploadURL: PresignedUrlResponse;
	}>(gql(getImageUploadURL), {
		fetchPolicy: "no-cache",
	});

	return {
		getImageUploadURL: call,
		getImageUploadURLData: data?.getImageUploadURL,
		getImageUploadURLLoading: loading,
		getImageUploadURLError: error,
	};
};
