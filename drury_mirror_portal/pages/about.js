import styles from '../styles/article.module.css'
import { TextField, Button, FormGroup, Grid, Typography, Card, Toolbar, Box } from "@mui/material";

import {useRouter} from 'next/router'

import Header from './header'

export default function about(){    

    return(
      <Box>
        <Header/>
        <Box sx={{marginLeft: "20%", marginTop: 3}}>
          <Typography sx={{color: "white"}} variant="aboutHeader">Learn about our team and who we are.</Typography>
        </Box>
        <Box sx={{marginLeft: "20%", marginTop: 3}}>
          <Typography sx={{color: "white"}} variant="aboutBody">This is our about page.</Typography>
        </Box>
      </Box>
  )
}