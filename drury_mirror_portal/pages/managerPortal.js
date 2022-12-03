// managerPortal.js
// Page Description:
//                  The page that the manager will see, they will be able to manage users, add, update, delete
//Creation Date:
//                  By: Thomas Nield, Daniel Brinck, Samuel Rudqvist  Oct. 29 2022
//
//Modificaiton Log:
//     (11/1/2022): Minimal viable requirements met for this page. (TN,DB,SR)
//
//

import Table from "react-bootstrap/Table";
import styles from "../styles/article.module.css";
import { styled } from "@mui/material/styles";

import {
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Button,
  Input,
  FormGroup,
  TextField,
  FormLabel,
  Select,
  MenuItem,
  InputBase,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";

import { useRouter } from "next/router";

function managerPortal({ users }) {
  const router = useRouter();

  // Handle the log out button
  const logOut = async (event) => {
    router.push("/");
  };

  // Handle the creation of a new user
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get data from the form.
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
      roles: event.target.roles.value,
    };

    // Send the data to the server in JSON format.
    //console.log(data)
    const JSONdata = JSON.stringify(data);
    //console.log(JSONdata)

    const endpoint = "api/createUser";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);
    console.log("response: ", response);
    if (response.status == 201) {
      console.log("User Created");
      router.reload(window.location);
    } else {
      // TODO: Display message saying the username or password is incorrect
    }
  };

  // Handle the deletion of a user
  const handleDelete = async (event) => {
    event.preventDefault();
    console.log(event.target.name);

    let data = {
      email: event.target.name,
    };

    const JSONdata = JSON.stringify(data);
    //console.log(JSONdata)

    const endpoint = "api/deleteUser";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Wait for the response to see if the user was deleted
    const response = await fetch(endpoint, options);
    console.log("response: ", response);

    if (response.status == 204) {
      console.log("User Deleted");
      router.reload(window.location);
    } else {
      // TODO: Display message saying the user could not be deleted
    }
  };

  // Handle the activation and deactivation of a user
  const handleActive = async (event) => {
    event.preventDefault();
    //console.log(email)
    //console.log(document.getElementById("checkbox").checked)
    console.log(event.target.name);
    console.log(event.target.checked);
    let data = {
      email: event.target.name,
      //email: event.target.getElementBy,
      active: event.target.checked,
    };

    const JSONdata = JSON.stringify(data);
    //console.log(JSONdata)

    const endpoint = "api/userStatus";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Wait for the response to see if the user was deleted
    const response = await fetch(endpoint, options);
    console.log("response: ", response);

    if (response.status == 200) {
      router.reload(window.location);
      console.log("User Status Changed");
    } else {
      // TODO: Display message saying the user could not be deleted
    }
  };

  // Handle role changes
  const handleRole = async (event) => {
    event.preventDefault();
    console.log(event.target.name);
    console.log(event.target.role.value);
    let data = {
      email: event.target.name,
      role: event.target.role.value,
    };

    const JSONdata = JSON.stringify(data);
    //console.log(JSONdata)

    const endpoint = "api/changeUserRole";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Wait for the response to see if the user was deleted
    const response = await fetch(endpoint, options);
    console.log("response: ", response);

    if (response.status == 200) {
      router.reload(window.location);
      console.log("User Role Changed");
    } else {
      // TODO: Display message saying the user could not be deleted
    }
  };

  // Custom input for the Select Roles dropdown to help with styling
  const CustomInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }));

  // Card component takes in props (React parameters) from users array
  const UserCard = (props) => (
    <>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container direction="column">
          <Grid item xs={6}>
            <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
              Email
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {props.email}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
              Password
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {props.password}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <form name={props.email} onSubmit={handleRole}>
              <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
                Change Role
              </Typography>
              <select name="role" required defaultValue={props.roles}>
                <option value="Writer">Writer</option>
                <option value="Editor">Editor</option>
                <option value="Copy-Editor">Copy-Editor</option>
                <option value="Admin">Admin</option>
              </select>{" "}
              <br></br>
              <button type="submit">Change Role</button>
            </form>
            <Typography
              variant="body2"
              sx={{ marginBottom: 0.5, marginTop: 2 }}
            >
              Set Active
            </Typography>
            <input
              name={props.email}
              type="checkbox"
              required
              defaultChecked={props.active}
              onChange={handleActive}
            ></input>
          </Grid>
        </Grid>
      </CardContent>
      <Button
        name={props.email}
        sx={{
          position: "relative",
          marginTop: "20px",
          marginLeft: "16px",
          marginBottom: "20px",
        }}
        color="error"
        variant="contained"
        onClick={handleDelete}
      >
        Delete User
      </Button>
    </>
  );

  return (
    <>
      <Button
        color="error"
        variant="contained"
        onClick={logOut}
        sx={{ position: "absolute", right: 10, top: 10 }}
      >
        Log Out
      </Button>

    <Card sx={{backgroundColor: "#0E0E0E", display: "Flex", alignItems: "center"}}>
      <FormGroup sx={{margin: "auto"}}>
        <form onSubmit={handleSubmit}>
        <Typography variant="h2" sx={{ margin: 1 }}>
            User Manager
          </Typography>
          <Typography variant="h4" sx={{ margin: 1, marginTop: 2, marginBottom: 0 }}>
            Create User
          </Typography>
            <Grid container display={"flex"} direction={"row"}>
                <Grid item xs={4}>
                    <Typography variant="h5" sx={{ margin: 1, marginBottom: 0 }}>
                        Email
                    </Typography>
                    <TextField
                        type="text"
                        id="email"
                        label="Email"
                        name="email"
                        variant="filled"
                        sx={{
                        label: { color: "white" },
                        input: { color: "white" },
                        border: "1px solid white",
                        borderRadius: "5px",
                        margin: 1,
                        }}
                    ></TextField>
                    <br></br>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ margin: 1, marginBottom: 0  }}>
                      Password
                  </Typography>
                  <TextField
                      type="password"
                      id="password"
                      label="Password"
                      name="password"
                      variant="filled"
                      sx={{
                      label: { color: "white" },
                      input: { color: "white" },
                      border: "1px solid white",
                      borderRadius: "5px",
                      margin: 1,
                      }}
                  ></TextField>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h5" sx={{ margin: 1, marginBottom: 0  }}>
                        Roles
                    </Typography>
                    <Select
                        autoWidth
                        defaultValue="none"
                        labelId="roles"
                        id="roles"
                        name="roles"
                        input={<CustomInput />}
                        label="Roles"
                        sx={{ margin: 1 }}
                    >
                        <MenuItem value="none" disabled>
                        Choose Role
                        </MenuItem>
                        <MenuItem value={"Writer"}>Writer</MenuItem>
                        <MenuItem value={"Editor"}>Editor</MenuItem>
                        <MenuItem value={"Copy-Editor"}>Copy-Editor</MenuItem>
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                    </Select>
                </Grid>
            </Grid>
          <Button
            variant="contained"
            color="primaryButton"
            type="submit"
            size="medium"
            sx={{ margin: 1 }}
          >
            Create User
          </Button>
          <br></br>
        </form>
      </FormGroup>
    </Card>

      <br></br>

      <Box
        sx={{
          width: "70%",
          margin: "auto"
        }}
      >
        <Typography variant="h3" sx={{ margin: 2 }}>
          User List
        </Typography>
        {users.map((user) => (
          <Accordion sx={{margin: 1}}>
            <AccordionSummary>
              {user.email}
            </AccordionSummary>
            <AccordionDetails>
              <Card
                key={user.email}
                variant="outlined"
                sx={{
                  width: "50%",
                  height: "auto",
                  margin: 2,
                  paddingBottom: "0px",
                }}
              >
                {
                  <UserCard
                    email={user.email}
                    password={user.password}
                    roles={user.roles}
                    active={user.active}
                  ></UserCard>
                }
              </Card>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
}

export async function getStaticProps() {
  console.log("Getting Users");

  const endpoint = "http://localhost:3000/api/getUsers";

  // Form the request for sending data to the server.
  const options = {
    // The method is POST because we are sending data.
    method: "GET",
    // Tell the server we're sending JSON.
    headers: {
      "Content-Type": "application/json",
    },
    // Body of the request is the JSON data we created above.
    //body: JSONdata,
  };

  // Send the form data to our forms API on Vercel and get a response.
  const data = await fetch(endpoint, options);

  if (data.status == 200) {
    console.log("recieving data");
    let users = await data.json();
    console.log(users);
    console.log(users[0]);
    return { props: { users } };
  } else {
  }
}

export default managerPortal;
