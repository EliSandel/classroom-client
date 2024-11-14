import { makeStyles } from "@mui/styles";

interface StyleProps {
  buttonColor: string;
}

export const useStyles = makeStyles({
  cardDiv: {
    boxShadow: "0px 4px 4px 0px #00000040",
    backgroundColor: "red",
    minWidth: 275,
  },
  toolBarDiv: (props: StyleProps) => ({
    height: "100%",
    backgroundColor: props.buttonColor,
  }),
});

