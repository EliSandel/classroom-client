import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/store";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { setClassrooms } from "../redux/classrooms.slice";
import { IClassroom } from "../interfaces/classroom.interface";
import { fetchClassroomsService } from "../services/classrooms/classroom.service";

const useFetchClassrooms = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const classrooms = useAppSelector((state) => state.classrooms.classrooms);

  useEffect(() => {
    if (classrooms !== null) {
      return;
    }

    const fetchAndSetClassrooms = async () => {
      try {
        const data = await queryClient.fetchQuery<IClassroom[]>({
          queryKey: ["classrooms"],
          queryFn: fetchClassroomsService,
          staleTime: Infinity,
        });

        if (data) {
          dispatch(setClassrooms(data));
        }
      } catch (error) {
        console.error("Failed to fetch classrooms:", error);
        toast.error("Failed to load classrooms. Please try again later.");
      }
    };

    fetchAndSetClassrooms();
  }, []);

  return classrooms;
};

export default useFetchClassrooms;
