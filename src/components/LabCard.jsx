import React from 'react'
import { Card, CardContent, Typography, Box, CardMedia} from "@mui/material";


const LabCard = ({labDetails}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.01)",
        },
        backgroundColor: "background.default",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 500,
        width: "100%",
        margin: "auto",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        image={labDetails.thumbnailImage}
        sx={{ height: 180, objectFit: "cover" }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {labDetails.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {labDetails.description}
        </Typography>
        {/* <Box sx={{ marginTop: '20px' }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Completed:</strong> {labDetails.progress}%
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  )
}

export default LabCard