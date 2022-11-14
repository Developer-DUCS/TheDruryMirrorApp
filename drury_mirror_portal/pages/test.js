// commentEditor.js
// Page Description:
//                  Page for the Copy Editor to edit the articles that have been
//                  saved as drafts.                    
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 27 2022 
//
//Modificaiton Log:
//                  !!!!ADD COMMENT BUG: CANT HANDLE A SINGLE HIGHLIGHTED SPACE IN THE TEXT!!!!
//                  !!!!ADD COMMENT BUG: CAN"T COMMENT OVER AN EXIST COMMENT!!!!
//                   
//



//import styles from '../styles/quillTestStyle.css'
import 'react-quill/dist/quill.snow.css'
import styles from '../styles/quill.module.css'
import styles2 from '../styles/article.module.css'

import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'


import React, {useState} from 'react';

// we import react-quill dynamically, to avoid including it in server-side 
// and we will render a loading state while the dynamic component is being loaded.
const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,

	})

    const articleModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'background': [] }]
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
        }

    const articleFormats = [
        'bold',
        'italic',
        'underline',
        'strike',
        'background',
        ]

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }], 
            [
            { list: 'ordered' },
            { list: 'bullet' },
            ],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
        }
        /*
        * Quill editor formats
        * See https://quilljs.com/docs/formats/
        */
        const formats = [
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'color',
        'background',
        'list',
        'bullet'
        ]

// Function to load the article in the let editor
export async function getStaticProps() {
    console.log("Getting Article")

    // Get the article (todo: that the user clicked on)
    const endpoint = 'http://localhost:3000/api/getArticle'

    const options = {
        // The method is POST because we are sending data.
        method: 'GET',
        // Tell the server we're sending JSON.
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // Wait for the article to come back from the database
    const data = await fetch(endpoint, options)

    if (data.status == 200) {
        console.log("recieving article")

        let article = await data.json()
        return { props: {article} }
    }
    // else {
    //     console.log("there was an error")
    //     return { props: "{<p>test</p>}" }
    // }
}


export function PageWithJSbasedForm({article}) {
    
    const router = useRouter()

    // Put the article from the api in the left editor and handle the 
    // changes that the copy editor makes

    let [value=article, setValue] = useState();

    // Handle the log out button
    const logOut = async (event) => {
        router.push("/")
    }

    // Handles the submit event from submit edits
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
    
        // Get data from the form.
        const data = {
        //first: event.target.first.value,
        //last: event.target.last.value,
        article: value
        }
    
        // Send the data to the server in JSON format.
        console.log(data)
        const JSONdata = JSON.stringify(data)
        console.log(JSONdata)
    
        // API endpoint where we send form data.
        const endpoint = '/api/saveArticle'
    
        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }
    
        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)
    
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()

    }

    let commentId = 0;
    const addComment = async (event) => {

        console.log("pressed button")

        //Grabs the cursor highlighted text
        var comment = window.getSelection().toString()

        //Identifies the index of the beginning of the comment
        let start = value.indexOf(comment)

        //empty arrays to fill and compare to check that the highlighted text or is not in the article
        let check = []
        let com = []

        //iterates through the article where the comment should be and adds it to an array
        for(let i = start; i<value.length; i++){
            check.push(value.charAt(i))
            if(i == start+comment.length-1){
                console.log(check.toString())
                break
            }
        }
        
        //adds the comment into an array 
        for(let x = 0; x<comment.length; x++){
            com.push(comment[x])
        }
        console.log(com.toString())

        //compares the two arrays to check if highlighted text is in article
        if(check.toString() === com.toString()){

    
            //Creates the new comment div
            var label = document.createElement("Label");
            label.setAttribute("for",input);
            label.innerHTML = "Comment";
            var input = document.createElement("textarea");
            var button = document.createElement("button")
            button.innerHTML = "Resolve"
            var box = document.createElement("div")

            // increment the comment id value
            commentId += 1
            box.setAttribute("id",commentId)
            box.innerHTML = "<br></br>"
            
            //Appends the new comment to the <ul> 
            box.append(label,input,button)

            //Gets the index of the beginning of the highlighted text
            var index = value.indexOf(comment)

            //Gets the length of the highlight text
            var range = comment.length

            console.log(" Starting at index: "+index + " Length of highlighted comment: "+range )
            //console.log("Before highlight: "+ value)

            //Adds <span></span> tags to highlight the text in the article
            if (index >= 0) { 
                document.getElementsByClassName("ql-editor")[0].innerHTML = value.substring(0,index) 
                    + '<span style="background-color: rgb(255, 255, 0); color:black;">' 
                    + value.substring(index,index+range) + "</span>" 
                    + value.substring(index + range);
                console.log("ql-editor: "+document.getElementsByClassName("ql-editor")[0].innerHTML)
            }
            //Append the element in page (in span).
            textId.append(box);
        }
        else{
            alert("Please highlight inside the article")
        }
    }
    //TODO
    // const resolve = async (event) => {
    //     
    // }
    
    const testval = async (event) => {
        console.log("value: ", value)
    }
    return (
        // We pass the event to the handleSubmit() function on submit.
        <>
        <button className={styles2.draftButton} onClick={logOut}>Log Out</button>

        <div className={styles.editorDiv}>
            <div id="quillEditor" className={styles.Editor}>
                <button onClick={addComment}>Add Comment</button>
                <button onClick={testval}>value</button>
                
                <br></br>
                <br></br>
                
                <QuillNoSSRWrapper id="article" modules={articleModules} value={value} onChange={setValue} formats={articleFormats} theme="snow"/><br></br><br></br>
            </div>

            <div className={styles.comments}>
                <form>
                    <label>Edits</label> 
                    <ul id="textId">
                    </ul>
                    <button type="submit">Submit Edits</button>
                </form>
                
            </div>
        </div>  
        </>
    )
    }

export default PageWithJSbasedForm