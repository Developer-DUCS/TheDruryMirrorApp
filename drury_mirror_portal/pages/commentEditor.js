//import styles from '../styles/quillTestStyle.css'
import 'react-quill/dist/quill.snow.css'
import styles from '../styles/quill.module.css'
import dynamic from 'next/dynamic'

import React, { useState } from 'react';
//import parse from 'html-react-parser';


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

export default function PageWithJSbasedForm() {
    // Handles the contents of the article editor.
    //const [value="test", setValue] = useState();
    const [value, setValue] = useState();
    const [commentValue, setCommentValue] = useState();

    // Handles the submit event on form submit.

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        console.log(value)
        event.preventDefault()
    
        // Get data from the form.
        const data = {
        first: event.target.first.value,
        last: event.target.last.value,
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
    return (
        // We pass the event to the handleSubmit() function on submit.
        <>
        <div className={styles.editorDiv}>
            <div id="quillEditor" className={styles.Editor}>
                <label htmlFor="first">Editor Name</label> <br></br>
                <input type="text" id="editor" name="editor" required /><br></br><br></br>
                
                <QuillNoSSRWrapper id="article" modules={articleModules} value={value} onChange={setValue} formats={articleFormats} theme="snow"/><br></br><br></br>

            </div>

            <div className={styles.comments}>
                <form onSubmit={handleSubmit}>
                <label htmlFor="comments">Edits</label> <br></br> <br></br>
                <QuillNoSSRWrapper id="comments" modules={modules} placeholder='' value={commentValue} onChange={setCommentValue} formats={formats} theme="snow" /><br></br><br></br>
                {//To see the placeholder the host computer cant be in dark mode. (dont know how to edit the color of the placeholder text)
                }
                <button type="submit" className={styles.button}>Submit Edits</button>
                </form>
            </div>
        </div>  
        </>
    )
    }
