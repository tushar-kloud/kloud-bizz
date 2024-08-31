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
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

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
//   const navigate = useNavigate();

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
            <Box sx={{ display: { xs: "none", md: "flex" }, ml:2 }}>
              <NavMenuItem to="/dashboard">Dashboard</NavMenuItem>
            </Box>
          </Box>
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
                  minWidth: "60dvw",
                  p: 2,
                  backgroundColor: "background.paper",
                  flexGrow: 1,
                }}
              >
                <NavMenuItem to="/dashboard">Dashboard</NavMenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
