//import Head from 'next/head'
//import Image from 'next/image'
import styles from "../styles/Home.module.css";
import Router, { useRouter } from "next/router";
import { MissingStaticPage } from "next/dist/shared/lib/utils";
import { TextField, Button, FormGroup, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";

import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export default function LoginPage() {
    const router = useRouter();
    const { status, data } = useSession();
    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await signIn("credentials", {
            redirect: true,
            email: event.target.username.value,
            password: event.target.password.value,
            callbackUrl: "/Dashboard",
        });

        console.log(res);

        // console.log("STATUS: ", res.status);
        // res.ok = false;
        try {
            if (res.ok) {
                router.push(res.url);
                console.log(res.status);
            } else {
                console.log(res.error);
            }
        } catch (e) {}
    };

    const handleReset = async (event) => {
        event.preventDefault();
        router.push("/forgotPassword")

        console.log("reset button pushed")
    };

    

    return (
        <>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.formItem}>
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
                                <TextField
                                    sx={{
                                        input: {
                                            color: "black",
                                        },
                                        label: {
                                            color: "black",
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
                                            color: "black",
                                        },
                                        label: {
                                            color: "black",
                                        },
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
                                    sx={{ color: "black" }}
                                    type="submit"
                                    variant="outline"
                                >
                                    Log in
                                </Button>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </form>
                <form onSubmit={handleReset} className={styles.formItem}>
                    <Grid
                        container
                        direction={"column"}
                        spacing={25}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button
                            sx={{ marginTop: 2 }}
                            variant="contained"
                            size="small"
                            color="error"
                            type="submit"
        
                        >
                            Forgot Password?
                        </Button>
                    </Grid>
                </form>
                <div className={styles.loginErrorMsg}>
                    <h3>Incorrect Username or Password</h3>
                </div>
            </div>
        </>
    );
}
