import ClassCard from "../../components/ClassCard/ClassCard";
import { useStyles } from "./Classes.style";

const Classes = () => {
  const classes = useStyles();

  return (
    <div className={classes.classesPage}>
      <h1>Classes page</h1>
      <ClassCard />
      <ClassCard />
    </div>
  );
};

export default Classes;
