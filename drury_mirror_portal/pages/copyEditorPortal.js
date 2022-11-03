//Page Description:
//                  Landing page for the copy editor after they log in to the site
//Creation Date:
//                  By: Thomas Nield  Oct. 4 2022 
//
//Modificaiton Log:
//                  Implemented getStaticProps 
//                  

import styles from '../styles/article.module.css'
import {useRouter} from 'next/router'

//Populates the page
export function copyEditorPortal({articles}){    
    const parse = require('html-react-parser')
    const router = useRouter()

    // Handle the log out button
    const logOut = async (event) => {
      router.push("/")
    }

    // Handle the edit article button
    const editArticleRoute = async (event) => {
      router.push("commentEditor")
    }

    // Handle the write draft button
    const writeDraftRoute = async (event) => {
      router.push("articleWriting")
    }

    return(
      <>
      <button className={styles.draftButton} onClick={logOut}>Log Out</button>
      <div className={styles.divWelcome}>
        <text className={styles.welcome}>Article List</text>
        <button className={styles.draftButton} onClick={writeDraftRoute}>Write Draft</button>
      </div>
      <div className={styles.divArticle}>
        <ul>
            {articles.map((article)=>(
                <li className={styles.indArticle}>
                    {article.headline}
                    <text className={styles.author}>By: {article.author}</text>
                    <text className={styles.body}>{parse(article.body)}</text> 
                    <div className={styles.buttons}>
                        <button id="edit" className={styles.edit} onClick={editArticleRoute}>Edit Article</button>
                        <button id="publish" className={styles.publish}>Ready to Publish</button>
                    </div>
                    
                </li>
            ))}
        </ul>
      </div>
      </>
  )
}

export async function getStaticProps() {
    console.log("Getting Articles")

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

  // Send the form data to our forms API on Vercel and get a response.
  const data = await fetch(endpoint, options)

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

export default copyEditorPortal