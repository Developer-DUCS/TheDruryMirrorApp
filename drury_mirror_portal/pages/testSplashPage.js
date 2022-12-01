//Page Description:
//              Testing Splash page functionality
//Creation Date:
//              By: Haley Saylor Nov. 18 2022
//Modification Log:

import {useRouter} from 'next/router'
import { ThemeProvider, Typography, IconButton, Stack, Container, Grid } from "@mui/material";
import { theme } from "../styles/theme";
import Avatar from '@mui/material/Avatar';
import CreateIcon  from '@mui/icons-material/Create';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PublishIcon from '@mui/icons-material/Publish';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { styled } from '@mui/material/styles';

import { useSession, signOut } from 'next-auth/react'



const Buttonavatar = styled(Avatar)({
        backgroundColor: '#0E0E0E',
        width: 100,
        height: 100,
        
});




export function testSplashPage({}){
    const router = useRouter();
    const {status, data} = useSession()

    // Redirect the user to the 
    const redirectToSignIn = (event) => {
        event.preventDefault()
        router.push("/")

    }

    const writeDraftRoute = async (event) => {
        router.push("articleWriting");
    };

    const editArticleRoute = async (event) => {
        router.push("commentEditor");
    };

    const mySeeEditsRoute = (event) => {
        event.preventDefault()
        router.push("writerPortal")
    }
    
    const siteSettingsRoute = (event) => {
        event.preventDefault()
        router.push("managerPortal")
    }

    if (status === "authenticated") {
        console.log(data.user.role)
        console.log(data.user)
        const role = data.user.role

        return (
            <div>
                <Typography variant="h2" sx={{ flexGrow: 5}}>
                    Drury Mirror Web Portal
                </Typography>
                <Typography variant="h3" sx={{ flexGrow: 5}}>
                    Welcome {data.user.fname} {data.user.lname} <br></br>
                    {data.user.email} <br></br>
                    Role: {role} <br></br>

                </Typography>
                <button onClick={() => signOut()}>Sign out</button>
                <Grid container direction='column' spacing={3}>
                <Grid container item direction='row' justifyContent='center'
                sx={{marginTop: 10}}>
    
                    
                    {role === "Writer" || role === "Copy-Editor" || role === "Editor-In-Chief" ? 
                    <Grid item xs={2}>

                    <Stack alignItems='center' justifyContent='center'>
                        <Buttonavatar>
                            <IconButton size='large' onClick={writeDraftRoute}>
                                <CreateIcon sx={{
                                    color: 'white',
                                    fontSize: 56,
                                }} />
                            </IconButton>
                        </Buttonavatar>
                        <Typography variant='h5'>
                            Write Article
                        </Typography>
                    </Stack>
                    </Grid> : <></>}
    
                    {role === "Writer" || role === "Copy-Editor" || role === "Editor-In-Chief" ? 
                    <Grid item xs={2}>

                    <Stack alignItems='center' justifyContent='center'>
                        <Buttonavatar>
                            <IconButton size='large' onClick={mySeeEditsRoute}>
                                <AssignmentTurnedInIcon sx={{
                                    color: 'white',
                                    fontSize: 56,
                                }} />
                                
                            </IconButton>
                        </Buttonavatar>
                        <Typography variant='h5'>
                            See Edits
                        </Typography>
                    </Stack>
                    </Grid> : <></>}
                    
                    {role === "Copy-Editor" || role === "Editor-In-Chief" ? 
                    <Grid item xs={2}>

                    <Stack alignItems='center' justifyContent='center'>
                        <Buttonavatar>
                            <IconButton size='large' onClick={editArticleRoute}>
                                <BorderColorIcon sx={{
                                    color: 'white',
                                    fontSize: 50,
                                }} />
                                
                            </IconButton>
                        </Buttonavatar>
                        <Typography variant='h5'>
                            Edit Articles
                        </Typography>
                    </Stack>
                    </Grid> : <></> }
    
                    {role === "Writer" || role === "Copy-Editor" || role === "Editor-In-Chief" ? 
                    <Grid item xs={2}>
                    <Stack alignItems='center' justifyContent='center'>
                        <Buttonavatar>
                            <IconButton size='large' onClick={() =>{
                                alert('Clicked');
                            }}>
                                <AssignmentIcon sx={{
                                    color: 'white',
                                    fontSize: 56,
                                }} />
                            </IconButton>
                        </Buttonavatar>
                        <Typography variant='h5'>
                            Drafts
                        </Typography>
                    </Stack>
                    </Grid> : <></>}
                    </Grid>
    
                    <Grid container item direction='row' justifyContent='center'>
                    {role === "Editor-In-Chief" || role == "Manager" ? 

                    <Grid item xs={2}>

                        <Stack alignItems='center' justifyContent='center'>
                            <Buttonavatar>
                                <IconButton size='large' onClick={()=>{
                                    alert('Clicked');
                                }}>
                                    <PublishIcon sx={{
                                        color: 'white',
                                        fontSize: 56,
                                    }} />
    
                                </IconButton>
                            </Buttonavatar>
                            <Typography variant='h5'>
                                Publish Articles
                            </Typography>
                        </Stack> 
                    </Grid> : <></>}
    
                    <Grid item xs={2}>
                        <Stack alignItems='center' justifyContent='center'>
                            <Buttonavatar>
                                <IconButton size='large' onClick={()=>{
                                    alert('Clicked');
                                }}>
                                    <UploadFileIcon sx={{
                                        color: 'white',
                                        fontSize: 56,
                                    }} />
                                </IconButton>
                            </Buttonavatar> 
                            <Typography variant='h5'>
                                Upload Articles
                            </Typography>
                        </Stack>
    
                    </Grid>
                    
                    {role === "Manager" ?
                    <Grid item xs={2}>
                        <Stack alignItems='center' justifyContent='center'>
                            <Buttonavatar>
                                <IconButton size='large' onClick={siteSettingsRoute}>
                                    <SettingsIcon sx={{
                                        color: 'white',
                                        fontSize: 56,
                                    }} />
                                </IconButton>
                            </Buttonavatar>
                            <Typography variant='h5'>
                                Site Settings
                            </Typography>
                        </Stack>
                    </Grid> : <></> }
    
                    </Grid>
    
                </Grid>
    
            </div>
        )  
    }
    else {
        return (
            <>
                <p>Please sign in</p>
                <button onClick={redirectToSignIn}>Sign In</button>
            </>
        )
    }
    
}

export default testSplashPage