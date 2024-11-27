import CreateClassForm from "./components/CreateClassForm/CreateClassForm";
import CreateStudentForm from "./components/CreateStudentForm/CreateStudentForm";
import { useStyles } from "./Create.style";

const Create: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.mainDiv}>
      <CreateClassForm />
      <CreateStudentForm />
    </div>
  );
};

export default Create;
