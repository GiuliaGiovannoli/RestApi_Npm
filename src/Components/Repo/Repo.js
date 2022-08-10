import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Repo.css";

// ui components imported from mui.com
import {
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// the Repo comp will display the dedicated page of each Repo will all of its commits
export default function Repo({ setSearchString }) {
  // param of the url
  const { name } = useParams();

  // setting in an empty array to store all the repo's commits
  const [commits, setCommits] = useState([]);

  // repo's commits total amount
  const [commitsAmount, setCommitsAmount] = useState(0);

  // api url, depending on the repo's title
  const urlCommitsRepo = `${process.env.REACT_APP_PROD_URL}/${name}/commits`;

  useEffect(() => {
    if (name) {
      // fetching repo's commits
      fetch(urlCommitsRepo)
        .then((response) => response.json())
        .then((result) => {
          // repo's commits total amount
          setCommitsAmount(result.length);
          const commitArray = [];
          for (let i = 0; i < result.length; i++) {
            commitArray.push({
              index: i + 1,
              message: result[i].commit.message,
              author: result[i].commit.author.name,
              date: result[i].commit.author.date,
            });
          }
          // repo's commits array
          setCommits(commitArray);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // reset the search
      setSearchString("");
    }
  }, [name, urlCommitsRepo, setSearchString]);

  // show the date and the time of each commit in a formatted string
  function formatDate(date) {
    let fomattedDate = "";
    fomattedDate = date.replaceAll("-", " ").slice(0, 10) + date.slice(10, 16);
    fomattedDate = fomattedDate.replace("T", " ");
    return fomattedDate;
  }

  // The Repo comp will show all of the fetched commits in a table together with the author name and the date
  return (
    <>
      <div className="repoTitle">
        <h2>
          {name} Commits Found: {commitsAmount}{" "}
        </h2>
      </div>
      {commits.length > 0 ? (
        <TableContainer component={Paper} id="tableContainer">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell id="tableTitle">Message</TableCell>
                <TableCell align="right" id="tableTitle">
                  Author
                </TableCell>
                <TableCell align="right" id="tableTitle">
                  Date
                </TableCell>
                <TableCell align="right" id="tableTitle">
                  Index
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                // mapping throught the commits array, if the array has any element
                commits.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.message}
                    </TableCell>
                    <TableCell align="right">{row.author}</TableCell>
                    <TableCell align="right">{formatDate(row.date)}</TableCell>
                    <TableCell align="right">{row.index}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h4 className="delayed">
          No Commit Found for this Repository or the API might not work at the
          moment or the requests limit has been exceeded. .
        </h4>
      )}
    </>
  );
}
