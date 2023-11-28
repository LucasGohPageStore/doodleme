import useSWR from "swr";
import { ChatbotInput, KnowledgebaseInput, SketchInput } from "../graphql/API";
import axios from "axios";
import { Auth } from "aws-amplify";
import { Signer } from "aws-appsync-auth-link/lib/signer/signer";
import { config } from "../deployment/config";
import {
	UseMutationResult,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

const scrapeLinksFunctionUrl =
	"https://ekkxx56h5umh66ipvoi2ellhtu0kbaja.lambda-url.us-east-1.on.aws/";

const scrapeFilesFunctionUrl =
	"https://ggmqhuh2rokxchnywnlirpcr440npoxz.lambda-url.us-east-1.on.aws/";

const createKnowledgebaseFromLinkFunctionUrl =
	"https://lj22zbulqkomegkskxqqu2ffdm0pnwag.lambda-url.us-east-1.on.aws/";

const genSketchFunctionUrl =
	"https://cjhalsc3xkl7w3kv634ud5z7xa0mkxwd.lambda-url.us-east-1.on.aws/";

const scrapeLinks = async (data: ChatbotInput) => {
	const credentials = await Auth.currentCredentials();
	const session = (await Auth.currentSession()) as any;

	await Signer.sign(
		{
			url: scrapeLinksFunctionUrl,
			region: config.REGION,
			service: "lambda",
			method: "GET",
			body: JSON.stringify(data),
		},
		{
			access_key: credentials.accessKeyId,
			secret_key: credentials.secretAccessKey,
			session_token: credentials.sessionToken,
		}
	);

	const response = await axios({
		url: scrapeLinksFunctionUrl,
		method: "POST",
		headers: {
			"x-jwt-identity-token": session.accessToken.jwtToken,
		},
		data,
	});

	return response;
};

const createKnowledgebaseFromLink = async (data: any) => {
	const credentials = await Auth.currentCredentials();
	const session = (await Auth.currentSession()) as any;

	await Signer.sign(
		{
			url: createKnowledgebaseFromLinkFunctionUrl,
			region: config.REGION,
			service: "lambda",
			method: "GET",
			body: JSON.stringify(data),
		},
		{
			access_key: credentials.accessKeyId,
			secret_key: credentials.secretAccessKey,
			session_token: credentials.sessionToken,
		}
	);

	const response = await axios({
		url: createKnowledgebaseFromLinkFunctionUrl,
		method: "POST",
		headers: {
			"x-jwt-identity-token": session.accessToken.jwtToken,
		},
		data,
	});

	return response;
};

const scrapeFiles = async (data: any) => {
	const credentials = await Auth.currentCredentials();
	const session = (await Auth.currentSession()) as any;

	await Signer.sign(
		{
			url: scrapeFilesFunctionUrl,
			region: config.REGION,
			service: "lambda",
			method: "GET",
			body: JSON.stringify(data),
		},
		{
			access_key: credentials.accessKeyId,
			secret_key: credentials.secretAccessKey,
			session_token: credentials.sessionToken,
		}
	);

	const response = await axios({
		url: scrapeFilesFunctionUrl,
		method: "POST",
		headers: {
			"x-jwt-identity-token": session.accessToken.jwtToken,
		},
		data,
	});

	return response;
};

const genSketch = async (data: any) => {
	const credentials = await Auth.currentCredentials();
	const session = (await Auth.currentSession()) as any;

	await Signer.sign(
		{
			url: genSketchFunctionUrl,
			region: config.REGION,
			service: "lambda",
			method: "GET",
			body: JSON.stringify(data),
		},
		{
			access_key: credentials.accessKeyId,
			secret_key: credentials.secretAccessKey,
			session_token: credentials.sessionToken,
		}
	);

	const response = await axios({
		url: genSketchFunctionUrl,
		method: "POST",
		headers: {
			"x-jwt-identity-token": session.accessToken.jwtToken,
		},
		data,
	});

	return response;
};

export function useScrapeLinks(): UseMutationResult<
	any,
	Error,
	KnowledgebaseInput,
	unknown
> {
	const queryClient = useQueryClient();

	return useMutation((data: KnowledgebaseInput) => scrapeLinks(data));
}

export function useCreateKnowledgebaseLink(): UseMutationResult<
	any,
	Error,
	KnowledgebaseInput,
	unknown
> {
	const queryClient = useQueryClient();

	return useMutation((data: KnowledgebaseInput) =>
		createKnowledgebaseFromLink(data)
	);
}

export function useScrapeFiles(): UseMutationResult<
	any,
	Error,
	KnowledgebaseInput,
	unknown
> {
	const queryClient = useQueryClient();

	return useMutation((data: KnowledgebaseInput) => scrapeFiles(data));
}

export function useGenSketch(): UseMutationResult<
	any,
	Error,
	SketchInput,
	unknown
> {
	const queryClient = useQueryClient();

	return useMutation((data: SketchInput) => genSketch(data));
}
