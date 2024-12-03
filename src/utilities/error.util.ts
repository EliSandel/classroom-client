import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "An Axios error ocurred.";
  }

  if (error instanceof Error) {
    return String(error);
  }

  return "An unexpected error occurred.";
};
