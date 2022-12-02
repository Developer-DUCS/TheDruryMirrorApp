// writerPortal.js
// Page Description:
//                  The home page for the writer
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 4 2022 
//
//Modificaiton Log:
//                  
//                   
import styles from '../styles/article.module.css'
import {useRouter} from 'next/router'
import { useSession, signOut, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export function writerPortal(){    
    const router = useRouter()
    const {status, data} = useSession()
    const [getArticles, setArticles] = useState([])
    
    const parse = require('html-react-parser')

    // Redirect the user to the log in screen
    const redirectToSignIn = (event) => {
      event.preventDefault()
      router.push("/")
    }

    // Handle the write draft button
    const writeDraftRoute = async (event) => {
      router.push("articleWriting")
    }

    useEffect(() => {
      const test2 = async ()  => {
        let endpoint = '/api/getArticles'
        let JSONdata = JSON.stringify(data)
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        let data2 = await fetch(endpoint, options)
        let articles = await data2.json()
        console.log(articles[0])
        let arr = []
        if (articles) {
          setArticles(articles)
          console.log("articles", getArticles)
        }
        // .then((response) => response.json())
        // .then((data) => {return data});
 
       // console.log("test: ",data2)
        // articles = data2
        // //console.log("art",articles)
        // let test = []
        // for (let i=0; i< data2.length; i++) {
        //   test.push(data2[i])
        // }
        // //console.log("here",test)
        // return test
    }
    test2()
    // console.log("test",getArticles)
    },[])
    
    // const test2 = async ()  => {
    //     let endpoint = '/api/getArticles'
    //     let JSONdata = JSON.stringify(data)
    //     let options = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         // Body of the request is the JSON data we created above.
    //         body: JSONdata,
    //     }

    //     let data2 = await fetch(endpoint, options)
    //     let articles = await data2.json()
    //     console.log("Articles",articles)
    //     return articles
    //     // .then((response) => response.json())
    //     // .then((data) => {return data});
 
    //    // console.log("test: ",data2)
    //     articles = data2
    //     //console.log("art",articles)
    //     let test = []
    //     for (let i=0; i< data2.length; i++) {
    //       test.push(data2[i])
    //     }
    //     //console.log("here",test)
    //     return test
    // }
        

    if (status === "authenticated") {
      console.log(data.user.role)
      console.log(data.user)
      const role = data.user.role
      
      return (
        
        <>
        <p id="article"></p>
        <div className={styles.divWelcome}>
          <p>{data.user.fname} {data.user.lname}</p>
          <text className={styles.welcome}>Article List</text>
          <button className={styles.draftButton} onClick={() => signOut()}>Log Out</button>
          <button className={styles.draftButton} onClick={writeDraftRoute}>Write Draft</button>
        </div>
        {/* <div className={styles.divArticle}>
          <ul>
              {articles.map((article)=>(
                  <li className={styles.indArticle}>
                      {article.headline}
                      <text className={styles.author}>By: {article.author}</text>
                      <text >{parse(article.body)}</text> 
                      <div className={styles.buttons}>
                          <button id="comments" className={styles.edit}>See Comments</button>
                      </div>
                      
                  </li>
              ))}
          </ul>
        </div> */}
        
        
        </>
      )
    }
    else {
      return (
        <>
            <p>Please sign in</p>
            <button onClick={redirectToSignIn}>Sign In</button>
        </>
      )
    }
}


export default writerPortal