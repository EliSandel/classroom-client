import CreateClassForm from "./components/CreateClassForm/CreateClassForm";
import CreateStudentForm from "./components/CreateStudentForm/CreateStudentForm";

const Create = () => {
  return (
    <div style={ { display: "flex" } }>
      <CreateClassForm />
      <CreateStudentForm />
    </div>
  );
};

export default Create;
