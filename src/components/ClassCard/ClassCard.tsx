import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useStyles } from "./ClassCard.style";
import { RootState } from "../../store/store";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';

const ClassCard = () => {
  const backgroundColor = useSelector(
    (state: RootState) => state.color.buttonColor
  );
  const classes = useStyles({ backgroundColor });

  return (
    <Card className={classes.cardDiv} elevation={0}>
      <CardContent>
        <Typography variant="h5">Class Name</Typography>
        <Typography variant="body2">There are 2 seats left</Typography>
        <Typography>out of 2</Typography>
      </CardContent>
      <CardActions>
        <Button>Students List</Button>
        <Button size="small"><DeleteIcon /></Button>
      </CardActions>
    </Card>
  );
};

export default ClassCard;
