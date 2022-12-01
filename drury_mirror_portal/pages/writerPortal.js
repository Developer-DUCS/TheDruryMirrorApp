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



export function writerPortal({articles}){    
    const router = useRouter()
    const {status, data} = useSession()
    const session = getSession()

    console.log("SESSION: ", session.then())

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

    if (status === "authenticated") {
      console.log(data.user.role)
      console.log(data.user)
      const role = data.user.role

      return (
        
        <>
        <div className={styles.divWelcome}>
          <p>{data.user.fname} {data.user.lname}</p>
          <text className={styles.welcome}>Article List</text>
          <button className={styles.draftButton} onClick={() => signOut()}>Log Out</button>
          <button className={styles.draftButton} onClick={writeDraftRoute}>Write Draft</button>
        </div>
        <div className={styles.divArticle}>
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
        </div>
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

export async function getStaticProps() {
    console.log("Getting Articles")
    const session = await getSession()
    //console.log(session)
    const endpoint = 'http://localhost:3000/api/getArticles'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'GET',
      // Tell the server we're sending JSON.
      headers: {
          'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      //body: JSONdata,
  }

  const data = await fetch(endpoint, options, session)

  if (data.status == 200) {
      console.log("recieving data")
      let articles = await data.json()
      console.log(articles)
      console.log(articles[0])
      return { props: {articles} }
  }
  else {

  }

}

export default writerPortal