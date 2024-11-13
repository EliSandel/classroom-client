import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoyaltyIcon from '@mui/icons-material/Loyalty';

import { useStyles } from "./Navbar.style";
import SideDrawer from "../SideDrawer/SideDrawer";
import { useState } from "react";

const Navbar = () => {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box className={classes.navbarBox}>
      <AppBar position="static" className={classes.appBarDiv}> 
        <Toolbar variant="dense" className={classes.toolBarDiv}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <Typography variant="h5" color="inherit" component="div">
            Shob Classes
          </Typography>
          <LoyaltyIcon className={classes.loyaltyIcon}/>
        </Toolbar>
      </AppBar>
      <SideDrawer openDrawer={openDrawer} toggleDrawer={setOpenDrawer}/>
    </Box>
  );
};

export default Navbar;
