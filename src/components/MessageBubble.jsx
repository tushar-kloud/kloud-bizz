import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import BounceLoader from "./BounceLoader/BounceLoader";
import Latex from "react-latex-next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import DescriptionIcon from "@mui/icons-material/Description";
import { styled } from "@mui/material/styles";

// Function to remove specific symbols from text
const formatText = (text) => {
	if (typeof text !== "string") {
		console.error("formatText: Expected a string but got", typeof text);
		return text;
	}
	const cleanedText = text
		.replace(/\*\*/g, "")
		.replace(/```/g, "")
		.replace(/#/g, "")
		.replace(/###/g, "");
	return cleanedText;
};

// Function to format mathematical expressions
const formatMath = (text) => {
	if (typeof text !== "string") {
		console.error("formatMath: Expected a string but got", typeof text);
		return <>{text}</>;
	}
	const paragraphs = text.split("\n\n");
	return (
		<div style={{ fontSize: "16px", lineHeight: "1.5" }}>
			{paragraphs.map((paragraph, index) => (
				<p key={index}  style={{ overflowX: "auto", maxWidth: "100%" }}>
					<Latex>{paragraph}</Latex>
				</p>
			))}
		</div>
	);
};

// Function to check if the message contains table markdown
const containsTable = (text) => {
	return /\|(.+)\|(.+)\|/.test(text);
};

// Custom Table styling component using styled from Material-UI
const StyledMarkdown = styled(ReactMarkdown)(({ theme }) => ({
	"& table": {
		width: "100%",
		borderCollapse: "separate", // Separate borders to enable rounded corners
		borderSpacing: "0", // Remove spacing between cells
		borderRadius: "8px", // Rounded corners for the table
		overflow: "hidden", // Hide overflow to keep corners rounded
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		boxShadow: theme.shadows[2], // Optional: add subtle shadow
	},
	"& th, & td": {
		border: `1px solid ${theme.palette.divider}`,
		padding: theme.spacing(1.2),
		textAlign: "left",
	},
	"& th": {
		backgroundColor: theme.palette.primary.main,
		// backgroundColor: 'grey',
		color: theme.palette.primary.contrastText,
		fontWeight: "bold",
	},
	"& td": {
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
	},
	"& tr:nth-of-type(even) td": {
		backgroundColor: theme.palette.action.hover,
	},
}));

// Function to render markdown content, including tables
const renderMarkdown = (text) => (
	<StyledMarkdown remarkPlugins={[remarkGfm]}>{text}</StyledMarkdown>
);

function MessageBubble({ message }) {
	const isUserMessage = message.sender === "user";
	const isError = message.error;
	const messageText = typeof message.text === "string" ? message.text : "";

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: isUserMessage ? "flex-end" : "flex-start",
				mb: 2,
				maxWidth: "100%",
				wordBreak: "break-word",
			}}
		>
			<Box
				sx={{
					maxWidth: "70%",
					px: 2,
					py: 0.8,
					borderRadius: 2,
					backgroundColor: isError
						? "#f44336"
						: isUserMessage
						? "#1976d2"
						: "#f5f5f5",
					color: isError ? "white" : isUserMessage ? "white" : "black",
					boxShadow: 3,
					overflowWrap: "break-word",
				}}
			>
				{message.isFile ? (
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1,
						}}
					>
						<Avatar sx={{ backgroundColor: "#e0e0e0" }}>
							<DescriptionIcon />
						</Avatar>
						<Typography variant="body1">{message.fileName}</Typography>
					</Box>
				) : message.loading ? (
					<Typography
						sx={{
							height: "30px",
							width: "auto",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<BounceLoader />
					</Typography>
				) : (
					<Typography
						variant="body1"
						sx={{
							wordBreak: "break-word",
							whiteSpace: "pre-wrap",
						}}
					>
						{isError ? (
							<Typography variant="body1" sx={{ fontSize: "14px" }}>
								Error: {messageText || "Something went wrong!"}
							</Typography>
						) : (
							<div>
								{containsTable(messageText)
									? renderMarkdown(messageText)
									: formatMath(formatText(messageText))}
							</div>
						)}
					</Typography>
				)}
			</Box>
		</Box>
	);
}

export default MessageBubble;
