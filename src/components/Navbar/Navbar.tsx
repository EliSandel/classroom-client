import { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { useStyles } from "./Navbar.style";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SideDrawer from "../SideDrawer/SideDrawer";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { useButtonColor } from "../../context/ButtonColorContext";

const Navbar: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const classes = useStyles();
  const { toggleColor } = useButtonColor();

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
            onClick={toggleColor}
          />
        </Toolbar>
      </AppBar>
      <SideDrawer openDrawer={openDrawer} toggleDrawer={setOpenDrawer} />
    </Box>
  );
};

export default Navbar;
