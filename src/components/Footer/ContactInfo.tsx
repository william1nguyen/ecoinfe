import { Grid, IconButton, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

const GridContactInfo = (props: any) => {
    const { Icon, content } = props;
    return (
        <>
            <Grid item xs={2}>
                <IconButton>
                    <Icon />
                </IconButton>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="body1">
                    { content }
                </Typography>
            </Grid>
        </>
    );
}

export const ContactInfo = () => {
    return (
        <Grid container alignItems="center">
            {/* Phone */}
            <GridContactInfo Icon={PhoneIcon} content="+84329922595" />
            {/* Facebook */}
            <GridContactInfo Icon={FacebookIcon} content="Nguyen Viet Anh" />
            {/* Email */}
            <GridContactInfo Icon={EmailIcon} content="vietanhhd03@gmail.com" />
            {/* GitHub */}
            <GridContactInfo Icon={GitHubIcon} content="N0VA" />
        </Grid>
    );
};

export default ContactInfo;
