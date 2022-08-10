import React from "react";

import "./Header.css";

// icons & ui components imported
import {
  styled,
  alpha,
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import SearchIcon from "@mui/icons-material/Search";

// styling the search bar component
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// The Header displays a top nav bar with the organization name and a searchbar
export default function Header({ name, setSearchString }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" id="header">
        <Toolbar>
          <GitHubIcon />
          <Typography
            id="title"
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {name} GitHub API
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search here…"
              inputProps={{ "aria-label": "search" }}
              // the input value will be passed back to App.js and App.js will pass it to Home.js to filter the repos to be displayed
              onChange={(event) => setSearchString(event.target.value)}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
