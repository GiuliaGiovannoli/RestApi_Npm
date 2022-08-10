import React, { useEffect, useState } from "react";

import "./Home.css";

// icons & ui components imported
import { styled, Grid, Paper, Typography, ButtonBase } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import CodeIcon from "@mui/icons-material/Code";

// importing internal components
import Header from "../Header/Header";
import List from "../List/List";

// styling the organization's avatar
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

// The Home comp contains the Header comp, a box (grid) displaying the organization's details and the List comp (containg a list of Repos)
export default function Home({
  githubUser, // organization's data
  setSearchString, // it will be passed to the Header comp containing the searchbar
  searchString, // it will be passed to the Header comp containing the searchbar
  setClickToRepo, // it will be passed to the List comp containing the repos list
}) {
  // setting an empty string to store the api's url containing the array with all of the organization's repos
  const [reposUrl, setReposUrl] = useState("");

  // if there are the data of the organization (githubUser), the url can be set
  useEffect(() => {
    if (githubUser.repos !== undefined && githubUser.repos.length > 0) {
      setReposUrl(githubUser.repos);
    }
  }, [githubUser]);

  return (
    <>
      <Header name={githubUser.name} setSearchString={setSearchString} />

      <Paper
        sx={{
          p: 2,
          padding: "30px 10%",
          flexGrow: 1,
          backgroundColor: "#f6f8fa",
          boxShadow: "none",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase
              sx={{ width: 128, height: 128, cursor: "auto" }}
              disabled
            >
              <Img alt="avatar" src={githubUser.avatar} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  id="name"
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                >
                  {githubUser.name}
                </Typography>
                <Typography id="text" variant="body2" gutterBottom>
                  <a href={githubUser.blog} rel="noreferrer" target={"_blank"}>
                    <LinkIcon id="icon" /> {githubUser.blog}
                  </a>
                </Typography>
                <Typography id="text" variant="body2" color="text.secondary">
                  <LocationOnIcon id="icon" /> {githubUser.location}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  id="text"
                  sx={{ cursor: "pointer" }}
                  variant="body2"
                >
                  <a
                    href={githubUser.github}
                    rel="noreferrer"
                    target={"_blank"}
                  >
                    <CodeIcon id="icon" /> GitHub
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <List
        reposUrl={reposUrl}
        searchString={searchString}
        setClickToRepo={setClickToRepo}
      />
    </>
  );
}
