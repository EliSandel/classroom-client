import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  navbarBox: {
    width: "100%",
    height: "10%",
  },
  loyaltyIcon: {
    marginLeft: "20px",
  },
  menuIcon: {
    "&. MuiSvgIcon-root": {
      marginLeft: "10px",
    },
  },
  appBarDiv: {
    height: "100%",
  },
  toolBarDiv: {
    height: "100%",
    backgroundColor: "#3F50B5",
  },
}));
