// submitReset.js
// Page Description:
//                  Page used to handle the reset submit
//Creation Date:
//                  By: Daniel Brinck  Mar. 8 2023
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
import { useState } from "react";


export default function confirmReset() {
    const router = useRouter();
    
    const [isError, setIsError] = useState(null);
    const handleReset = (event) => {
            event.preventDefault();

            console.log("bottom pressed");
            console.log(event)
            console.log(event.target.password.value)
            console.log(event.target.confirmPassword.value)  

            let password = event.target.password.value
            let confirmPassword = event.target.confirmPassword.value

            if (password == confirmPassword) {
                console.log("passwords match")
                setIsError(false)
            }
            else {
                console.log("passwords do not match");
                setIsError(true);
            }
        
    }

    return (
        <>
            <div className={styles.formContainer}>
                <form onSubmit={handleReset}>
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
                                    Enter your new password
                                </Typography>
                            </Grid>
                                <TextField
                                    sx={{
                                        input: {
                                            color: "black",
                                        },
                                        label: {
                                            color: "black",
                                        },
                                    }}
                                    id="password"
                                    name="password"
                                    label="password"
                                    variant="standard"
                                    type="password"
                                />
                                
                                    <Typography variant="">
                                        Confirm Password
                                    </Typography>
                                    <TextField
                                    sx={{
                                        input: {
                                            color: "black",
                                        },
                                        label: {
                                            color: "black",
                                        },
                                    }}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="confirmPassword"
                                    variant="standard"
                                    type="password"
                                    />
                               
                                    <Button
                                        sx={{ marginTop: 2 }}
                                        variant="contained"
                                        size="small"
                                        color="error"
                                        type="submit"
                                        

                                    >
                                        Reset Password
                                    </Button>
                        </Grid>
                    </FormGroup>
                </form>
                {isError === true &&(
                    <div>
                        <Typography
                            variant="h4"
                            sx={{
                                margin: 1,
                                marginTop: 1,
                                color: "red"
                            }}
                        >
                            Your passwords do not match
                        </Typography>
                    </div>
                )}                    
                {isError === false &&(
                    <div>
                        <Typography
                            variant="h4"
                            sx={{
                                margin: 1,
                                marginTop: 1,
                                color: "green"
                            }}
                        >
                            Your passwords Match! Your password has been reset.
                        </Typography>
                    </div>
                )}                    

            </div>
        </>
    );
}
