import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/store";
import {
  deleteClassService,
  createClassroomService,
  removeStudentFromClassroomService,
} from "../services/classrooms/classroom.service";
import { setStudents } from "../redux/students.slice";
import { setClassrooms } from "../redux/classrooms.slice";
import { getErrorMessage } from "../utilities/error.util";
import { IStudent } from "../interfaces/student.interface";
import { IClassroom } from "../interfaces/classroom.interface";
import { validationForDeleteClass } from "../utilities/classroom.util";
import { ICreateClassroomDto } from "../services/classrooms/dto/create-classroom.dto";
import { IUnasignStudentDto } from "../services/classrooms/dto/unassign-students.dto";

const useClassroomsHook = () => {
  const dispatch = useDispatch();

  const studentsState = useAppSelector((state) => state.students.students);
  const classroomsState = useAppSelector(
    (state) => state.classrooms.classrooms
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
    const previousStudentsState: IStudent[] = studentsState ?? [];
    const previousClassroomsState: IClassroom[] = classroomsState ?? [];

    try {
      const updatedClassrooms =
        classroomsState?.map((classroom) => {
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
        studentsState?.map((student) => {
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

      const unassignStudentBody: IUnasignStudentDto = {
        classroomId,
        studentId,
      }

      await removeStudentFromClassroomService(unassignStudentBody);
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
    const previousClassroomsState: IClassroom[] = classroomsState ?? [];

    try {
      const canDelete = validationForDeleteClass(studentList);

      if (!canDelete) {
        toast.error(
          `Cannot delete class: Classroom must be empty in order to delete.`
        );
        return;
      }

      const updatedClassrooms =
        classroomsState?.filter((classroom) => classroom.id !== classroomId) ??
        [];

      dispatch(setClassrooms(updatedClassrooms));
      toast.success("classroom successfully deleted.");
      await deleteClassService(classroomId);
    } catch (error) {
      console.log(error);
      rollbackState(null, previousClassroomsState);
      toast.error(getErrorMessage(error));
    }
  };

  const createClassroom = async (
    createClassroomBody: ICreateClassroomDto
  ): Promise<void> => {
    const previousClassroomsState: IClassroom[] = classroomsState ?? [];

    try {
      const newClassroom: IClassroom = {
        ...createClassroomBody,
        students: [],
      };
      await createClassroomService(createClassroomBody);
      dispatch(setClassrooms([...(classroomsState || []), newClassroom]));
      toast.success("Classroom successfully created.");
    } catch (error) {
      console.log(error);
      rollbackState(null, previousClassroomsState);
      toast.error(getErrorMessage(error));
    }
  };

  return {
    classrooms: classroomsState,
    removeStudentFromClassroom,
    deleteClass,
    createClassroom,
  };
};

export default useClassroomsHook;
