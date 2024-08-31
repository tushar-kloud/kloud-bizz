import { Box, Container, CssBaseline, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { labsDetails } from "../constants";
import LabCard from "../components/LabCard";

function DashboardScreen() {
  const navigate = useNavigate();
  
  const handleLabClick = (labId) =>{
    navigate(`/lab/${labId}`)
  }
  return (
    <Container sx={{marginTop:15}}>
      <CssBaseline />
      <Box sx={{ mt: 10 }}>
        <Typography variant="sectionHeaderHeadline">Welcome!</Typography>
        <Grid container spacing={4} sx={{ my: 2 }}>
          {labsDetails.map((labDetails) => (
            <Grid item xs={12} sm={6} md={6} lg={4} onClick={() => handleLabClick(labDetails.id)} key={labDetails.id} >
              <LabCard labDetails={labDetails} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default DashboardScreen;
