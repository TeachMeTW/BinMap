import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useValue } from "../../../context/ContextProvider";
import InfoField from "./InfoField";

const AddDetails = () => {
  const {
    state: {
      details: { title, description, type },
    },
    dispatch,
  } = useValue();

  const [binType, setBinType] = useState("");
  const handleBinTypeChange = (e) => {
    const binType = e.target.value;
    setBinType(binType);
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        "& .MuiTextField-root": { width: "100%", maxWidth: 500, m: 1 },
      }}
    >
      <FormControl>
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
};

export default AddDetails;
