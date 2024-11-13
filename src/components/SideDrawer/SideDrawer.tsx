import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

interface ISideDrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}

const SideDrawer = ({ open, toggleDrawer }: ISideDrawerProps) => {
  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        {["Classes", "Students", "Create"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={() => toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default SideDrawer;
