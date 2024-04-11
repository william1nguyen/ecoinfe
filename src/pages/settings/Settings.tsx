import "./Settings.css";
import { Button } from "@mui/material";
import { InfoForm } from "../../components/settings/InfoForm";
import { AddressForm } from "../../components/settings/AddressForm";
import { BankAccountForm } from "../../components/settings/BankAccountForm";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export const Settings = () => {
  // General Information
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [genderChoosen, setGenderChoosen] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Address
  const [homeAddress, setHomeAddress] = useState("");
  const [homeNumber, setHomeNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  // bank account
  const [bankname, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cookies, ,] = useCookies(["access-token"]);

  useEffect(() => {
    const getInitialData = async () => {
      const url = import.meta.env.VITE_API_ROOT + "/api/info";
      const headers = {
        Authorization: "Bearer " + cookies["access-token"],
      };

      const user_info: any = await axios({
        method: "GET",
        url: url,
        headers: headers,
      });

      const response = user_info.data["user_info"];

      setFirstName(response["firstname"]);
      setLastName(response["lastname"]);
      setDateOfBirth(response["date_of_birth"]);
      setGenderChoosen(response["gender"]);
      setEmail(response["email"]);
      setPhone(response["phone"]);

      setHomeAddress(response["home_address"]);
      setHomeNumber(response["home_number"]);
      setCity(response["city"]);
      setState(response["state"]);
      setZipCode(response["zip"]);

      setBankName(response["bankname"]);
      setAccountHolder(response["account_holder"]);
      setAccountNumber(response["account_number"]);
    };

    getInitialData();
  }, []);

  const hanleSubmit = async (event: any) => {
    event.preventDefault();
    const url = import.meta.env.VITE_API_ROOT + "/api/info";
    const headers = {
      Authorization: "Bearer " + cookies["access-token"],
    };

    await axios({
      method: "POST",
      url: url,
      headers: headers,
      data: {
        firstname: firstname,
        lastname: lastname,
        date_of_birth: dateOfBirth,
        gender: genderChoosen,
        email: email,
        phone: phone,

        home_address: homeAddress,
        home_number: homeNumber,
        city: city,
        state: state,
        zip: zipCode,

        bankname: bankname,
        account_holder: accountHolder,
        account_number: accountNumber,
      },
    });
  };

  return (
    <>
      <h2>Settings</h2>
      <form>
        <Box
          sx={{
            display: "flex",
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
        >
          <div>
            <InfoForm
              firstname={firstname}
              setFirstName={setFirstName}
              lastname={lastname}
              setLastName={setLastName}
              dateOfBirth={dateOfBirth}
              setDateOfBirth={setDateOfBirth}
              genderChoosen={genderChoosen}
              setGenderChoosen={setGenderChoosen}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
            />
            <br />
            <AddressForm
              homeAddress={homeAddress}
              setHomeAddress={setHomeAddress}
              homeNumber={homeNumber}
              setHomeNumber={setHomeNumber}
              city={city}
              setCity={setCity}
              state={state}
              setState={setState}
              zipCode={zipCode}
              setZipCode={setZipCode}
            />
          </div>
          <div style={{ width: "50px" }}></div>
          <div>
            <BankAccountForm
              bankname={bankname}
              setBankName={setBankName}
              accountHolder={accountHolder}
              setAccountHolder={setAccountHolder}
              accountNumber={accountNumber}
              setAccountNumber={setAccountNumber}
            />
          </div>
        </Box>
        <br />
        <Button variant="contained" onClick={hanleSubmit}>
          Save
        </Button>
      </form>
    </>
  );
};
