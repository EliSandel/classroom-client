import { makeStyles } from "@mui/styles";

interface StyleProps {
  backgroundColor: string;
}

export const useStyles = makeStyles({
  navbarBox: {
    width: "100%",
    height: "10%",
  },
  loyaltyIcon: {
    marginLeft: "20px",
  },
  appBarDiv: {
    height: "100%",
  },
  toolBarDiv: (props: StyleProps) => ({
    height: "100%",
    backgroundColor: props.backgroundColor,
  }),
});

