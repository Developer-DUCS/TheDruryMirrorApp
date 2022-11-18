//import styles from '../styles/quillTestStyle.css'
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import styles from "../styles/article.module.css";

import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Container, TextField, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

//import parse from 'html-react-parser';

// we import react-quill dynamically, to avoid including it in server-side
// and we will render a loading state while the dynamic component is being loaded.
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function PageWithJSbasedForm() {
  // Handles the contents of the article editor.
  const [value, setValue] = useState();
  // Handles the submit event on form submit.

  const router = useRouter();

  // Handle the log out button
  const logOut = async (event) => {
    router.push("/");
  };

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    console.log(value);
    event.preventDefault();

    // Get data from the form.
    const data = {
      first: event.target.first.value,
      last: event.target.last.value,
      article: value,
    };

    // Send the data to the server in JSON format.
    console.log(data);
    const JSONdata = JSON.stringify(data);
    console.log(JSONdata);

    // API endpoint where we send form data.
    const endpoint = "/api/saveArticle";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
  };

  return (
    // We pass the event to the handleSubmit() function on submit.
    <>
      <div className={styles.divWriting}>
        <div>
          <Button
            sx={{
              position: "absolute",
              right: 35,
              top: 25,
            }}
            variant="contained"
            color="error"
            onClick={logOut}
          >
            Log Out
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <Container>
            <TextField
              variant="filled"
              size="small"
              label="First Name"
              id="first"
              name="first"
              sx={{
                input: {
                  color: "white",
                },
                label: {
                  color: "white",
                },
                marginLeft: -1,
              }}
              required
            />
            <TextField
              variant="filled"
              size="small"
              label="Last Name"
              id="last"
              name="last"
              sx={{
                input: {
                  color: "white",
                },
                label: {
                  color: "white",
                },
              }}
              required
            />
          </Container>
          <Box
            sx={{
              backgroundColor: "white",
              margin: 2,
            }}
          >
            <QuillNoSSRWrapper
              id="article"
              modules={modules}
              value={value}
              onChange={setValue}
              formats={formats}
              theme="snow"
            />
          </Box>
          <br></br>
          <br></br>

          <Button
            sx={{
              marginLeft: 2,
            }}
            color="error"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

// export default function Home() {
//     return (
//         <>
//             <div>
//                 <div className="px-6 py-4">
//                     <form id="textEditor" action="#" method="post">
//                         <label htmlFor="first">First name:</label><br></br>
//                         <input type="text" id="first" name="first" /><br></br>
//                         <label htmlFor="last">Last name:</label><br></br>
//                         <input type="text" id="last" name="last" /><br></br>
//                         <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" />
//                         <button type="submit">Submit</button>
//                     </form>
//                 </div>
//             </div>

//         </>
//     )
// }
