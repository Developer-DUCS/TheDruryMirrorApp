import styles from '../styles/article.module.css'
import { TextField, Button, FormGroup, Grid, Typography, Card, Toolbar, Box } from "@mui/material";

import {useRouter} from 'next/router'

import Header from './header'

export default function about(){    

    return(
      <Box>
        <Header/>
        <Typography variant="h4">About Us</Typography>
      </Box>
  )
}