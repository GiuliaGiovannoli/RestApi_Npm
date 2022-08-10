import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Card.css";

// ui components imported from https://mui.com/
import { Grid, Paper, Typography } from "@mui/material";
// icons
import TranslateIcon from "@mui/icons-material/Translate";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AltRouteIcon from "@mui/icons-material/AltRoute";

// The Card comp will display each repo in a box
// the url is passed from the List comp
// if the user click on any repo box it will redirect to the "/:reponame" dedicated page and the clickToRepo boolean will become true
export default function Card({ url, setClickToRepo }) {
  // storing in an empty obj the info about each repo
  const [repoData, setRepoData] = useState({
    name: "",
    visibility: "",
    description: "",
    language: "",
    stars: "",
    forks: "",
  });

  useEffect(() => {
    // fetching data about each repo through the url var (declared in List.js)
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setRepoData({
          name: result.name,
          visibility: result.visibility,
          description: result.description,
          language:
            result.language === null ? result.source.language : result.language,
          stars: result.stargazers_count,
          forks: result.forks,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [url]);

  //The box is wrapped on a Link comp that will redirect the user to the "/:reponame" dedicated page
  return (
    <Link
      id="linkStyle"
      // path to the "/:reponame" dedicated page
      to={`/${repoData.name}`}
      // the click event will set the boolean to true and allow the user to go to the "/:reponame" dedicated page
      onClick={() => setClickToRepo(true)}
    >
      <Paper
        id="cardContainer"
        sx={{
          p: 2,
          margin: "auto",
          width: 360,
          height: 130,
        }}
      >
        <Grid container spacing={2}>
          <Grid item container>
            <Grid item xs container direction="column">
              <Grid item>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  id="repoName"
                >
                  {repoData.name}
                </Typography>
                <Typography variant="body2" gutterBottom id="info">
                  {repoData.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ positio: "absolute", bottom: 0 }}
                >
                  <TranslateIcon id="firstIcon" /> {repoData.language}
                  <AltRouteIcon id="secondIcon" /> {repoData.forks}
                  <StarOutlineIcon id="thirdIcon" /> {repoData.stars}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div" id="public">
                {repoData.visibility}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Link>
  );
}
