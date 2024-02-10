import { MenuItem, Paper, TextField } from "@mui/material";

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

export const InfoForm = ({
  firstname,
  setFirstName,
  lastname,
  setLastName,
  dateOfBirth,
  setDateOfBirth,
  genderChoosen,
  setGenderChoosen,
  email,
  setEmail,
  phone,
  setPhone,
}: any) => {
  const handleFirstNameChange = (event: any) => {
    firstname = event.target.value;
    setFirstName(firstname);
  };

  const handleLastNameChange = (event: any) => {
    lastname = event.target.value;
    setLastName(lastname);
  };

  const handleDateOfBirthChange = (event: any) => {
    dateOfBirth = event.target.value;
    setDateOfBirth(dateOfBirth);
  };

  const handleGenderChoosenChange = (event: any) => {
    genderChoosen = event.target.value;
    setGenderChoosen(genderChoosen);
  };

  const handleEmailChange = (event: any) => {
    email = event.target.value;
    setEmail(email);
  };

  const handlePhoneChange = (event: any) => {
    phone = event.target.value;
    setPhone(phone);
  };

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
          value={firstname}
          onChange={handleFirstNameChange}
          required
        />
        <TextField
          id="standard-size-normal"
          label="Last Name"
          size="small"
          value={lastname}
          onChange={handleLastNameChange}
          required
        />
      </div>
      <div>
        <TextField
          id="standard-size-normal"
          label="Date Of Birth"
          size="small"
          value={dateOfBirth}
          onChange={handleDateOfBirthChange}
          required
        />
        <TextField
          select
          label="Select"
          helperText="Please select your gender"
          value={genderChoosen}
          size="small"
          onChange={handleGenderChoosenChange}
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
          value={email}
          size="small"
          onChange={handleEmailChange}
          required
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Phone"
          value={phone}
          size="small"
          onChange={handlePhoneChange}
          required
        />
      </div>
    </Paper>
  );
};
