import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useStyles } from "./ClassCard.style";
import { RootState } from "../../store/store";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from '@mui/icons-material/Delete';

const ClassCard = () => {
  const backgroundColor = useSelector(
    (state: RootState) => state.color.buttonColor
  );
  const classes = useStyles({ backgroundColor });

  return (
    <Card className={classes.cardDiv} elevation={0}>
      <CardContent sx={{paddingRight: "0 !important"}}>
        <Typography className={classes.className}>אלון</Typography>
        <Typography className={classes.seatsLeft}>There are 2 seats left</Typography>
        <Typography className={classes.totalSeats}>out of 2</Typography>
      </CardContent>
      <CardActions sx={{paddingRight: "0 !important"}}>
        <Button className={classes.studentsListButton}>Students List</Button>
        <DeleteIcon className={classes.trashIcon} color="primary"/>
      </CardActions>
    </Card>
  );
};

export default ClassCard;
