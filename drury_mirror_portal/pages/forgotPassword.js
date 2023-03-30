// forgotPassword.js
// Page Description:
//                  Page used to handle forgot password functionality
//Creation Date:
//                  By: Daniel Brinck  Feb. 15 2023
//
//Modificaiton Log:
//
//


//import Head from 'next/head'
//import Image from 'next/image'
import styles from "../styles/Home.module.css";
import Router, { useRouter } from "next/router";
import { MissingStaticPage } from "next/dist/shared/lib/utils";
import { TextField, Button, FormGroup, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function resetPage() {
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let emailReset = document.getElementById("Email").value;
        console.log("Entered Email:", emailReset)
        //const endpoint = "api/resetPassword"
        const endpoint = "api/getUsers"

        const options = {
            // The method is POST because we are sending data.
            method: "GET",
            // Tell the server we're sending JSON.
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(endpoint, options);

        if (response.status == 200) {
            //const test = document.getElementById("Email")
            let users = await response.json();
            for(let user of users) {
                if(user.email == emailReset){
                    console.log("Found", user.email)
                    handleEmail(user)
                }
            }
        } else {
            console.log("Email Not Found");
        }

    }

    const handleEmail = async (user) =>{
        const endpoint2 = "api/resetPassword"

        const data = {
            email: user.email
        }
        const options2 = {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }

        const response2 = await fetch(endpoint2, options2);
		if (response2.status == 201) {
			router.reload(window.location);
		} 
    }
    

    return (
        <>
            <div className={styles.formContainer}>
                    <FormGroup className={styles.formItem}>
                        <Grid
                            container
                            direction={"column"}
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                            className={styles.formContainer}
                        >
                            <Grid item>
                                <Typography variant="logo">
                                    Drury Mirror
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="">
                                    Please enter your email
                                </Typography>
                            </Grid>
                            <Grid item>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        sx={{
                                            input: {
                                                color: "black",
                                            },
                                            label: {
                                                color: "black",
                                            },
                                        }}
                                        id="Email"
                                        name="Email"
                                        label="Email"
                                        variant="standard"
                                    />
                                    <br></br>
                                    <Button
                                        sx={{ marginTop: 2 }}
                                        variant="contained"
                                        size="small"
                                        color="error"
                                        type="submit"

                                    >
                                        Reset Password
                                    </Button>
                                </form>
                            </Grid>
                        </Grid>
                    </FormGroup>
            </div>
        </>
    );
}
