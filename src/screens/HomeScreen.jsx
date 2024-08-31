import React from 'react'
import {Box, Container, Stack, Typography, Fade} from "@mui/material"

const HomeScreen = () => {
  return (
    <div>
        <Box
        id="hero"
        sx={{
          width: "100%",
          backgroundImage: "linear-gradient(180deg, #CEE5FD, #FFF)",
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
          animation: `gradientAnimation 10s ease infinite alternate`,
          paddingTop:'30px'
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Fade in={true} timeout={1000}>
            <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}
            >
              <Typography
                variant="h1"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignSelf: "center",
                  textAlign: 'center',
                  fontSize: "clamp(2.5rem, 7vw, 3.5rem)",
                  fontWeight: "600",
                  lineHeight: "1.11429",
                  letterSpacing: "-0.1px",
                  fontFamily: "Inter, sans-serif",
                  color: "rgb(9, 89, 170)",
                }}
              >
                Kloudstac's Gen AI Labs
              </Typography>

              <Typography
                component="span"
                variant="body1"
                sx={{
                  fontSize: "clamp(2rem, 2vw, 2rem)",
                  lineHeight: "1.11429",
                  letterSpacing: "-0.1px",
                  fontFamily: "Inter, sans-serif",
                  color: "black",
                  textAlign: "center",
                  paddingTop:'20px',
                  paddingBottom:'10px'
                }}
              >
                For accelerated GenAI adoption
              </Typography>
              <Typography
                textAlign="center"
                color="text.secondary"
                sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
              >
                Discover our AI labs with significant benefits, designed to
                reduce dependency on live lectures and take you from prototype
                to production. Benefit from AI metrics for user evaluation and
                structured, use case-specific labs with personas tailored for
                both tech and non-tech users.
              </Typography>
            </Stack>
          </Fade>
        </Container>
      </Box>
    </div>
  )
}

export default HomeScreen