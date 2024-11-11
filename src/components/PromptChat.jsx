import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
  Avatar,
  Chip,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import MessageBubble from "./MessageBubble";

const GPT4O_API_URL = import.meta.env.VITE_GPT4O_API_URL;
const GPT4O_API_KEY = import.meta.env.VITE_GPT4O_API_KEY;
const BUSINESS_BFA = import.meta.env.VITE_BUSINESS_BFA;

const PromptChat = ({ labData }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [conversationContext, setConversationContext] = useState([]);
  const [newFileContext, setNewFileContext] = useState(null);
  const [filesList, setFilesList] = useState([]);
  const [allowFileUpload, setAllowFileUpload] = useState(labData.file_upload || false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [fileLoadError, setFileLoadError] = useState(null);
  const [multipleFilesAllowed] = useState(labData.multiple_files || false);
  const [loadingContext, setLoadingContext] = useState(false); 
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() || selectedFiles.length > 0) {
      let newMessages = [...messages];
      let newContext = [
        ...conversationContext,
        { role: "user", content: messageInput },
      ];

      if (conversationContext.length === 0) {
        newContext = [
          {
            role: "system",
            content:
              "You are a helpful financial assistant who provides concise and accurate results after evaluating the context without extra irrelevant data using vocabulary suited for a financially knowledgeable person. If file context is available, provide specific answers from the context.",
          },
          ...newContext,
        ];
      }

      if (selectedFiles.length > 0) {
        setLoadingContext(true); // Show loading indicator
        for (let i = 0; i < selectedFiles.length; i++) {
          const fileName = selectedFiles[i];
          const fileContext = await getGeneratedContext(fileName);

          newMessages = [
            ...newMessages,
            {
              text: fileName,
              sender: "user",
              isFile: true,
              fileName: fileName,
            },
          ];

          newContext = [
            ...newContext,
            { role: "user", content: `Attached file: ${fileName}` },
            { role: "system", content: fileContext.substring(0, fileContext.length / selectedFiles.length) },
          ];

          setSelectedFiles([]); // Clear selected files after processing
        }
        setLoadingContext(false); // Hide loading indicator
      }

      newMessages = [...newMessages, { text: messageInput, sender: "user", loading: false }];
      setMessages(newMessages);
      setMessageInput("");
      setConversationContext(newContext);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "", sender: "received", loading: true },
      ]);

      try {
        const response = await axios.post(
          // 'https://abhishek-azure-ai-service001579560527.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2023-03-15-preview',
          `${GPT4O_API_URL}`,
          {
            messages: newContext,
            max_tokens: 500,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "api-key": GPT4O_API_KEY,
            },
          }
        );

        if (response?.data?.choices?.[0]?.message?.content) {
          const responseMessage = response.data.choices[0].message.content;
          // console.log('response:',responseMessage);
          
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1] = {
              text: responseMessage,
              sender: "received",
              loading: false,
            };
            return updatedMessages;
          });

          setConversationContext([
            ...newContext,
            { role: "system", content: responseMessage },
          ]);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage = {
          text: "Something went wrong. Please try again.",
          sender: "received",
          loading: false,
          error: true,
        };

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1] = errorMessage;
          return updatedMessages;
        });
      }
    }
  };

  const fetchFiles = async () => {
    setLoadingFiles(true);
    setFileLoadError(null);
    try {
      const response = await axios.get(
        // 'http://20.197.53.225:7071/api/get_files_list',
        `${BUSINESS_BFA}/api/get_files_list?code=3ljnnHr99EWbjsmIEEbAvKoE7TGLYuSSXoUu3J9hZILPAzFubaIm_Q%3D%3D`
      );
      setFilesList(response.data);
      setLoadingFiles(false);
    } catch (error) {
      console.error("Error fetching files:", error);
      setFileLoadError("Failed to load files. Please try again.");
      setLoadingFiles(false);
    }
  };


  const getGeneratedContext = async (fileName) => {
    setLoadingContext(true); // Start loading indicator
  try {
    const response = await axios.get(
      // Your API endpoint here
      `${BUSINESS_BFA}/api/get_file_context?code=a7zI88sjG-uflCs_PtXcN-jWLjlQBoizpSN-XpRqPjPDAzFuPoBUaw%3D%3D&file=${fileName}`,
      { params: { file_name: fileName } }
    );
    setLoadingContext(false); // Stop loading indicator once the API call is done
    return `The data of file ${fileName} is: ${response.data}`;
  } catch (error) {
    console.error("Error fetching file context:", error);
    setLoadingContext(false); // Stop loading indicator in case of error

    // Add error message to the chat
    const errorMessage = {
      text: "Something went wrong while analyzing the asset. Please try again.",
      sender: "received",
      loading: false,
      error: true,
    };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[updatedMessages.length - 1] = errorMessage;
      return updatedMessages;
    });
  }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachClick = () => {
    setOpenDialog(true);
  };

  const handleFileSelect = (fileName) => {
    if (multipleFilesAllowed) {
      if (selectedFiles.length < 2) {
        setSelectedFiles((prevFiles) => [...prevFiles, fileName]);
      } else {
        alert("You can only select two files at a time.");
      }
    } else {
      setSelectedFiles([fileName]);
    }
    setOpenDialog(false); // Close the dialog once a file is selected
  };

  const handleRemoveFile = (fileName) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileName)
    );
  };

  useEffect(() => {
    if (openDialog) {
      fetchFiles();
    }
    scrollToBottom()
  }, [openDialog,messages]);

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90vh",
        maxWidth: "1000px",
        width: "100%",
        margin: "0 auto",
        boxSizing: "border-box",
        "@media (max-width: 600px)": {
          height: "100vh",
          maxWidth: "100%",
          borderRadius: 0,
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: "auto",
          "@media (max-width: 600px)": {
            p: 1,
          },
        }}
      >
        {messages.length === 0 ? (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              textAlign: "center",
              mt: 4,
              "@media (max-width: 600px)": { mt: 2 },
            }}
          >
            Start a conversation by typing a message or attaching a file.
          </Typography>
        ) : (
          messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))
        )}
        {loadingContext && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Analysing the attached asset.</Typography>
        </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderTop: "1px solid #ddd",
          "@media (max-width: 600px)": {
            p: 1,
            flexDirection: "column",
          },
        }}
      >
        <IconButton
          onClick={handleAttachClick}
          disabled={(selectedFiles.length >= 2 && multipleFilesAllowed) || !allowFileUpload}
          component="label"
          sx={{
            marginRight: "15px",
            "@media (max-width: 600px)": { marginRight: "5px" },
          }}
        >
          <i className="fa fa-paperclip" aria-hidden="true"></i>
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: selectedFiles.length > 0 ? 0 : 1,
            marginRight: selectedFiles.length > 0 ? "10px" : "0px",
            "@media (max-width: 600px)": {
              marginBottom: selectedFiles.length > 0 ? "10px" : "0px",
              width: "100%",
            },
          }}
        >
          {selectedFiles.map((file, index) => (
            <Chip
              key={index}
              label={file}
              onDelete={() => handleRemoveFile(file)}
              color="primary"
              sx={{
                maxWidth: "200px",
                marginBottom: "5px",
                "@media (max-width: 600px)": {
                  maxWidth: "100%",
                },
              }}
            />
          ))}
        </Box>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Select a file</DialogTitle>
          <Divider />
          <DialogContent>
            {loadingFiles ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                <CircularProgress />
              </Box>
            ) : fileLoadError ? (
              <Box display="flex" flexDirection="column" alignItems="center" height="100px">
                <Alert severity="error" sx={{ mb: 2 }}>
                  {fileLoadError}
                </Alert>
                <Button variant="contained" onClick={fetchFiles}>
                  Retry
                </Button>
              </Box>
            ) : (
              <List>
                {filesList.map((file, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => handleFileSelect(file)}
                  >
                    <Grid container alignItems="center">
                      <Grid item>
                        <Avatar sx={{ mr: 2 }}>
                          <i className="fa fa-file" aria-hidden="true"></i>
                        </Avatar>
                      </Grid>
                      <Grid item xs sx={{ overflow: "hidden" }}>
                        <ListItemText primary={file} />
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            )}
          </DialogContent>
        </Dialog>

        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type a message..."
          disabled={loadingContext}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            borderRadius: "20px",
            padding: "6px 12px",
            marginRight: selectedFiles.length > 0 ? "15px" : "0px",
            flexGrow: selectedFiles.length > 0 ? 1 : 2,
            "@media (max-width: 600px)": {
              marginRight: "1px",
              marginBottom: "10px",
            },
          }}
        />

        <IconButton
          onClick={handleSendMessage}
          disabled={loadingContext}
          sx={{
            "@media (max-width: 600px)": { marginLeft: "0px" },
          }}
        >
          <i className="fa-solid fa-paper-plane" style={{ "color": "#0959AA" }}></i>
        </IconButton>
      </Box>
    </Paper>
  );
};

export default PromptChat;