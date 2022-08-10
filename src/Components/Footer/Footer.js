import React from "react";

import "./Footer.css";

// icons
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

// footer component
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>Copyright &copy; {year}</p>
      <a
        href="https://github.com/GiuliaGiovannoli"
        rel="noreferrer"
        target={"_blank"}
      >
        <GitHubIcon id="icons" />
      </a>
      <a
        href="https://www.linkedin.com/in/giulia-giovannoli/"
        rel="noreferrer"
        target={"_blank"}
      >
        <LinkedInIcon id="icons" />
      </a>
    </footer>
  );
}
