import { Paper, TextField } from "@mui/material";

export const BankAccountForm = () => {
  return (
    <Paper
      sx={{
        borderRadius: 3,
        padding: "10px 50px 50px 50px",
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': { m: 1,  width: '25ch' },
      }}
    >
      <h3>Bank Account</h3>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Bank name"
          size="small"
          required
        />
        <TextField
          id="standard-size-normal"
          label="Account holder"
          size="small"
          required
        />
        <TextField
          id="standard-size-normal"
          label="Account number"
          size="small"
          required
        />
      </div>
    </Paper>
  );
};
