import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useStyles } from "./ClassCard.style";
import { RootState } from "../../store/store";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useDispatch, useSelector } from "react-redux";

const ClassCard = () => {
  const dispatch = useDispatch();
  const backgroundColor = useSelector(
    (state: RootState) => state.color.buttonColor
  );
  const classes = useStyles({ backgroundColor });

  return (
    <Card className={classes.cardDiv}>
      <CardContent>
        <Typography variant="h5">Class Name</Typography>
        <Typography variant="body2">There are 2 seats left</Typography>
        <Typography>out of 2</Typography>
      </CardContent>
      <CardActions>
        <Button>Students List</Button>
        <Button size="small">L</Button>
      </CardActions>
    </Card>
  );
};

export default ClassCard;
