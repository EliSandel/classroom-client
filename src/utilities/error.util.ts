import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || "An Axios error ocurred.";
    } else if (error instanceof Error) {
        return error.message;
    }

    return "An unexpected error occurred.";
}