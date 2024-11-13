import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoyaltyIcon from '@mui/icons-material/Loyalty';

import { useStyles } from "./Navbar.style";

const Navbar = () => {
  const classes = useStyles();

  return (
    <Box className={classes.navbarBox}>
      <AppBar position="static" className={classes.appBarDiv}> 
        <Toolbar variant="dense" className={classes.toolBarDiv}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <Typography variant="h5" color="inherit" component="div">
            Shob Classes
          </Typography>
          <LoyaltyIcon className={classes.loyaltyIcon}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
