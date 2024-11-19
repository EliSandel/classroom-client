import { getClassrooms } from "../services/classroom.service";
import { useDispatch } from "react-redux";
import { setClassrooms } from "../redux/classroomsSlice";
import { useQuery } from "react-query";

const useClassrooms = () => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useQuery({
    queryKey: ["classrooms"], 
    queryFn: getClassrooms, 
    onSuccess: (data) => {
        if (data) {
            dispatch(setClassrooms(data));
        }
    }
  });
  return { data, error, isLoading };
};

export default useClassrooms;
