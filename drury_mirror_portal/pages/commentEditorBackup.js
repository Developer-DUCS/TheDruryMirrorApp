// // commentEditor.js
// // Page Description:
// //                  Page for the Copy Editor to edit the articles that have been
// //                  saved as drafts.
// //Creation Date:
// //                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 27 2022
// //
// //Modificaiton Log:
// //                  !!!!ADD COMMENT BUG: CANT HANDLE A SINGLE HIGHLIGHTED SPACE IN THE TEXT!!!!
// //                  !!!!ADD COMMENT BUG: CAN'T COMMENT OVER AN EXIST COMMENT!!!!
// //                  TODO:: FIX NAMING CONVENTIONS
// //
// //

// //import styles from '../styles/quillTestStyle.css'
// import "react-quill/dist/quill.snow.css";
// import styles from "../styles/quill.module.css";
// import styles2 from "../styles/article.module.css";
// import { styled } from "@mui/material/styles";

// import dynamic from "next/dynamic";
// import { useRouter } from "next/router";
// import { Button, Container, TextField, Box, Typography } from "@mui/material";

// import React, { useState, Component } from "react";
// import { ReactDOM } from "react";
// import { REACT_LOADABLE_MANIFEST } from "next/dist/shared/lib/constants";
// import { createRoot } from "react-dom/client";

// // we import react-quill dynamically, to avoid including it in server-side
// // and we will render a loading state while the dynamic component is being loaded.
// const QuillNoSSRWrapper = dynamic(import("react-quill"), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// });

// const colorProps = styled(Button)({
//   color: "white",
//   backgroundColor: "white",
//   "&:hover": {
//     backgroundColor: "grey",
//   },
// });

// const articleModules = {
//   toolbar: [["bold", "italic", "underline", "strike"], [{ background: [] }]],
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   },
// };

// const articleFormats = ["bold", "italic", "underline", "strike", "background"];

// const modules = {
//   toolbar: [
//     [{ header: "1" }, { header: "2" }],
//     ["bold", "italic", "underline", "strike"],
//     [{ color: [] }, { background: [] }],
//     [{ list: "ordered" }, { list: "bullet" }],
//   ],
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   },
// };
// /*
//  * Quill editor formats
//  * See https://quilljs.com/docs/formats/
//  */
// const formats = [
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "color",
//   "background",
//   "list",
//   "bullet",
// ];

// // Function to load the article in the let editor
// export async function getStaticProps() {
//   console.log("Getting Article");

//   // Get the article (todo: that the user clicked on)
//   const endpoint = "http://localhost:3000/api/getArticle";

//   const options = {
//     // The method is POST because we are sending data.
//     method: "GET",
//     // Tell the server we're sending JSON.
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   // Wait for the article to come back from the database
//   const data = await fetch(endpoint, options);

//   if (data.status == 200) {
//     console.log("recieving article");

//     let article = await data.json();
//     return { props: { article } };
//   }
//   // else {
//   //     console.log("there was an error")
//   //     return { props: "{<p>test</p>}" }
//   // }
// }

// let commentId = 0;

// export function PageWithJSbasedForm({ article }) {
//   const router = useRouter();

//   // Put the article from the api in the left editor and handle the
//   // changes that the copy editor makes

//   let [value = article, setValue] = useState();

//   // Handle the log out button
//   const logOut = async (event) => {
//     router.push("/");
//   };

//   // Handles the submit event from submit edits
//   const handleSubmit = async (event) => {
//     // Stop the form from submitting and refreshing the page.
//     event.preventDefault();

//     // Get data from the form.
//     const data = {
//       //first: event.target.first.value,
//       //last: event.target.last.value,
//       article: value,
//     };

//     // Send the data to the server in JSON format.
//     console.log(data);
//     const JSONdata = JSON.stringify(data);
//     console.log(JSONdata);

//     // API endpoint where we send form data.
//     const endpoint = "/api/saveArticle";

//     // Form the request for sending data to the server.
//     const options = {
//       // The method is POST because we are sending data.
//       method: "POST",
//       // Tell the server we're sending JSON.
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // Body of the request is the JSON data we created above.
//       body: JSONdata,
//     };

//     // Send the form data to our forms API on Vercel and get a response.
//     const response = await fetch(endpoint, options);

//     // Get the response data from server as JSON.
//     // If server returns the name submitted, that means the form works.
//     const result = await response.json();
//   };

//   const addComment = async (event) => {
//     console.log("pressed button");
//     commentId = commentId + 1;
//     console.log(commentId);
//     //Grabs the cursor highlighted text
//     var comment = window.getSelection().toString();

//     //Identifies the index of the beginning of the comment
//     let start = value.indexOf(comment);

//     //empty arrays to fill and compare to check that the highlighted text or is not in the article
//     let check = [];
//     let com = [];

//     //iterates through the article where the comment should be and adds it to an array
//     for (let i = start; i < value.length; i++) {
//       check.push(value.charAt(i));
//       if (i == start + comment.length - 1) {
//         console.log(check.toString());
//         break;
//       }
//     }

//     //adds the comment into an array
//     for (let x = 0; x < comment.length; x++) {
//       com.push(comment[x]);
//     }
//     console.log(com.toString());

//     //compares the two arrays to check if highlighted text is in article
//     if (check.toString() === com.toString()) {
//       //Creates the new comment div
//       var label = document.createElement("Label");
//       label.setAttribute("for", input);
//       label.innerHTML = "Comment";

//       var input = document.createElement("textarea");

//       //var button = React.createElement("button", colorProps);
//       var button = React.createElement(Button, {
//         variant: "contained",
//         color: "secondary",
//         onclick: resolve,
//         id: `button ${commentId}`,
//       });

//       var box = React.createElement(Box, {
//         id: `div ${commentId}`,
//       });

//       const rootID = document.getElementById(box.id);
//       const root = createRoot(rootID);
//       root.render(button);

//       //Called the resolve function on a click
//       //button.onclick = resolve;

//       //Highlights comment when associated comment box has the mouse over
//       input.onmouseover = mouseover;
//       input.onmouseleave = mouseleave;

//       //Increment the comment id value
//       box.setAttribute("id", "div" + commentId);
//       input.setAttribute("id", "input" + commentId);

//       const rootID = document.getElementById(`div ${commentId}`);
//       const root = createRoot(rootID);
//       root.render(button);

//       box.innerHTML = "<br></br>";

//       //Appends the new comment to the <ul>
//       box.append(label, input, button);

//       //ReactDOM.render(button, document.querySelector("#div"+commentId));

//       //Gets the index of the beginning of the highlighted text
//       var index = value.indexOf(comment);

//       //Gets the length of the highlight text
//       var range = comment.length;

//       console.log(
//         " Starting at index: " +
//           index +
//           " Length of highlighted comment: " +
//           range
//       );

//       //Adds <span></span> tags to highlight the text in the article
//       if (index >= 0) {
//         document.getElementsByClassName("ql-editor")[0].innerHTML =
//           value.substring(0, index) +
//           "<span id=span" +
//           commentId +
//           ' style="background-color: rgb(255, 255, 0); color:black;">' +
//           value.substring(index, index + range) +
//           "</span>" +
//           value.substring(index + range);
//         console.log(
//           "ql-editor: " +
//             document.getElementsByClassName("ql-editor")[0].innerHTML
//         );
//       }
//       //Append the element in page (in span).
//       textId.append(box);
//     } else {
//       let notice = document.getElementById("notice");
//       notice.hidden = false;
//       await new Promise((r) => setTimeout(r, 3000));
//       notice.hidden = true;
//     }
//   };

//   const resolve = async (event) => {
//     console.log("resolved clicked");
//     //Gets the id of the button that triggered the event
//     let buttonId = event.path[0].id;
//     console.log(buttonId);

//     //Splits the number from the id of the button
//     let num = buttonId.split("n");
//     console.log(num[1].toString());

//     //Uses the number from the button id to get the id of the div its in
//     let tempDiv = "div";
//     let tempDivId = tempDiv.concat(num[1].toString());

//     //Uses the number from the button id to get the id of the span with the related comment
//     let tempSpan = "span";
//     let tempSpanId = tempSpan.concat(num[1].toString());

//     console.log(tempDivId);
//     console.log(tempSpanId);

//     console.log(document.getElementById(tempDivId));
//     console.log(document.getElementById(tempSpanId));

//     //Removes the span tags around the comment
//     document.getElementById(tempSpanId).removeAttribute("style");

//     //Removes the div that the button that is clicked is in
//     document.getElementById(tempDivId).remove();

//     //Prevents the page from completely reloading
//     event.preventDefault();
//   };

//   const mouseover = async (event) => {
//     let inputId = event.path[0].id;

//     let num = inputId.split("t");

//     let tempCom = "span";
//     let tempComId = tempCom.concat(num[1].toString());

//     document
//       .getElementById(tempComId)
//       .setAttribute("style", "background-color: blue");
//   };

//   const mouseleave = async (event) => {
//     let inputId = event.path[0].id;

//     let num = inputId.split("t");

//     let tempCom = "span";
//     let tempComId = tempCom.concat(num[1].toString());

//     document
//       .getElementById(tempComId)
//       .setAttribute("style", "background-color: rgb(255,255,0); color:black;");
//   };

//   const submit = (event) => {
//     event.preventDefault();
//     //console.log("Comments:", event.target.input1.value)
//     // console.log("Overall Comments:", event.target.overAllComments.value)
//     // console.log("list", event.target.getElementsByTagName("div"))
//     let x = event.target.getElementsByTagName("textarea");
//     let y = x.length;
//     let i = 1;
//     let commentsArray = [];
//     let overAllComments = x[0].value;
//     console.log("OverAllComments:", overAllComments);

//     if (y > 1) {
//       while (y > 1) {
//         if (x[i].value != null) {
//           let com = [x[i].value, x[i].id];
//           commentsArray.push(com);
//           y = y - 1;
//         }
//         i = i + 1;
//       }
//     } else {
//       console.log("List was Empty");
//     }

//     console.log(commentsArray);
//   };

//   return (
//     // We pass the event to the handleSubmit() function on submit.
//     <div className={styles2.divWriting}>
//       <Button
//         sx={{
//           position: "absolute",
//           right: 35,
//           top: 25,
//         }}
//         variant="contained"
//         color="error"
//         onClick={logOut}
//       >
//         Log Out
//       </Button>

//       <div id="quillEditor" className={styles.Editor}>
//         <Button
//           size="small"
//           sx={{
//             backgroundColor: "white",
//           }}
//           onClick={addComment}
//         >
//           Add Comment
//         </Button>

//         <br></br>
//         <br></br>
//         <Box
//           sx={{
//             backgroundColor: "white",
//           }}
//         >
//           <QuillNoSSRWrapper
//             id="article"
//             modules={articleModules}
//             value={value}
//             onChange={setValue}
//             formats={articleFormats}
//             theme="snow"
//           />
//           <br></br>
//           <br></br>
//         </Box>
//         <div id="notice" hidden>
//           {/* make red */}
//           <text>Please hightlight in the draft</text>
//         </div>
//       </div>

//       <div className={styles.comments}>
//         <form onSubmit={submit}>
//           <Typography variant="h4" color="white">
//             Overall Comments
//           </Typography>{" "}
//           <br></br>
//           <textarea id="overAllComments"></textarea> <br></br>
//           <Typography variant="h4">Comments</Typography>
//           <ul id="textId"></ul>
//           <Button color="error" variant="contained" type="submit">
//             Submit Edits
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PageWithJSbasedForm;
