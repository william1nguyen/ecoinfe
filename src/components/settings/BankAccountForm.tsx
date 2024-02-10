import { Paper, TextField } from "@mui/material";

export const BankAccountForm = ({
  bankname,
  setBankName,
  accountHolder,
  setAccountHolder,
  accountNumber,
  setAccountNumber,
}: any) => {
  const handleBankNameChange = (event: any) => {
    bankname = event.target.value;
    setBankName(bankname);
  };

  const handleAccountHolderChange = (event: any) => {
    accountHolder = event.target.value;
    setAccountHolder(accountHolder);
  };

  const handleAccountNumberChange = (event: any) => {
    accountNumber = event.target.value;
    setAccountNumber(accountNumber);
  };

  return (
    <Paper
      sx={{
        borderRadius: 3,
        padding: "10px 50px 50px 50px",
        display: "flex",
        flexDirection: "column",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      <h3>Bank Account</h3>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Bank name"
          size="small"
          value={bankname}
          onChange={handleBankNameChange}
          required
        />
        <TextField
          id="standard-size-normal"
          label="Account holder"
          size="small"
          value={accountHolder}
          onChange={handleAccountHolderChange}
          required
        />
        <TextField
          id="standard-size-normal"
          label="Account number"
          size="small"
          value={accountNumber}
          onChange={handleAccountNumberChange}
          required
        />
      </div>
    </Paper>
  );
};
