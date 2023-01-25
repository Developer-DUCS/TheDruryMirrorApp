// Components
import Header from "./components/Header";
import NavBar from "./components/NavBar";

// MUI Styling
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    IconButton,
    Grid,
    Box,
    Card,
    CardContent,
} from "@mui/material";

export default function Custom404() {
    return (
        <Box>
            <Header />
            <Box>
                <Box>
                    <Typography
                        sx={{
                            color: "black",
                            fontSize: "28px",
                            fontFamily: "Brown-Regular",
                            marginTop: "30%",
                            alignText: "center"
                        }}>
                        404 - Page Not Found
                    </Typography>
                </Box>
                <br></br>
                <Box>
                    <Typography
                        sx={{
                            color: "black",
                            fontSize: "28px",
                            fontFamily: "Brown-Regular",
                            marginTop: "5%",
                            alignText: "center"
                        }}>
                        Sorry! We're DUing our best!
                    </Typography>
                </Box>
            </Box>
            <NavBar />
        </Box>
    );
}
