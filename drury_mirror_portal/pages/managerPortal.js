// managerPortal.js
// Page Description:
//                  The page that the manager will see, they will be able to manage users, add, update, delete
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 29 2022 
//
//Modificaiton Log:
//     (11/1/2022): Minimal viable requirements met for this page. (TN,DB,SR)
//                  
//                   


import Table from 'react-bootstrap/Table';
import {useRouter} from 'next/router'

function managerPortal({users}) {
    const router = useRouter()

    // Handle the creation of a new user
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
          console.log("User Created")
          router.reload(window.location)
          
      }
      else {
        // TODO: Display message saying the username or password is incorrect
      }
    }

    // Handle the deletion of a user
    const handleDelete = async (event) => {
        event.preventDefault()
        console.log(event.target.name)

        let data = {
            email: event.target.name,
        }

        const JSONdata = JSON.stringify(data)
        //console.log(JSONdata)

        const endpoint = 'api/deleteUser'

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

      // Wait for the response to see if the user was deleted
      const response = await fetch(endpoint, options)
      console.log("response: ",response)

      if (response.status == 204) {
          console.log("User Deleted")
          router.reload(window.location)
          
      }
      else {
        // TODO: Display message saying the user could not be deleted
      }

    }

    // Handle the activation and deactivation of a user
    const handleActive = async (event) => {
        event.preventDefault()
        //console.log(email)
        //console.log(document.getElementById("checkbox").checked)
        console.log(event.target.name)
        console.log(event.target.checked)
        let data = {
            email: event.target.name,
            //email: event.target.getElementBy,
            active: event.target.checked
        }

        const JSONdata = JSON.stringify(data)
        //console.log(JSONdata)

        const endpoint = 'api/userStatus'

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

      // Wait for the response to see if the user was deleted
      const response = await fetch(endpoint, options)
      console.log("response: ",response)
      
      if (response.status == 200) {
          router.reload(window.location)
          console.log("User Status Changed")

          
      }
      else {
        // TODO: Display message saying the user could not be deleted
      }
    }

    // Handle role changes
    const handleRole = async (event) => {
        event.preventDefault()
        console.log(event.target.name)
        console.log(event.target.role.value)
        let data = {
            email: event.target.name,
            role: event.target.role.value
        }

        const JSONdata = JSON.stringify(data)
        //console.log(JSONdata)

        const endpoint = 'api/changeUserRole'

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

      // Wait for the response to see if the user was deleted
      const response = await fetch(endpoint, options)
      console.log("response: ",response)
      
      if (response.status == 200) {
          router.reload(window.location)
          console.log("User Role Changed")

          
      }
      else {
        // TODO: Display message saying the user could not be deleted
      }
    }

    return (

      <>
        <form onSubmit={handleSubmit}>
        <h1>User Manager</h1>
          <h2 id = "header">Create User</h2>
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
        </form>
        <br></br>
        <h2>User List</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Active</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {users.map((user) => (

                        <tr key={user.email}>
                            <td id={user.email}>{user.email}</td>
                            <td>{user.password}</td>
                            {/* blur out passwords */}
                            {/* Change password route */}
                            <td>
                                <form name={user.email} onSubmit={handleRole}>
                                    <select name = "role" required defaultValue={user.roles}>
                                        <option value = "Writer">Writer</option>
                                        <option value = "Editor">Editor</option>
                                        <option value = "Copy-Editor">Copy-Editor</option>
                                        <option value = "Admin">Admin</option>
                                    </select> <br></br>
                                    <button type="submit">Change Role</button>
                                </form>
                                {/* Add click event to change role */}
                            </td>
                            <td>
                                <input name={user.email} type="checkbox" required defaultChecked={user.active} onChange={handleActive}></input>
                            </td>
                            <td>
                                <button name={user.email} onClick={handleDelete} >Delete</button>
                                {/* Add an Alert or modal warning */}
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </Table>
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

export default managerPortal

