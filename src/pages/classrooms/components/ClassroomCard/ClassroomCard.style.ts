import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  cardDiv: {
    boxShadow: "0px 4px 4px 0px #00000040 !important",
    width: "11.375rem",
    height: "10.03rem",
    margin: "0",
    padding: "0",
  },
  className: {
    "&.MuiTypography-root": {
      fontSize: "1.25rem",
      fontWeight: 700,
      lineHeight: "1.84375rem",
      textAlign: "left",
      textUnderlinePosition: "from-font",
      textDecorationSkipInk: "none",
    },
  },
  seatsLeft: {
    "&.MuiTypography-root": {
      fontFamily: "Heebo",
      fontSize: "1rem",
      fontWeight: "400",
      lineHeight: "1.46875rem",
      textAlign: "left",
      textUnderlinePosition: "from-font",
      textDecorationSkipInk: "none",
    },
  },
  totalSeats: {
    "&.MuiTypography-root": {
      fontFamily: "Heebo",
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.285rem",
      textAlign: "left",
      textUnderlinePosition: "from-font",
      textDecorationSkipInk: "none",
      color: "#8F8F8F",
    },
  },
  studentsListButton: {
    "&.MuiButtonBase-root": {
      fontFamily: "Heebo",
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "1.46875rem",
      textAlign: "left",
      textUnderlinePosition: "from-font",
      textDecorationSkipInk: "none",
      color: "#000000",
      margin: "0",
      paddingRight: "0",
    },
  },
  trashIcon: {
    "&.MuiSvgIcon-root": {},
  },
  cardContentClass: {
    "&.MuiCardContent-root": {
      paddingRight: "0",
    },
  },
  cardActionsDiv: {
    paddingRight: "0 !important",
  },
});
