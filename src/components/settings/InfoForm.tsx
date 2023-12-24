import { MenuItem, Paper, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const gender = [
  {
    value: "male",
    label: "male",
  },
  {
    value: "female",
    label: "female",
  },
  {
    value: "none",
    label: "none",
  },
];

export const InfoForm = () => {
  return (
    <Paper
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        borderRadius: 3,
        padding: "10px 50px 50px 50px",
      }}
    >
      <h3>General Information</h3>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="First Name"
          size="small"
          required
        />
        <TextField
          id="standard-size-normal"
          label="Last Name"
          size="small"
          required
        />
      </div>
      <div>
        <DatePicker />
        <TextField
          select
          label="Select"
          helperText="Please select your gender"
          size="small"
          required
        >
          {gender.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Email"
          size="small"
          required
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Phone"
          size="small"
          required
        />
      </div>
    </Paper>
  );
};
