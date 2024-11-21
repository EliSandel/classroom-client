import axios from 'axios';

// Base URL setup (optional)
const API_URL = 'http://localhost:3000/students';


export const fetchStudentsService = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};
