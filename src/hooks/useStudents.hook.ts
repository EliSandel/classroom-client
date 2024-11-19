import { useQuery } from 'react-query';
import { getStudents } from '../services/students.service';

const useStudents = () => {
    const { data, error, isLoading } = useQuery(
        'students',       // Query key
        getStudents,      // Query function
    );

    return { data, error, isLoading };
};

export default useStudents;
