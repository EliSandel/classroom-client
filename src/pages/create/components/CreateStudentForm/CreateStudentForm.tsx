import {
  Box,
  Button,
  TextField,
  Container,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import { useStyles } from "./CreateStudentForm.style";
import useStudentsHook from "../../../../hooks/useStudents.hook";
import { ICreateStudentBody } from "../../../../interfaces/createStudentBody.interface";

interface IFormData {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  profession: string;
}

interface IFormErrors {
  id: boolean;
  firstName: boolean;
  lastName: boolean;
  age: boolean;
  profession: boolean;
}

const CreateStudentForm: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    profession: "",
  });

  const [errors, setErrors] = useState<IFormErrors>({
    id: false,
    firstName: false,
    lastName: false,
    age: false,
    profession: false,
  });

  const { createStudent } = useStudentsHook();

  const classes = useStyles();

  const clearFormData = (): void => {
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      age: "",
      profession: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      if (name === "id") {
        updatedErrors.id =
          !value ||
          isNaN(Number(value)) ||
          Number(value) < 0 ||
          value.length !== 9;
      } else if (name === "age") {
        updatedErrors.age =
          !value || isNaN(Number(value)) || Number(value) <= 0;
      } else if (
        name === "firstName" ||
        name === "lastName" ||
        name === "profession"
      ) {
        updatedErrors[name] = !value;
      }

      return updatedErrors;
    });
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const formErrors: IFormErrors = {
      id: false,
      firstName: false,
      lastName: false,
      age: false,
      profession: false,
    };

    if (
      !formData.id ||
      isNaN(Number(formData.id)) ||
      formData.id.length !== 9 ||
      Number(formData.id) < 0
    ) {
      formErrors.id = true;
    }
    if (!formData.firstName) formErrors.firstName = true;
    if (!formData.lastName) formErrors.lastName = true;
    if (
      !formData.age ||
      isNaN(Number(formData.age)) ||
      Number(formData.age) <= 0
    )
      formErrors.age = true;
    if (!formData.profession) formErrors.profession = true;

    setErrors(formErrors);

    if (!Object.values(formErrors).includes(true)) {
      const createStudentBody: ICreateStudentBody = {
        id: formData.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: Number(formData.age),
        profession: formData.profession,
      };

      try {
        await createStudent(createStudentBody);
        alert("Student created successfully!");
      } catch (error) {
        alert(error);
      }
      clearFormData();
    }
  };

  return (
    <Container maxWidth="xs">
      <Box className={classes.mainBox}>
        <Typography variant="h5" gutterBottom>
          Add new student
        </Typography>
        <form onSubmit={handleSubmit} className={classes.formDiv}>
          <FormControl fullWidth margin="dense" error={errors.id}>
            <TextField
              label="Student ID"
              variant="outlined"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
              type="number"
            />
            {errors.id && (
              <FormHelperText>
                Student ID must be a 9-digit number
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="dense" error={errors.firstName}>
            <TextField
              label="First Name"
              variant="outlined"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && (
              <FormHelperText>First name is required</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="dense" error={errors.lastName}>
            <TextField
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && (
              <FormHelperText>Last name is required</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="dense" error={errors.age}>
            <TextField
              label="Age"
              variant="outlined"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              type="number"
            />
            {errors.age && (
              <FormHelperText>Valid age is required</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="dense" error={errors.profession}>
            <TextField
              label="Profession"
              variant="outlined"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
            />
            {errors.profession && (
              <FormHelperText>Profession is required</FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={classes.submitButton}
          >
            ADD STUDENT
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateStudentForm;
