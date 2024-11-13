import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";

interface ISideDrawerProps {
  openDrawer: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}

const SideDrawer = ({ openDrawer, toggleDrawer }: ISideDrawerProps) => {
  
  const arrayOfButtonTextAndCorrespondingRoutes = [
    { text: "Classes", route: "/" },
    { text: "Students", route: "/students" },
    { text: "Create", route: "/create" },
  ];

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        {arrayOfButtonTextAndCorrespondingRoutes.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.route}>
              <ListItemText primary={item.text} />
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
