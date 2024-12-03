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
import { useStyles } from "./CreateClassForm.style";
import useClassroomsHook from "../../../../hooks/classrooms.hook";
import { ICreateClassroomBody } from "../../../../interfaces/createClassroomBody.interface";

interface IFormData {
  id: string;
  name: string;
  maxOccupancy: string;
}

interface IFormErrors {
  id: boolean;
  name: boolean;
  maxOccupancy: boolean;
}

const CreateClassForm: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    id: "",
    name: "",
    maxOccupancy: "",
  });

  const [errors, setErrors] = useState<IFormErrors>({
    id: false,
    name: false,
    maxOccupancy: false,
  });

  const { createClassroom } = useClassroomsHook();

  const classes = useStyles();

  const clearFormData = () => {
    setFormData({
      id: "",
      name: "",
      maxOccupancy: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      if (name === "id") {
        updatedErrors.id = !value;
      } else if (name === "maxOccupancy") {
        updatedErrors.maxOccupancy =
          !value || isNaN(Number(value)) || Number(value) <= 0;
      } else if (name === "name") {
        updatedErrors.name = !value;
      }

      return updatedErrors;
    });
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const formErrors: IFormErrors = {
      id: false,
      name: false,
      maxOccupancy: false,
    };

    if (!formData.id) formErrors.id = true;
    if (!formData.name) formErrors.name = true;
    if (
      !formData.maxOccupancy ||
      isNaN(Number(formData.maxOccupancy)) ||
      Number(formData.maxOccupancy) <= 0
    )
      formErrors.maxOccupancy = true;

    setErrors(formErrors);

    if (!Object.values(formErrors).includes(true)) {
      const createClassroomBody: ICreateClassroomBody = {
        id: formData.id,
        name: formData.name,
        maxOccupancy: Number(formData.maxOccupancy),
      };

      await createClassroom(createClassroomBody);
      clearFormData();
    }
  };

  return (
    <Container maxWidth="xs">
      <Box className={classes.mainBox}>
        <Typography variant="h5" gutterBottom>
          Create new class
        </Typography>
        <form onSubmit={handleSubmit} className={classes.formDiv}>
          <FormControl fullWidth margin="dense" error={errors.id}>
            <TextField
              label="Class ID"
              variant="outlined"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
            {errors.id && <FormHelperText>Class ID is required</FormHelperText>}
          </FormControl>

          <FormControl fullWidth margin="dense" error={errors.name}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <FormHelperText>Name is required</FormHelperText>}
          </FormControl>

          <FormControl fullWidth margin="dense" error={errors.maxOccupancy}>
            <TextField
              label="Max Seats"
              variant="outlined"
              name="maxOccupancy"
              value={formData.maxOccupancy}
              onChange={handleChange}
              required
              type="number"
            />
            {errors.maxOccupancy && (
              <FormHelperText>Valid max occupancy is required</FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={classes.submitButton}
          >
            CREATE CLASS
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateClassForm;
