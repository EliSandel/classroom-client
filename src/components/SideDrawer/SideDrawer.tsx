import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import { useStyles } from "./SideDrawer.style";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { arrayOfLinkTextAndCorrespondingRoutes } from "./SideDrawer.data";

interface ISideDrawerProps {
  openDrawer: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}

const SideDrawer: React.FC<ISideDrawerProps> = ({
  openDrawer,
  toggleDrawer,
}: ISideDrawerProps) => {
  const classes = useStyles();

  return (
    <Drawer open={openDrawer} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 130 }} onClick={() => toggleDrawer(false)}>
        <List>
          {arrayOfLinkTextAndCorrespondingRoutes.map(({ text, route}) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={route}>
                <ListItemText
                  className={classes.menuText}
                  primary={text}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
