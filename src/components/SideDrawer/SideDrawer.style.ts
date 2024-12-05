import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  menuText: {
    "& .MuiTypography-root": {
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
      textAlign: "center",
    },
  },
  drawerContent: {
    width: 130,
  },
}));
