import ClassCard from "../../components/ClassCard/ClassCard";
import { useStyles } from "./Classes.style";

const Classes = () => {
  const classes = useStyles();

  return (
    <div className={classes.classesPage}>
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
    </div>
  );
};

export default Classes;
