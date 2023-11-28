import {
	Box,
	Container,
	Text,
	Button,
	Stack,
	Center,
	Spinner,
	useColorModeValue,
	Flex,
	Spacer,
	useDisclosure,
	Drawer,
	DrawerContent,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import DashboardNav from "../nav/dashboardNav";
import SidebarContent from "../sidebar/chatbot_panel_sidebar";

interface DashboardTemplateProps {
	children: ReactNode;
}

export default function DashboardTemplate(props : DashboardTemplateProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose}/>
				</DrawerContent>
			</Drawer>
			<DashboardNav onOpen={onOpen} />
			{props.children}
		</>
	);
}
