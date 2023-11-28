import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { CognitoUser } from "../graphql/API";
import { updateCognitoUser } from "../graphql/mutations";
import { getCognitoUser } from "../graphql/queries";

export const useGetUser = () => {
	const [call, { loading, error, data }] = useLazyQuery<{
		getCognitoUser: CognitoUser;
	}>(gql(getCognitoUser), {
		fetchPolicy: "no-cache",
	});

	return {
		getUser: call,
		getUserData: data?.getCognitoUser,
		getUserLoading: loading,
		getUserError: error,
	};
};

export const useUpdateUser = () => {
	const [call, { data, loading, error }] = useMutation(
		gql(updateCognitoUser),
		{
			fetchPolicy: "no-cache",
		}
	);

	return {
		updateUser: call,
		dataResponse: data,
		updateLoading: loading,
		updateError: error,
	};
};
