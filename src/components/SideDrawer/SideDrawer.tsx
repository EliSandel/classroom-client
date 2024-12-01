import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import { useStyles } from "./SideDrawer.style";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

interface ISideDrawerProps {
  openDrawer: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}

const SideDrawer: React.FC<ISideDrawerProps> = ({
  openDrawer,
  toggleDrawer,
}: ISideDrawerProps) => {
  const classes = useStyles();

  //move to constants dir
  const arrayOfLinkTextAndCorrespondingRoutes = [
    { text: "Classes", route: "/" },
    { text: "Students", route: "/students" },
    { text: "Create", route: "/create" },
  ];

  return (
    <Drawer open={openDrawer} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: 130 }} onClick={() => toggleDrawer(false)}>
        <List>
          {arrayOfLinkTextAndCorrespondingRoutes.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.route}>
                <ListItemText
                  className={classes.menuText}
                  primary={item.text}
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
