import { useEffect } from "react";
import { RootState } from "../store/store";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setClassrooms } from "../redux/classroomsSlice";
import { IClassroom } from "../interfaces/classroom.interface";
import { fetchClassroomsService } from "../services/classroom.service";

const useFetchClassrooms = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const classrooms: IClassroom[] | null = useSelector(
    (state: RootState) => state.classrooms.classrooms
  );

  useEffect(() => {
    if (classrooms !== null) {
      return;
    }

    const fetchAndSetClassrooms = async () => {
      const data = await queryClient.fetchQuery<IClassroom[]>({
        queryKey: ["classrooms"],
        queryFn: fetchClassroomsService,
        staleTime: Infinity,
      });

      if (data) {
        dispatch(setClassrooms(data));
      }
    };

    fetchAndSetClassrooms();
  }, []);

  return classrooms;
};

export default useFetchClassrooms;
