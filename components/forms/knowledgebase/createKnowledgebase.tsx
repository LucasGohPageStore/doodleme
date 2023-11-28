import {
	Icon,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Tag,
} from "@chakra-ui/react";

import UploadDocumentForm from "./uploadDocumentForm";
import UploadWebsiteForm from "./uploadWebsiteForm";
import { useGetKnowledgebaseById } from "../../../hooks/useSyncKnowledgebase";
import { Knowledgebase, KnowledgebaseContent } from "../../../graphql/API";
import { FaFilePdf, FaGlobe, FaFile } from "react-icons/fa";
import {
	pdfScrapeSource,
	websiteScrapeSource,
} from "../../../lib/utils/constants/constants";
import { isValidURL } from "../../../lib/utils/utils";

interface CreateKnowledgebaseFormProps {
	knowledgebase?: Knowledgebase;
	closeModal: () => void;
	getKnowledgebaseList: () => void;
}

export default function CreateKnowledgebaseForm(
	props: CreateKnowledgebaseFormProps
) {
	const selectDefaultIndex = () => {
		if (!props.knowledgebase) {
			return 0;
		}

		const { sourceType, content } = props.knowledgebase;

		switch (sourceType) {
			case pdfScrapeSource:
				return 0;
			case websiteScrapeSource:
				return 1;
			default:
				const isUrl =
					content?.length &&
					isValidURL(content[0]?.contentName ?? "");
				return isUrl ? 1 : 0;
		}
	};

	const mapDataToForm = (formType: string): Knowledgebase | undefined => {
		if (!props.knowledgebase || props.knowledgebase === null) {
			return undefined;
		}

		const { sourceType, content } = props.knowledgebase;

		if (sourceType === formType) {
			return props.knowledgebase;
		}

		if (formType === pdfScrapeSource) {
			const isUrl =
				content?.length && isValidURL(content[0]?.contentName ?? "");
			return isUrl ? undefined : props.knowledgebase;
		}

		if (formType === websiteScrapeSource) {
			const isUrl =
				content?.length && isValidURL(content[0]?.contentName ?? "");
			return isUrl ? props.knowledgebase : undefined;
		}

		return undefined;
	};

	return (
		<>
			<Tabs
				isFitted
				variant="soft-rounded"
				defaultIndex={selectDefaultIndex()}
			>
				<TabList mb="1em">
					<Tab>Documents</Tab>
					<Tab>Website (Coming soon)</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<UploadDocumentForm
							knowledgebase={mapDataToForm(pdfScrapeSource)}
							closeModal={props.closeModal}
							refreshKnowledgebaseList={props.getKnowledgebaseList}
						/>
					</TabPanel>
					<TabPanel>
						<UploadWebsiteForm
							knowledgebase={mapDataToForm(websiteScrapeSource)}
						/>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	);
}
