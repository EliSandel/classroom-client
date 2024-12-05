import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  classesPage: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
    gap: "16px",
    paddingLeft: "1rem",
    paddingTop: "1rem",
    paddingRight: "1rem",
    boxSizing: "border-box"
  },
}));
