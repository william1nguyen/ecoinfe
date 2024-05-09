import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu
} from "@mui/material";
import {
  Settings,
  Logout,
  AppRegistrationRounded,
  LoginRounded,
  CatchingPokemon,
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
  Search as SearchIcon
} from "@mui/icons-material";
import { useCookies } from "react-cookie";
import { OrderContext } from "../../contexts/OrderContext";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import toast from "react-hot-toast";

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
  const [, setCookie, removeCookie] = useCookies([
    "access-token",
    "isLoggedIn",
  ]);
  const { isLoggedIn, setIsLoggedIn }: any = React.useContext(LoginContext);
  const { orderItems }: any = React.useContext(OrderContext);
  const [orderItemNumber, setOrderItemNumber]: any = React.useState<
    number | null
  >(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    setOrderItemNumber(orderItems?.length);
  }, [JSON.stringify(orderItems)]);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeCookie("access-token");
    setCookie("isLoggedIn", false, { path: "/", secure: true });
    setIsLoggedIn(false);
    toast.success("Logged Out!");
    navigate("/login");
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
          navigate("/settings");
          setAnchorEl(null);
        }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px"
        }}
      >
        <Settings />
        Setting
      </MenuItem>
      <MenuItem onClick={handleLogout}
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "10px"
      }}>
        <Logout />
        Log out
      </MenuItem>
    </Menu>
  );

  const renderIconWithUserLoggedIn = (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <IconButton
        size="large"
        aria-label="show n new orders"
        color="inherit"
        onClick={() => navigate("/orders/me")}
      >
        <Badge badgeContent={orderItemNumber} color="error">
          <ShoppingCart />
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
        onClick={() => navigate("/login")}
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px"
        }}
      >
        <LoginRounded />
        Login
      </IconButton>
      <IconButton
        size="small"
        color="inherit"
        aria-label="Sign up"
        onClick={() => navigate("/signup")}
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px"
        }}
      >
        <AppRegistrationRounded />
        Sign up
      </IconButton>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
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
              onClick={() => navigate("/")}
            >
              <CatchingPokemon />
              ECOIN
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
          <IconButton
              size="medium"
              color="inherit"
              aria-label="Title"
              onClick={() => navigate("/store")}
            >
              Store
            </IconButton>
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
