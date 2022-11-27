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


const Buttonavatar = styled(Avatar)({
        backgroundColor: '#0E0E0E',
        width: 100,
        height: 100,
        
});


export function testSplashPage({}){
    const router = useRouter();

    const writeDraftRoute = async (event) => {
        router.push("articleWriting");
    };

    const editArticleRoute = async (event) => {
        router.push("commentEditor");
    };


    return (
        <div>
            <Typography variant="h2" sx={{ flexGrow: 5}}>
                Drury Mirror Web Portal
            </Typography>
            <Typography variant="h3" sx={{ flexGrow: 5}}>
                Welcome Whoever
            </Typography>
            <Grid container direction='column' spacing={3}>
            <Grid container item direction='row' justifyContent='center'
            sx={{marginTop: 10}}>

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
                </Grid>

                <Grid item xs={2}>
                <Stack alignItems='center' justifyContent='center'>
                    <Buttonavatar>
                        <IconButton size='large' onClick={() =>{
                            alert('Clicked');
                        }}>
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
                </Grid>
                
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
                </Grid>

                <Grid item xs={2}>
                <Stack alignItems='center' justifyContent='center'>
                    <Buttonavatar>
                        <IconButton size='large' onClick={()=>{
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
                </Grid>
                </Grid>

                <Grid container item direction='row' justifyContent='center'>
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
                </Grid>

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

                <Grid item xs={2}>
                    <Stack alignItems='center' justifyContent='center'>
                        <Buttonavatar>
                            <IconButton size='large' onClick={()=>{
                                alert('Clicked');
                            }}>
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
                </Grid>

                </Grid>

            </Grid>

        </div>
    )  
}

export default testSplashPage