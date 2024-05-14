import {
    Box,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton
} from '@mui/material';
import {
    Menu as MenuIcon
} from '@mui/icons-material';
import React from 'react';
import { Heading } from '../Heading';
import { useNavigate } from 'react-router-dom';

export const SideBar = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleDrawerTagsClick = (event: any) => {
        const tagName = event.target.innerText;

        switch (tagName) {
            case "All Devices":
                navigate("/store");
                break;
            
            case "Laptops":
                navigate("/store/devices/Laptop")
                break;

            case "Phones":
                navigate("/store/devices/Phones")
                break;
            
            case "IPads":
                navigate("/store/devices/iPad")
                break;

            case "HeadPhones":
                navigate("/store/devices/HeadPhones")
                break;
            
            case "Watches":
                navigate("/store/devices/Watch")
                break;

            case "Apple":
                navigate("/store/brand/Apple")
                break;

            case "Samsung":
                navigate("/store/brand/Samsung")
                break;

            case "Plum":
                navigate("/store/brand/Plum")
                break;

            case "ZAGG":
                navigate("/store/brand/ZAGG")
                break;

            case "Settings":
                navigate("/settings")
                break;
        }
    }

    const DrawerList = (
        <Box sx={{ width: 450 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <Heading title="Devices" center small />
                {['All Devices', 'Laptops', 'Phones', 'IPads', 'HeadPhones', 'Watches'].map((text, index) => (
                    <ListItem key={text} tabIndex={index} disablePadding>
                        <ListItemButton
                            onClick={handleDrawerTagsClick}
                        >
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <Heading title="Brand" small center />
                {['Apple', 'Samsung', 'Plum', 'ZAGG'].map((text, index) => (
                    <ListItem key={text} tabIndex={index} disablePadding>
                        <ListItemButton
                            onClick={handleDrawerTagsClick}
                        >
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <Heading title="Help & Settings" center small />
                {['Settings', 'Languages', 'Helps'].map((text, index) => (
                    <ListItem key={text} tabIndex={index} disablePadding>
                        <ListItemButton
                            onClick={handleDrawerTagsClick}
                        >
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}