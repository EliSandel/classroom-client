import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useStyles } from "./Navbar.style";

const Navbar = () => {
  const classes = useStyles();

  return (
    <Box className={classes.navbarBox}>
      <AppBar position="static" sx={{ height: "100%" }}>
        <Toolbar variant="dense" sx={{ height: "100%" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Shob Classes
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
