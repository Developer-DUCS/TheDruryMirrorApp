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
    const handleReset = async (event) => {
        const endpoint = "api/resetPassword"

        const options = {
            method: "GET"
        };

        const response = fetch(endpoint, options);
        console.log(response)
    
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
                                <form onSubmit={handleReset}>
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
