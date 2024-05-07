import "./Footer.css";
import {
    CFooter,
    CLink
} from "@coreui/react";
import { Grid } from "@mui/material";
import ContactInfo from "./ContactInfo";

export const Footer = () => {
    return (
        <CFooter style={{ 
            marginTop: "50px",
            padding: "10px 50px",
            width: "100%",
            background: "#1876d1",
        }} 
        className="footer"
        >
            <Grid container rowSpacing={1} columnSpacing={2}>
                <Grid item xs={3}>
                    <div className="footer-block">
                        <h2>Customer Care</h2>
                        <div>
                            <p>Contact Us</p>
                            <p>FAQs</p>
                            <p>Terms of Service</p>
                            <p>Privacy Policy</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="footer-block">
                        <h2>Categories</h2>
                        <div>
                            <p>Laptop</p>
                            <p>Phone</p>
                            <p>Tablet</p>
                            <p>Headphone</p>
                            <p>Smart Watch</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="footer-block">
                        <h2>About Us</h2>
                        <div>
                            <p>Company</p>
                            <p>Leadership</p>
                            <p>Careers</p>
                            <p>Customers</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                <div className="footer-block">
                        <h2>Contact</h2>
                        <ContactInfo />
                    </div>
                </Grid>
            </Grid>
            <hr className="footer-hr" />
            <div className="copy-right">
                <div>
                    <CLink href="/"
                        style={{ color: "black" }}
                    >
                        Ecoin
                    </CLink>
                    <span> &copy; 2024 creativeLabs.</span>
                </div>
                <div>
                    <span>
                        Powered by
                    </span>
                    <CLink href="/"
                        style={{ color: "black" }}
                    > NOVA</CLink>
                </div>
            </div>
        </CFooter>
    )
};