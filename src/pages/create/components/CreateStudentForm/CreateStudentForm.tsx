import React, { useState } from "react";
import {
  FormControl,
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import { useStudentsHook } from "../../../../hooks/useStudents.hook";
import { ICreateStudentBody } from "../../../../interfaces/createStudentBody.interface";

const CreateStudentForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    profession: "",
  });

  const clearFormData = () => {
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      age: "",
      profession: "",
    });
  };

  const { createStudent } = useStudentsHook();

  const [errors, setErrors] = useState({
    id: false,
    firstName: false,
    lastName: false,
    age: false,
    profession: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]:
        name === "id"
          ? !value || isNaN(Number(value)) || value.length !== 9
          : name === "age"
          ? !value || isNaN(Number(value))
          : !value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formErrors = {
      id: false,
      firstName: false,
      lastName: false,
      age: false,
      profession: false,
    };

    if (
      !formData.id ||
      isNaN(Number(formData.id)) ||
      formData.id.length !== 9
    ) {
      formErrors.id = true;
    }
    if (!formData.firstName) formErrors.firstName = true;
    if (!formData.lastName) formErrors.lastName = true;
    if (!formData.age || isNaN(Number(formData.age))) formErrors.age = true;
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Add new student
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "60%" }}>
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
              <FormHelperText>Student ID must be a 9-digit number</FormHelperText>
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
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            ADD STUDENT
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateStudentForm;
