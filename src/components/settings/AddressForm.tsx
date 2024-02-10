import { Paper, TextField } from "@mui/material";

export const AddressForm = ({
  homeAddress,
  setHomeAddress,
  homeNumber,
  setHomeNumber,
  city,
  setCity,
  state,
  setState,
  zipCode,
  setZipCode,
}: any) => {
  const handleHomeAddressChange = (event: any) => {
    homeAddress = event.target.value;
    setHomeAddress(homeAddress);
  };

  const handleHomeNumberChange = (event: any) => {
    homeNumber = event.target.value;
    setHomeNumber(homeNumber);
  };

  const handleCityChange = (event: any) => {
    city = event.target.value;
    setCity(city);
  };

  const handleStateChange = (event: any) => {
    state = event.target.value;
    setState(state);
  };

  const handleZipCodeChange = (event: any) => {
    zipCode = event.target.value;
    setZipCode(zipCode);
  };

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
          value={homeAddress}
          onChange={handleHomeAddressChange}
          required
        />
        <TextField
          id="standard-size-normal"
          label="Number"
          size="small"
          value={homeNumber}
          onChange={handleHomeNumberChange}
          required
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="city"
          size="small"
          value={city}
          onChange={handleCityChange}
          required
        />
        <TextField
          id="outlined-multiline-flexible"
          label="state"
          size="small"
          value={state}
          onChange={handleStateChange}
          required
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="ZIP"
          size="small"
          value={zipCode}
          onChange={handleZipCodeChange}
          required
        />
      </div>
    </Paper>
  );
};
