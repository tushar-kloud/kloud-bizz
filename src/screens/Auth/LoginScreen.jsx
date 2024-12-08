import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/userActions";

// import { FORGOT_PASSWORD_CLEAR } from "../../constant/userConstants";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error: loginError, userInfo } = userLogin;

//   const userLogout = useSelector((state) => state.userLogout);
//   const { loading: logoutLoading } = userLogout;

  const passwordForgot = useSelector((state) => state.passwordForgot);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser(email, password));
  };

//   if (passwordForgot.success || passwordForgot.error) {
//     dispatch({ type: FORGOT_PASSWORD_CLEAR });
//   }

  useEffect(() => {
    if (userInfo?.id) {
      if (userInfo.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }

    if (loginError && loginError.status == 403) {
      // console.log(loginError.data.message);
      navigate(`/password-update/${email}`);
    }
  }, [userInfo, loginError]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ marginTop: 15, marginBottom: 10 }}
    >
      <CssBaseline />

      {loginError && (
        <Box component="section" sx={{ marginTop: 10 }}>
          <Alert severity="error">
            {loginError.data.message
              ? loginError.data.message
              : "Something went wrong try again after some time"}
          </Alert>
        </Box>
      )}
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            value={email}
            label="Email Address"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            autoComplete="current-password"
          />
          {loading 
        //   || logoutLoading
           ? (
            <Box
              component="section"
              sx={{
                display: "flex",
                margin: 2,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          )}

          {/* <Grid container>
              <Grid item>
                <Link
                  onClick={() => navigate("/forgot-password")}
                  sx={{ cursor: "pointer" }}
                  variant="body2"
                >
                  Forgot Password?
                </Link>
              </Grid>
            </Grid> */}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginScreen;
