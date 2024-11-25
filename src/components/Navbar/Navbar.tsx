import { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { useDispatch } from "react-redux";
import { useStyles } from "./Navbar.style";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SideDrawer from "../SideDrawer/SideDrawer";
import { toggleColor } from "../../redux/colorSlice";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Box className={classes.navbarBox}>
      <AppBar position="static" className={classes.appBarDiv}>
        <Toolbar variant="dense" className={classes.toolBarDiv}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ml: 0 }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="inherit" component="div">
            Shob Classes
          </Typography>
          <LoyaltyIcon
            className={classes.loyaltyIcon}
            onClick={() => dispatch(toggleColor())}
          />
        </Toolbar>
      </AppBar>
      <SideDrawer openDrawer={openDrawer} toggleDrawer={setOpenDrawer} />
    </Box>
  );
};

export default Navbar;
