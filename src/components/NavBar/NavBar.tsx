import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import AppRegistrationRounded from "@mui/icons-material/AppRegistrationRounded";
import { useCookies } from "react-cookie";
import { OrderContext } from "../../context/OrderContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [cookies, , removeCookie] = useCookies(["access-token"]);
  const [isLoggedIn, setIsLoggedIn] = React.useState<null | Boolean>(false);
  const { orderItems }: any = React.useContext(OrderContext);
  const [orderItemNumber, setOrderItemNumber]: any = React.useState<
    number | null
  >(0);

  React.useEffect(() => {
    if (cookies["access-token"]) {
      setIsLoggedIn(true);
    }
  }, []);

  React.useEffect(() => {
    setOrderItemNumber(orderItems?.length);
  }, [orderItems]);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeCookie("access-token");
    window.location.href = "/login";
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          window.location.href = "/settings";
          setAnchorEl(null);
        }}
      >
        Setting
      </MenuItem>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );

  const renderIconWithUserLoggedIn = (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <IconButton
        size="large"
        aria-label="show n new orders"
        color="inherit"
        onClick={() => (window.location.href = "/orders/me")}
      >
        <Badge badgeContent={orderItemNumber} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </Box>
  );

  const renderIconWithoutUserLoggedIn = (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <IconButton
        size="small"
        color="inherit"
        aria-label="Login"
        onClick={() => (window.location.href = "/login")}
      >
        <LoginRoundedIcon />
        Login
      </IconButton>
      <IconButton
        size="small"
        color="inherit"
        aria-label="Sign up"
        onClick={() => (window.location.href = "/signup")}
      >
        <AppRegistrationRounded />
        Sign up
      </IconButton>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <IconButton
              size="large"
              color="inherit"
              aria-label="Title"
              onClick={() => (window.location.href = "/")}
            >
              <CatchingPokemonIcon />
              ECOM
            </IconButton>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {isLoggedIn
            ? renderIconWithUserLoggedIn
            : renderIconWithoutUserLoggedIn}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};
