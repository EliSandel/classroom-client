import { useStyles } from "./Create.style";
import CreateClassForm from "./components/CreateClassForm/CreateClassForm";
import CreateStudentForm from "./components/CreateStudentForm/CreateStudentForm";

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
