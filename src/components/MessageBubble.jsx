import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import BounceLoader from './BounceLoader/BounceLoader';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
// import DescriptionIcon from '@mui/icons-material/Description';

// Function to remove specific symbols from text
const formatText = (text) => {
  if (typeof text !== 'string') {
    console.error('formatText: Expected a string but got', typeof text);
    return text; // Return as is if text is not a string
  }

  // Remove specific symbols from text
  const cleanedText = text
    .replace(/\*\*/g,'')   // Remove '**'
    .replace(/```/g, '')   // Remove '```'
    .replace(/#/g, '')      // Remove '#'
    .replace(/###/g, '')   // Remove '###'

  return cleanedText;
};

const formatMath = (text) => {
  if (typeof text !== 'string') {
    console.error('formatMath: Expected a string but got', typeof text);
    return <>{text}</>; // Return as is if text is not a string
  }

  const paragraphs = text.split('\n\n');
  return (
    <div style={{ fontSize: '16px', lineHeight: '1.5' }}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          <Latex>{paragraph}</Latex>
        </p>
      ))}
    </div>
  );
};

function MessageBubble({ message }) {
  const isUserMessage = message.sender === 'user';
  const isError = message.error; // Check for error

  // Ensure message.text is a string
  const messageText = typeof message.text === 'string' ? message.text : '';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUserMessage ? 'flex-end' : 'flex-start',
        mb: 2,
        maxWidth: '100%', // Allow message bubble to take up full width
        wordBreak: 'break-word', // Break long words to prevent overflow
      }}
    >
      <Box
        sx={{
          maxWidth: '70%',
          px: 2,
          py: 0.8,
          borderRadius: 2,
          backgroundColor: isError
            ? '#f44336' // Red background for errors
            : isUserMessage
            ? '#1976d2'
            : '#f5f5f5',
          color: isError
            ? 'white' // White text for errors
            : isUserMessage
            ? 'white'
            : 'black',
          boxShadow: 3,
          overflowWrap: 'break-word', // Ensure long text or formulas wrap correctly
        }}
      >
        {message.isFile ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Avatar sx={{ backgroundColor: '#e0e0e0' }}>
              {/* <DescriptionIcon /> */}
              <i className="fa-regular fa-file-lines"></i>
            </Avatar>
            <Typography variant="body1">{message.fileName}</Typography>
          </Box>
        ) : message.loading ? (
          <Typography
            sx={{
              height: '30px',
              width: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BounceLoader />
          </Typography>
        ) : (
          <Typography
            variant="body1"
            sx={{
              wordBreak: 'break-word', // Break long words
              whiteSpace: 'pre-wrap', // Preserve white space and handle line breaks
            }}
          >
            {isError ? (
              <Typography variant="body1" sx={{ fontSize: '14px' }}>
                Error: {messageText || 'Something went wrong!'}
              </Typography>
            ) : (
              <div>{formatMath(formatText(messageText))}</div>
            )}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default MessageBubble;
