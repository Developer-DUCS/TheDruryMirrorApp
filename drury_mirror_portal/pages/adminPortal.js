//Modificaiton Log:
//
// 12/03 - Thomas O. standardized the styling on this page to match the other portals' styling               
// 

//Landing page for the admin after they log in to the site

import styles from "../styles/article.module.css";
import { TextField, Button, FormGroup, Grid, Typography, Stack } from "@mui/material";
import Card from "@mui/material/Card";

import Toolbar from "@mui/material/Toolbar";

import { useRouter } from "next/router";

export function adminPortal({ articles }) {
  const parse = require("html-react-parser");
  const router = useRouter();

  // Handle the log out button
  const logOut = async (event) => {
    router.push("/");
  };

  // Handle the write draft button
  const writeDraftRoute = async (event) => {
    router.push("articleWriting");
  };

  // Handle the edit article button
  const editArticleRoute = async (event) => {
    router.push("commentEditor");
  };

  return (
    <div>
      <Toolbar sx={{ marginTop: "10px" }}>
        <Typography variant="h2" sx={{ flexGrow: 5 }}>
          Drury Mirror
        </Typography>

        <Button
          variant="contained"
          sx={{ marginRight: 3, color: "white", backgroundColor: "#4685F5" }}
          onClick={writeDraftRoute}
        >
          Write Draft
        </Button>

        <Button variant="contained" color="error" onClick={logOut}>
          Log Out
        </Button>
      </Toolbar>

      <Typography variant="h2" sx={{ marginLeft: 3 }}>
        Article List
      </Typography>

      <div>
        {articles.map((article) => (
          <Card
            style={{
              backgroundColor: "#41414B",
              margin: 15,
              padding: 5,
              paddingLeft: 15,
              boxShadow: 2,
            }}
          >
            <Typography variant="h3">{article.headline}</Typography>
            <Typography variant="h5">{article.author}</Typography>
            <Typography variant="h5">{parse(article.body)}</Typography>
            <Button
              id="edit"
              variant="contained"
              onClick={editArticleRoute}
              sx={{
                marginBottom: 1,
                marginRight: 5,
                color: "white",
                backgroundColor: "#4685F5",
              }}
            >
              Edit Article
            </Button>
            <Button
              id="publish"
              variant="contained"
              color="error"
              sx={{ marginLeft: 1, marginBottom: 1 }}
            >
              Ready to Publish
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  console.log("Getting Articles");

  const endpoint = "http://localhost:3000/api/getArticles";

  // Form the request for sending data to the server.
  const options = {
    // The method is POST because we are sending data.
    method: "GET",
    // Tell the server we're sending JSON.
    headers: {
      "Content-Type": "application/json",
    },
    // Body of the request is the JSON data we created above.
    //body: JSONdata,
  };

  // Send the form data to our forms API on Vercel and get a response.
  const data = await fetch(endpoint, options);

  if (data.status == 200) {
    console.log("recieving data");
    let articles = await data.json();
    console.log(articles);
    console.log(articles[0]);
    return { props: { articles } };
  } else {
  }
}

export default adminPortal;
