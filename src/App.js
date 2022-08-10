import React, { useEffect, useState } from "react"; // impporting react and its hooks
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom"; // importing routes

// importing internal components
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Repo from "./Components/Repo/Repo";

// importing css
import "./App.css";

function App() {
  // api url
  const API_URL = process.env.REACT_APP_PROD_URL;

  // setting an empty obj to store the info about the organization
  const [githubUser, setGithubUser] = useState({
    name: "",
    avatar: "",
    location: "",
    blog: "",
    github: "",
    repos: "",
  });

  // setting an empty string to store the search bar input
  const [searchString, setSearchString] = useState("");

  // if the user click to open the info of any repo, the boolean will become true.
  // this is to avoid the case in which the user can type in the url directly (without cliking on any repo).
  const [clickToRepo, setClickToRepo] = useState(false);

  // param of the url
  const { name } = useParams();

  useEffect(() => {
    // fetching organization's api
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        setGithubUser({
          name: result.name,
          avatar: result.avatar_url,
          location: result.location,
          blog: result.blog,
          github: result.html_url,
          repos: result.repos_url,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // resetting the boolean to false if there is no param on the url
    if (!name) {
      setClickToRepo(false);
    }
  }, [name]);

  // the application will show the correct ui component for each route
  // The Home comp is also passing some props (data) declared in App.js to Home.js
  // The Home comp will be shown on the path "/"
  // The Repo comp will be shown on the path "/:reponame" and only if the user has clicked on the repo link
  // Navigate components are used to redirect the user in the case the user try to access any different url
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                githubUser={githubUser}
                searchString={searchString}
                setSearchString={setSearchString}
                setClickToRepo={setClickToRepo}
              />
            }
          />
          <Route
            exact
            path="/:name"
            element={
              clickToRepo ? (
                <Repo setSearchString={setSearchString} />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
