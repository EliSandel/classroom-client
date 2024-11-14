import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  menuText: {
    "& .MuiTypography-root": {
      /* fontFamily: "Heebo", */ //this is weird
      fontSize: "1.125rem",
      fontWeight: 400,
      lineHeight: "1.5rem",
      textAlign: "center",
      textUnderlinePosition: "from-font",
      textDecorationSkipInk: "none",
    },
  },
}));
