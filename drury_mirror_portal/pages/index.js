//import Head from 'next/head'
//import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router, { useRouter } from 'next/router';
import { MissingStaticPage } from 'next/dist/shared/lib/utils';
import {TextField, Button, FormGroup, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme'

export default function LoginPage() {
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault()

        // Get data from the form.
        const data = {
            username: event.target.username.value,
            password: event.target.password.value,
        }

        // Send the data to the server in JSON format.
        //console.log(data)
        const JSONdata = JSON.stringify(data)
        //console.log(JSONdata)

        const endpoint = 'api/login'

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
      let user = await response.json()
      console.log("response: ",response)
      console.log("username: ",user.username)
      console.log("role: ",user.role)

      if (response.status == 200) {
          if (user.role == "Writer") {
              console.log("writer")
              router.push('writerPortal')
          }
          else if (user.role == "Manager") {
              router.push("managerPortal")
          }
          else if (user.role == "Admin") {
              router.push("adminPortal")
          }
          else if (user.role == "Copy-Editor") {
              router.push("copyEditorPortal")
          }
      }
      else {
        // TODO: Display message saying the username or password is incorrect
      }
    }


    return (
      <>
      <div className = {styles.formContainer}>
        <form onSubmit={handleSubmit} className = {styles.formItem}>
          <FormGroup className = {styles.formItem}>
            <Grid container direction={'column'} spacing={2} justifyContent = "center" alignItems = "center" className = {styles.formContainer}>
              <Grid item>
                <Typography variant="h1">Drury Mirror</Typography>
              </Grid>
              <Grid item>
                <TextField
                  sx={{
                    input: {
                      color: "white",
                    },
                    label: {
                      color: "white",
                    },
                  }}
                  id="username" 
                  name="username" 
                  label="Username" 
                  variant="standard" 
                />
              </Grid>
              <Grid item>
                <TextField 
                  sx={{
                    input: {
                      color: "white",
                    },
                    label: {
                      color: "white",
                    }
                  }}
                  type="password" 
                  id="password" 
                  label="Password" 
                  variant="standard" 
                />
              </Grid>
              <Grid item>
                <Button 
                  color="contrast"
                  sx={{color: "white"}}
                  type="submit"
                  variant="outline">Log in</Button>
              </Grid>
            </Grid>
          </FormGroup>
        </form>
        <div className={styles.loginErrorMsg}>
          <h3>Incorrect Username or Password</h3>
        </div>
      </div>
      </>
    )
}
