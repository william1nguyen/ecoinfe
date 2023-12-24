import { Paper, TextField } from "@mui/material";

export const AddressForm = () => {
  return (
    <Paper
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        borderRadius: 3,
        padding: "10px 50px 50px 50px",
      }}
    >
      <h3>Address</h3>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Home Address"
          size="small"
          required
        />
        <TextField
          id="standard-size-normal"
          label="Number"
          size="small"
          required
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="city"
          size="small"
          required
        />
        <TextField
          id="outlined-multiline-flexible"
          label="state"
          size="small"
          required
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="ZIP"
          size="small"
          required
        />
      </div>
    </Paper>
  );
};
