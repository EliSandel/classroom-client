import { useQuery } from "react-query";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setClassrooms } from "../redux/classroomsSlice";
import { getClassrooms } from "../services/classroom.service";
import { IClassroom } from "../interfaces/classroom.interface";

const useClassrooms = () => {
  const dispatch = useDispatch();

  const classState: IClassroom[] = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["classrooms"], 
    queryFn: getClassrooms, 
    enabled: classState.length === 0, // Only fetch if state is empty
    onSuccess: (data) => {
        if (data) {
            dispatch(setClassrooms(data));
        }
    }
  });
  return { data, error, isLoading };
};

export default useClassrooms;
