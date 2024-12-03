import {
  deleteClassService,
  createClassroomService,
  removeStudentFromClassroomService,
} from "../services/classroom.service";
import { RootState } from "../store/store";
import { setStudents } from "../redux/students.slice";
import { useDispatch, useSelector } from "react-redux";
import { setClassrooms } from "../redux/classrooms.slice";
import { IStudent } from "../interfaces/student.interface";
import { IClassroom } from "../interfaces/classroom.interface";
import { validationForDeleteClass } from "../utilities/classroom.util";
import { ICreateClassroomBody } from "../interfaces/createClassroomBody.interface";
import { toast } from "react-toastify";
import { getErrorMessage } from "../utilities/error.util";

const useClassroomsHook = () => {
  const dispatch = useDispatch();

  //change to classroomsState

  const classrooms: IClassroom[] | null = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );

  const students: IStudent[] | null = useSelector(
    (state: RootState) => state.students.students
  );

  const rollbackState = (
    previousStudentsState: IStudent[] | null,
    previousClassroomsState: IClassroom[] | null
  ): void => {
    if (previousStudentsState) {
      dispatch(setStudents(previousStudentsState));
    }
    if (previousClassroomsState) {
      dispatch(setClassrooms(previousClassroomsState));
    }
  };

  const removeStudentFromClassroom = async (
    classroomId: string,
    studentId: string
  ): Promise<void> => {
    const previousStudentsState: IStudent[] = students ?? [];
    const previousClassroomsState: IClassroom[] = classrooms ?? [];

    try {
      const updatedClassrooms =
        classrooms?.map((classroom) => {
          if (classroom.id === classroomId) {
            return {
              ...classroom,
              students: classroom.students.filter(
                (student) => student.id !== studentId
              ),
            };
          }
          return classroom;
        }) ?? [];

      const updatedStudents =
        students?.map((student) => {
          if (student.id === studentId) {
            return {
              ...student,
              classroomId: null,
            };
          }
          return student;
        }) ?? [];

      dispatch(setStudents(updatedStudents));
      dispatch(setClassrooms(updatedClassrooms));

      await removeStudentFromClassroomService(classroomId, studentId);
      toast.success("Student successfully removed from class.");
    } catch (error) {
      console.log(error);
      rollbackState(previousStudentsState, previousClassroomsState);
      toast.error(getErrorMessage(error));
    }
  };

  const deleteClass = async (
    classroomId: string,
    studentList: IStudent[]
  ): Promise<void> => {
    const previousClassroomsState: IClassroom[] = classrooms ?? [];

    try {
      const canDelete = validationForDeleteClass(studentList);

      if (!canDelete) {
        toast.error(
          `Cannot delete class: Classroom must be empty in order to delete.`
        );
        return;
      }

      const updatedClassrooms =
        classrooms?.filter((classroom) => classroom.id !== classroomId) ?? [];

      dispatch(setClassrooms(updatedClassrooms));
      await deleteClassService(classroomId);
      toast.success("classroom successfully deleted.");
    } catch (error) {
      console.log(error);
      rollbackState(null, previousClassroomsState);
      toast.error(getErrorMessage(error));
    }
  };

  const createClassroom = async (
    createClassroomBody: ICreateClassroomBody
  ): Promise<void> => {
    const previousClassroomsState: IClassroom[] = classrooms ?? [];

    try {
      //add local class to redux instead of response
      const response = await createClassroomService(createClassroomBody);
      dispatch(setClassrooms([...(classrooms || []), response]));
      toast.success("Classroom successfully created.");
    } catch (error) {
      console.log(error);
      rollbackState(null, previousClassroomsState);
      toast.error(getErrorMessage(error));
    }
  };

  return {
    classrooms,
    removeStudentFromClassroom,
    deleteClass,
    createClassroom,
  };
};

export default useClassroomsHook;
