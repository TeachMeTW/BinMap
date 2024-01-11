import {
  Box,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useValue } from "../../context/ContextProvider";

const TypeFilter = () => {
  const { dispatch } = useValue();
  const [filter, setFilter] = useState({
    recycle: true,
    trash: true,
    compost: true,
    multi: true,
  });

  useEffect(() => {
    dispatch({
      type: "FILTER_TYPE",
      payload: { recycle: true, trash: true, compost: true, multi: true },
    });
  }, []);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    const updatedFilter = { ...filter, [name]: checked };
    console.log("Updating filter:", updatedFilter);
    setFilter(updatedFilter);

    dispatch({ type: "FILTER_TYPE", payload: updatedFilter });
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography>Type of Bin:</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={filter.recycle}
              onChange={handleChange}
              name="recycle"
            />
          }
          label="Recycle"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filter.trash}
              onChange={handleChange}
              name="trash"
            />
          }
          label="Trash"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filter.compost}
              onChange={handleChange}
              name="compost"
            />
          }
          label="Compost"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filter.multi}
              onChange={handleChange}
              name="multi"
            />
          }
          label="MultiType"
        />
      </FormGroup>
    </Box>
  );
};

export default TypeFilter;
