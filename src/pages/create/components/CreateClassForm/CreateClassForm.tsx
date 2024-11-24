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
import { useClassroomsHook } from "../../../../hooks/useClassrooms.hook";
import { ICreateClassroomBody } from "../../../../interfaces/createClassroomBody.interface";

const CreateClassForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    maxOccupancy: "",
  });

  const { createClassroom } = useClassroomsHook();

  const [errors, setErrors] = useState({
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formErrors = { id: false, name: false, maxOccupancy: false };

    // Basic validation
    if (!formData.id) formErrors.id = true;
    if (!formData.name) formErrors.name = true;
    if (!formData.maxOccupancy || isNaN(Number(formData.maxOccupancy)))
      formErrors.maxOccupancy = true;

    setErrors(formErrors);

    // If no errors, handle form submission
    if (!Object.values(formErrors).includes(true)) {
      const createClassroomBody: ICreateClassroomBody = {
        id: formData.id,
        name: formData.name,
        maxOccupancy: Number(formData.maxOccupancy),
      };

      const response = createClassroom(createClassroomBody);      
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
          Create new class
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormControl fullWidth margin="normal" error={errors.id}>
            <TextField
              label="Class ID *"
              variant="outlined"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
            {errors.id && <FormHelperText>Class ID is required</FormHelperText>}
          </FormControl>

          <FormControl fullWidth margin="normal" error={errors.name}>
            <TextField
              label="Name *"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <FormHelperText>Name is required</FormHelperText>}
          </FormControl>

          <FormControl fullWidth margin="normal" error={errors.maxOccupancy}>
            <TextField
              label="Max Seats *"
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
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            CREATE CLASS
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateClassForm;
