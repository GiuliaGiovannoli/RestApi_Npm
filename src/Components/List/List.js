import React, { useEffect, useState } from "react";

import "./List.css";

// ui components imported from mui.com
import { Grid } from "@mui/material";

// internal component
import Card from "../Card/Card";

// The List comp will map through the array containing all of the organization's repos and return a Card displaying each of the repo's infos
export default function List({ reposUrl, searchString, setClickToRepo }) {
  // array to store each repo api url to be displayed
  const [reposUrlArray, setReposUrlArray] = useState([]);

  // initial array to store each repo api url
  const [initialArray, setinitialArray] = useState([]);

  useEffect(() => {
    // fetching organization's repo api (the reposUrl is declared in Home.js)
    if (reposUrl.length > 0) {
      let urlArray = [];
      fetch(reposUrl)
        .then((response) => response.json())
        .then((result) => {
          for (let i = 0; i < 20; i++) {
            urlArray.push(result[i].url);
          }
          // the initial array has all of repos url
          setinitialArray(urlArray);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    // in case of a search from the user, the initial array of repos url will be filtered, otherwise not
    if (searchString.length > 0 && initialArray.length > 0) {
      let filteredArray = [];
      filteredArray = initialArray.filter((el) =>
        // checking the user searchbar input string for matches with the repo's title
        el.slice(38).includes(searchString) ? el : null
      );
      setReposUrlArray(filteredArray);
    } else {
      setReposUrlArray(initialArray);
    }
  }, [reposUrl, initialArray, searchString]);

  // a responsive grid will display the list
  return (
    <div id="container">
      <h2>Public Repositories: </h2>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {
              // mapping throught the repos url array, if the array has any element
              reposUrlArray.length > 0 ? (
                reposUrlArray.map((value, index) => (
                  <Grid key={index} item>
                    <Card url={value} setClickToRepo={setClickToRepo} />
                  </Grid>
                ))
              ) : (
                <h4 className="delayed">
                  {
                    // display message in case of no repos
                    searchString.length > 0
                      ? "No match found."
                      : "The API might not work at the moment or the requests limit has been exceeded."
                  }
                </h4>
              )
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
