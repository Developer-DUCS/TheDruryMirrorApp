//Page Description:
//              Testing Splash page functionality
//Creation Date:
//              By: Haley Saylor Nov. 18 2022
//Modification Log:

import { useRouter } from "next/router";
import {
    ThemeProvider,
    Typography,
    Box,
    Button,
    IconButton,
    Stack,
    Container,
    Grid,
} from "@mui/material";
import { theme } from "../styles/theme";
import Avatar from "@mui/material/Avatar";
import CreateIcon from "@mui/icons-material/Create";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PublishIcon from "@mui/icons-material/Publish";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { styled } from "@mui/material/styles";

import { useSession, signOut } from "next-auth/react";

const Buttonavatar = styled(Avatar)({
    backgroundColor: "#0E0E0E",
    width: 100,
    height: 100,
});

export function testSplashPage() {
    const router = useRouter();
    const { status, data } = useSession();

    // Redirect the user to the
    const redirectToSignIn = (event) => {
        event.preventDefault();
        router.push("/");
    };

    const writeDraftRoute = async (event) => {
        router.push("articleWriting");
    };

    const editArticleRoute = async (event) => {
        router.push("copyEditorPortal");
    };

    const seeDraftsRoute = async (event) => {
        router.push("draftList");
    };

    const mySeeEditsRoute = (event) => {
        event.preventDefault();
        router.push("writerPortal");
    };

    const siteSettingsRoute = (event) => {
        event.preventDefault();
        router.push("managerPortal");
    };

    const publishRoute = (event) => {
        event.preventDefault();
        router.push("publishPage");
    };

    if (status === "authenticated") {
        console.log(data.user.role);
        console.log(data.user);
        const role = data.user.role;

        return (
            <div>
                <Typography
                    variant="splashHeader"
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    Drury Mirror
                </Typography>
                <Typography
                    variant="splashSubheader"
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    Web Portal
                </Typography>
                <Grid
                    container
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "space-around",
                        flexDirection: "column",
                    }}
                >
                    <Grid item>
                        <Typography
                            variant="spashBody"
                            sx={{
                                width: "20%",
                            }}
                        >
                            Welcome, {data.user.fname} {data.user.lname}.
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "space-around",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                signOut();
                            }}
                            sx={{ marginTop: 2 }}
                        >
                            Sign Out
                        </Button>
                    </Grid>
                </Grid>
                <Grid container direction="column" spacing={3}>
                    <Grid
                        container
                        item
                        direction="row"
                        justifyContent="center"
                        sx={{ marginTop: 10 }}
                    >
                        {role === "Writer" ||
                        role === "Copy-Editor" ||
                        role === "Editor-In-Chief" ? (
                            <Grid item xs={2}>
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Buttonavatar>
                                        <IconButton
                                            size="large"
                                            onClick={writeDraftRoute}
                                        >
                                            <CreateIcon
                                                sx={{
                                                    color: "white",
                                                    fontSize: 56,
                                                }}
                                            />
                                        </IconButton>
                                    </Buttonavatar>
                                    <Typography variant="buttonLabel">
                                        Write Article
                                    </Typography>
                                </Stack>
                            </Grid>
                        ) : (
                            <></>
                        )}

                        {role === "Writer" ||
                        role === "Copy-Editor" ||
                        role === "Editor-In-Chief" ? (
                            <Grid item xs={2}>
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Buttonavatar>
                                        <IconButton
                                            size="large"
                                            onClick={mySeeEditsRoute}
                                        >
                                            <AssignmentTurnedInIcon
                                                sx={{
                                                    color: "white",
                                                    fontSize: 56,
                                                }}
                                            />
                                        </IconButton>
                                    </Buttonavatar>
                                    <Typography variant="buttonLabel">
                                        See Edits
                                    </Typography>
                                </Stack>
                            </Grid>
                        ) : (
                            <></>
                        )}

                        {role === "Copy-Editor" ||
                        role === "Editor-In-Chief" ? (
                            <Grid item xs={2}>
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Buttonavatar>
                                        <IconButton
                                            size="large"
                                            onClick={editArticleRoute}
                                        >
                                            <BorderColorIcon
                                                sx={{
                                                    color: "white",
                                                    fontSize: 50,
                                                }}
                                            />
                                        </IconButton>
                                    </Buttonavatar>
                                    <Typography variant="buttonLabel">
                                        Edit Articles
                                    </Typography>
                                </Stack>
                            </Grid>
                        ) : (
                            <></>
                        )}

                        {role === "Writer" ||
                        role === "Copy-Editor" ||
                        role === "Editor-In-Chief" ? (
                            <Grid item xs={2}>
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Buttonavatar>
                                        <IconButton
                                            size="large"
                                            onClick={seeDraftsRoute}
                                        >
                                            <AssignmentIcon
                                                sx={{
                                                    color: "white",
                                                    fontSize: 56,
                                                }}
                                            />
                                        </IconButton>
                                    </Buttonavatar>
                                    <Typography variant="buttonLabel">
                                        Drafts
                                    </Typography>
                                </Stack>
                            </Grid>
                        ) : (
                            <></>
                        )}
                    </Grid>

                    <Grid
                        container
                        item
                        direction="row"
                        justifyContent="center"
                    >
                        {role === "Editor-In-Chief" || role == "Manager" ? (
                            <Grid item xs={2}>
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Buttonavatar>
                                        <IconButton
                                            size="large"
                                            onClick={publishRoute}
                                        >
                                            <PublishIcon
                                                sx={{
                                                    color: "white",
                                                    fontSize: 56,
                                                }}
                                            />
                                        </IconButton>
                                    </Buttonavatar>
                                    <Typography variant="buttonLabel">
                                        Publish Articles
                                    </Typography>
                                </Stack>
                            </Grid>
                        ) : (
                            <></>
                        )}

                        <Grid item xs={2}>
                            <Stack alignItems="center" justifyContent="center">
                                <Buttonavatar>
                                    <IconButton
                                        size="large"
                                        onClick={() => {
                                            alert("Clicked");
                                        }}
                                    >
                                        <UploadFileIcon
                                            sx={{
                                                color: "white",
                                                fontSize: 56,
                                            }}
                                        />
                                    </IconButton>
                                </Buttonavatar>
                                <Typography variant="buttonLabel">
                                    Upload Articles
                                </Typography>
                            </Stack>
                        </Grid>

                        {role === "Manager" ? (
                            <Grid item xs={2}>
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Buttonavatar>
                                        <IconButton
                                            size="large"
                                            onClick={siteSettingsRoute}
                                        >
                                            <SettingsIcon
                                                sx={{
                                                    color: "white",
                                                    fontSize: 56,
                                                }}
                                            />
                                        </IconButton>
                                    </Buttonavatar>
                                    <Typography variant="buttonLabel">
                                        Site Settings
                                    </Typography>
                                </Stack>
                            </Grid>
                        ) : (
                            <></>
                        )}
                    </Grid>
                </Grid>
            </div>
        );
    } else {
        return (
            <>
                <p>Please sign in</p>
                <button onClick={redirectToSignIn}>Sign In</button>
            </>
        );
    }
}

export default testSplashPage;
