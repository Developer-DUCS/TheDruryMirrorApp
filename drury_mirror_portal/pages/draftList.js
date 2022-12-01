// // unfinished.js
// // Page Description:
// //                  List that shows the a writers unfinished drafts
// //Creation Date:
// //                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Nov. 30 2022 
// //
// //Modificaiton Log:
// //                  
// //                   
// import styles from '../styles/article.module.css'
// import {useRouter} from 'next/router'


// export function draftList({drafts}){    
//     const router = useRouter()
//     const parse = require('html-react-parser')

//     // Handle the log out button
//     const logOut = async (event) => {
//       router.push("/")
//     }

//     return(
        
//       <>
//       <div className={styles.divWelcome}>
//         <text className={styles.welcome}>Draft List</text>
//         <button className={styles.draftButton} onClick={logOut}>Log Out</button>
//       </div>
//       <div className={styles.divArticle}>
//         <ul>
//             {drafts.map((draft)=>(
//                 <li className={styles.indArticle}>
//                     {draft.headline}
//                     <text className={styles.author}>By: {draft.author}</text>
//                     <text >{parse(draft.body)}</text> 
//                     <div className={styles.buttons}>
//                         <button id="comments" className={styles.edit}>Contuine Article</button>
//                     </div>
                    
//                 </li>
//             ))}
//         </ul>
//       </div>
//       </>
//   )
// }

// export async function getStaticProps() {
//     console.log("Getting Drafts")

//     const endpoint = 'http://localhost:3000/api/getDrafts'

//     // Form the request for sending data to the server.
//     const options = {
//       // The method is POST because we are sending data.
//       method: 'GET',
//       // Tell the server we're sending JSON.
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       // Body of the request is the JSON data we created above.
//       //body: JSONdata,
//   }

//   const data = await fetch(endpoint, options)

//   if (data.status == 200) {
//       console.log("recieving data")
//       let drafts = await data.json()
//       console.log(drafts)
//       console.log(drafts[0])
//       return { props: {drafts} }
//   }
//   else {

//   }

// }

// export default draftList