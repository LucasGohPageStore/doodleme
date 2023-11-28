/**
 * Add your hosted dev URL here
 */
const HOSTED_URL = "https://main.d279yzk6mjs0pd.amplifyapp.com/";

const configDevelopment = {
	HOSTED_URL,
	MODE: "DEVELOPMENT",
	REGION: "us-east-1",
	REDIRECT_SIGN_IN: `${HOSTED_URL}/`,
	REDIRECT_SIGN_OUT: `${HOSTED_URL}/signout/`,
	AUTHENTICATION_TYPE: "AWS_IAM" as const,

	/**
	 * Add the details from the Pulumi output here, after running 'pulumi up'
	 */
	// appSyncID: "dfguegtxrbdg3jir7wpfheqvou",
	// dynamoID: "users-01cea49",
	// graphQLEndpoint: {
	// 	GRAPHQL:
	// 		"https://54rkqanxqzfmlkxov2s6cslyxu.appsync-api.us-east-1.amazonaws.com/graphql",
	// 	REALTIME:
	// 		"wss://54rkqanxqzfmlkxov2s6cslyxu.appsync-realtime-api.us-east-1.amazonaws.com/graphql",
	// },
	// identityPoolID: "us-east-1:10793358-b7a5-407d-ae65-278111c1630b",
	// userpoolClientID: "5g9d6sidab0niucmd1avmcjb6s",
	// userpoolID: "us-east-1_hjIlvWFB7",

	USER_POOL_CLIENT_ID: "5dndrvpg6gfgls91ju3bfnkl7o",
	USER_POOL_ID: "us-east-1_r8kTtyMAd",
	IDENTITY_POOL_ID: "us-east-1:735fb747-24c7-4e31-92d0-450183a13b17",
	GRAPHQL_ENDPOINT: "https://hawadampc5birdqviizxbvuxmi.appsync-api.us-east-1.amazonaws.com/graphql",
};

export default configDevelopment;
