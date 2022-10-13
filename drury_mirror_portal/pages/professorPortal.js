//import Head from 'next/head'
//import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router, { useRouter } from 'next/router';
import { MissingStaticPage } from 'next/dist/shared/lib/utils';


function professorPortal({users}) {
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault()

        // Get data from the form.
        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
            roles: event.target.roles.value,
        }

        // Send the data to the server in JSON format.
        //console.log(data)
        const JSONdata = JSON.stringify(data)
        //console.log(JSONdata)

        const endpoint = 'api/createUser'

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
      console.log("response: ",response)
      if (response.status == 201) {
          router.push('professorPortal')
      }
      else {
        // TODO: Display message saying the username or password is incorrect
      }
    }


    


    return (

      <>
        <form onSubmit={handleSubmit}>
          <h1 id = "header">Create User</h1>
          <label htmlFor="first">Email</label> <br></br>
          <input type="text" id="email" name="email" required/><br></br>
          <label htmlFor="password">Password</label> <br></br>
          <input type="password" id="password" name="password" required /> <br></br>
          <label htmlFor="roles">Roles</label> <br></br>
          <select id="roles" name="roles" required >
            <option value = "Writer">Writer</option>
            <option value = "Editor">Editor</option>
            <option value = "Copy-Editor">Copy-Editor</option>
            <option value = "Admin">Admin</option>
          </select> <br></br>
          <button type="submit">Create User</button>
          <br></br>
          <h1 id = "headerChangeUser"> Change User Role</h1>
          <h4 id = "">Select a User</h4>
          <select id="User" name="User" required >
            {users.map((user) => (
                <option>{user.email}</option>
            ))}
            <option value = "student"></option>
          </select> <br></br>
          <select id="changeRoleSelect" name="changeRoleSelect" required >
            <option value = "Writer">Writer</option>
            <option value = "Editor">Editor</option>
            <option value = "Copy-Editor">Copy-Editor</option>
            <option value = "Admin">Admin</option>
          </select> <br></br>
          <button type="submit">Change Role</button>
        </form>
      </>
    )
}

export async function getStaticProps() {

    console.log("Getting Users")

    const endpoint = 'http://localhost:3000/api/getUsers'

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
      let users = await data.json()
      console.log(users)
      console.log(users[0])
      return { props: {users} }
  }
  else {
    
  }
}

export default professorPortal