import React, { useState, useImperativeHandle, forwardRef } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  FormHelperText,
} from "@mui/material";
import { useValue } from "../../../context/ContextProvider";
import InfoField from "./InfoField";

const AddDetails = forwardRef((props, ref) => {
  const {
    state: {
      details: { title, description, type },
    },
    dispatch,
  } = useValue();

  const [binType, setBinType] = useState(type || "");
  const [binTypeError, setBinTypeError] = useState(false);

  const handleBinTypeChange = (e) => {
    const newBinType = e.target.value;
    setBinType(newBinType);
    setBinTypeError(false); // Clear the error on selecting a bin type

    dispatch({
      type: "UPDATE_DETAILS",
      payload: {
        type: newBinType,
      },
    });
  };

  // Validation function exposed to parent via ref
  useImperativeHandle(ref, () => ({
    validateBinType: () => {
      if (!binType) {
        setBinTypeError(true); // Set error if binType is not selected
        return false;
      }
      return true;
    },
  }));

  return (
    <Stack
      sx={{
        alignItems: "center",
        "& .MuiTextField-root": { width: "100%", maxWidth: 500, m: 1 },
      }}
    >
      <FormControl required error={binTypeError}>
        <RadioGroup
          name="binType"
          value={binType}
          row
          onChange={handleBinTypeChange}
        >
          <FormControlLabel
            value="recycle"
            control={<Radio />}
            label="Recycle"
          />
          <FormControlLabel value="trash" control={<Radio />} label="Trash" />
          <FormControlLabel
            value="compost"
            control={<Radio />}
            label="Compost"
          />
        </RadioGroup>
        {binTypeError && (
          <FormHelperText error>Please select a bin type</FormHelperText>
        )}
      </FormControl>
      <InfoField
        mainProps={{ name: "title", label: "Title", value: title }}
        minLength={5}
      />
      <InfoField
        mainProps={{
          name: "description",
          label: "Description",
          value: description,
        }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 4 }}
      />
    </Stack>
  );
});

export default AddDetails;
