import "./Settings.css";
import { Button } from "@mui/material";
import { InfoForm } from "../../components/settings/InfoForm";
import { AddressForm } from "../../components/settings/AddressForm";
import { BankAccountForm } from "../../components/settings/BankAccountForm";
import { Box } from "@mui/system";

export const Settings = () => {
    return (
        <>
            <h2>Settings</h2>
            <Box
                sx={{
                    display: 'flex',
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
            >   
                <div>
                    <InfoForm />
                    <br />
                    <AddressForm />
                </div>
                <div style={{width: "50px"}}></div>
                <div>
                    <BankAccountForm />
                </div>
            </Box>
            <br />
            <Button variant="contained">Save</Button>
        </>
    )
};