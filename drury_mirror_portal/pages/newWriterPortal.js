// writerPortal.js
// Page Description:
//                  The home page for the writer
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 4 2022
//
//Modificaiton Log:
//
//
import styles from "../styles/article.module.css";
import { useRouter } from "next/router";
import { useSession, signOut, getSession } from "next-auth/react";
import { useState, useEffect } from "react";

export function writerPortal() {
  const router = useRouter();
  const { status, data } = useSession();
  const [getArticles, setArticles] = useState([]);

  const parse = require("html-react-parser");

  async function myFunction() {
    const session = await getSession()
    console.log("myFunction",session)
    return session
  }

  useEffect(() => {
    if (status === "loading") {
      return 
    }
    else {
      console.log(data.user.fname)
    }
  }, []);

  // Redirect the user to the log in screen
  const redirectToSignIn = (event) => {
    event.preventDefault();
    router.push("/");
  };

  // Handle the write draft button
  const writeDraftRoute = async (event) => {
    router.push("articleWriting");
  };

  async function getUser() {
    
    let name = data.user.fname
    console.log(name)
  }
  useEffect(() => {
    
    const getArticlesRoute = async () => {
        //let mySession = myFunction()

        const session = await getSession()
        let endpoint = "/api/getArticles";
        if (session) {
          let JSONdata = JSON.stringify(session.user.email);

        
        console.log("JSONdata",JSONdata)
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Body of the request is the JSON data we created above.
          body: JSONdata,
        };

        let response = await fetch(endpoint, options);
        let articles = await response.json();
        //console.log("Articles from JSON: \n" + JSON.stringify(articles));
        let arr = [];
        if (articles) {
          setArticles(articles);
          //console.log("articles", getArticles);
        }
      }
      
    };

    getArticlesRoute();
  }, []);

  if (getArticles != []) {
    //console.log("Articles Retrieved \n" + JSON.stringify(getArticles));
  }
  
  // Filters 'getArticles' array based on whichever user is logged in
  // - should be done server-side
  let filteredArray = []
  function filterArticles(){
    // if not default value (meaning it has data)
    if(getArticles != []){
      getArticles.forEach(checkArticle)
    }
  }

  function checkArticle(article){
    console.log("Article: \n" + JSON.stringify(article.author))
    if(article) {filteredArray.push(article)}
  }

  filterArticles();

  if (status === "authenticated") {
    console.log(data.user.role);
    console.log(data.user);
    const role = data.user.role;

    return (
      <>
        <p id="article"></p>
        <div className={styles.divWelcome}>
          <p>
            {data.user.fname} {data.user.lname}
          </p>
          <text className={styles.welcome}>Article List</text>
          <button className={styles.draftButton} onClick={() => signOut()}>
            Log Out
          </button>
          <button className={styles.draftButton} onClick={writeDraftRoute}>
            Write Draft
          </button>
        </div>
        <div className={styles.divArticle}>
          <ul>
            {filteredArray.map((article) => (
              <li className={styles.indArticle}>
                {article.headline}
                <text className={styles.author}>By: {article.author}</text>
                <text>{parse(article.body)}</text>
                <div className={styles.buttons}>
                  <button id="comments" className={styles.edit}>
                    See Comments
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  } 
  else 
  {
    return (
      <>
        <p>Please sign in</p>
        <button onClick={redirectToSignIn}>Sign In</button>
      </>
    );
  }
}


// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export default writerPortal;
