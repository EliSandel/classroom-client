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
import { useClassroomsHook } from "../../../../hooks/useClassrooms.hook";
import { ICreateClassroomBody } from "../../../../interfaces/createClassroomBody.interface";
import { useStyles } from "./CreateClassForm.style";

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

  const clearFormData = () => {
    setFormData({
      id: "",
      name: "",
      maxOccupancy: "",
    });
  };

  const classes = useStyles();

  const { createClassroom } = useClassroomsHook();

  const [errors, setErrors] = useState<IFormErrors>({
    id: false,
    name: false,
    maxOccupancy: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const formErrors = { id: false, name: false, maxOccupancy: false };

    if (!formData.id) formErrors.id = true;
    if (!formData.name) formErrors.name = true;
    if (!formData.maxOccupancy || isNaN(Number(formData.maxOccupancy)))
      formErrors.maxOccupancy = true;

    setErrors(formErrors);

    if (!Object.values(formErrors).includes(true)) {
      const createClassroomBody: ICreateClassroomBody = {
        id: formData.id,
        name: formData.name,
        maxOccupancy: Number(formData.maxOccupancy),
      };

      try {
        await createClassroom(createClassroomBody);
        alert("Classroom created successfully!");
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
