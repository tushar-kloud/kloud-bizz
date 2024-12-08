import { styled } from "@mui/material/styles";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Divider,
  Typography,
  MenuItem,
  Drawer,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { USER_LOGOUT } from "../redux/constants/userConstants";

const logoStyle = {
  width: "200px",
  height: "auto",
  cursor: "pointer",
};

const StyledAppBar = styled(AppBar)({
  boxShadow: 0,
  backgroundColor: "white",
  // marginTop: "16px",
});

const StyledToolbar = styled(Toolbar)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "white",
  // backgroundColor: "rgba(255, 255, 255, 0.4)",
  // backgroundColor: "red",
  // backdropFilter: "blur(24px)",
  // borderRadius: "999px",
  // maxHeight: "40px",
  // border: "1px solid",
  // borderColor: theme.palette.divider,
  // boxShadow: "0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)",
}));

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const NavMenuItem = ({ to, children }) => (
  <StyledLink to={to}>
    <MenuItem sx={{ py: "6px", px: "12px" }}>
      <Typography variant="body2" color="text.primary">
        {children}
      </Typography>
    </MenuItem>
  </StyledLink>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userLogin);
  const isLoggedIn = Boolean(userInfo && userInfo.id);
  //   const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/");
    // dispatch(user_logout());
    dispatch({ type: USER_LOGOUT });
  };
  const loginRedirect = () => navigate("/signin");

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="lg">
        <StyledToolbar variant="regular">
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              ml: "-18px",
            }}
          >
            <Link to="/">
              <Box>
                <img
                  src="/Kloudstac_logo.png"
                  style={logoStyle}
                  alt="logo of Kloudstac"
                />
              </Box>
            </Link>
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 2 }}>
              {isLoggedIn && (
                <>
                  <NavMenuItem to="/dashboard">Dashboard</NavMenuItem>
                </>
              )}
              {/* <NavMenuItem to="/dashboard">Dashboard</NavMenuItem> */}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              alignItems: "center",
            }}
          >
            <>
              {/* <Box
                sx={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Darkening the background
                  backdropFilter: "blur(5px)", // Optional: Apply blur effect
                  zIndex: 999, // Ensure it is above other content
                }}
              />
              <Box
                sx={{
                  margin: 2,
                  padding: 1,
                  justifyContent: "center",
                  zIndex: 1000, // Tooltip on top of the overlay
                  position: "relative", // Ensure the tooltip bubble appears above the overlay
                }}
              ></Box> */}
              {/* <TooltipBubble>
                  <Stack direction="row">
                    <CircularProgress sx={{color:'white', size:'15px', padding:1}} />
                    <Typography variant="p">
                      Cleaning up the resources, this will only take a few seconds.
                    </Typography>
                  </Stack>
                </TooltipBubble> */}
            </>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {isLoggedIn ? (
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component={Link}
                  to="/signin"
                >
                  Sign in
                </Button>
              )}
            </Box>
          </Box>

          {/* FOR SMALL SCREEN */}
          <Box sx={{ display: { sm: "", md: "none" } }}>
            <Button
              variant="text"
              color="primary"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: "30px", p: "4px" }}
            >
              <MenuIcon />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  width: 350,
                  fontSize: 2,
                  p: 2,
                  backgroundColor: "background.paper",
                  flexGrow: 1,
                }}
              >
                <NavMenuItem to="/dashboard">Dashboard</NavMenuItem>
                <Divider/>
                {isLoggedIn ? (
                  <Button
                    color="primary"
                    variant="text"
                    onClick={() => {
                      logoutHandler();
                      toggleDrawer(false)();
                    }}
                    sx={{ width: "100%" }}
                  >
                    <strong>Logout</strong>
                  </Button>
                ) : (
                  <>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          loginRedirect();
                          toggleDrawer(false)();
                        }}
                        sx={{ width: "100%" }}
                      >
                        Sign In
                      </Button>
                    </MenuItem>
                  </>)}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
