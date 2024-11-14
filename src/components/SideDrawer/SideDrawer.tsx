import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import { useStyles } from "./SideDrawer.style";

interface ISideDrawerProps {
  openDrawer: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}

const SideDrawer = ({ openDrawer, toggleDrawer }: ISideDrawerProps) => {
  const classes = useStyles();
  
  const arrayOfLinkTextAndCorrespondingRoutes = [
    { text: "Classes", route: "/" },
    { text: "Students", route: "/students" },
    { text: "Create", route: "/create" },
  ];

  const DrawerList = (
    <Box
      sx={{ width: 130 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        {arrayOfLinkTextAndCorrespondingRoutes.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.route}>
              <ListItemText className={classes.menuText} primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={openDrawer} onClose={() => toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default SideDrawer;
