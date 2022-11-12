// commentEditor.js
// Page Description:
//                  Page for the Copy Editor to edit the articles that have been
//                  saved as drafts.                    
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 27 2022 
//
//Modificaiton Log:
//                   
//



//import styles from '../styles/quillTestStyle.css'
import 'react-quill/dist/quill.snow.css'
import styles from '../styles/quill.module.css'
import styles2 from '../styles/article.module.css'
import {Button , Container, TextField, Box, Grid, Typography} from '@mui/material';


import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'


import React, { useState } from 'react';

// we import react-quill dynamically, to avoid including it in server-side 
// and we will render a loading state while the dynamic component is being loaded.
const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,

	})
    let test = null
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
    const [value=article, setValue] = useState();

    // Handles the contents of the article editor.
    const [commentValue, setCommentValue] = useState();

    

    // Handle the log out button
    const logOut = async (event) => {
        router.push("/")
    }

    // Handles the submit event from submit edits
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        //console.log(value)
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
        
        <div>
        
                <Button sx={{
                    position: 'absolute',
                    right: 5,
                    top: 5,}}
                 variant='contained' color='error' onClick={logOut}>Log Out</Button>
            </div>
        
        <Box className={styles.editorDiv} 
            sx={{
                backgroundColor: 'blue',
            }}>
            <TextField
                sx={{
                    padding: 0,
                    marginLeft: -1,
                    marginTop: -1,
                }}
                variant = 'filled'
                size='small'
                label='Editor Name'
                id='editor'
                name='editor'
                required
                />
        
            <Container id="quillEditor" >
            
            </Container>
                <br></br>
                <br></br>
            
            <Grid container spacing={2}>
                 <Container className={styles.Editor}>
                    <QuillNoSSRWrapper id="article" modules={articleModules} value={value} onChange={setValue} formats={articleFormats} theme="snow"/>
                    <br></br><br></br>
                </Container> 

            <div className={styles.comments}>
            <Typography sx={{marginBottom: 4}}>Edits</Typography>

                <form onSubmit={handleSubmit}>
                
                <QuillNoSSRWrapper id="comments" modules={modules} placeholder='' value={commentValue} onChange={setCommentValue} formats={formats} theme="snow" /><br></br><br></br>
                {//To see the placeholder the host computer cant be in dark mode. (dont know how to edit the color of the placeholder text)
                }
                 <Button sx={{
                backgroundColor: '#232023',
                }}
                color = 'error'
                variant = 'contained' 
                type="submit">Submit</Button>
                </form>
            </div>
            </Grid>
            
        </Box>
        
        
        </>
    )
    }

export default PageWithJSbasedForm