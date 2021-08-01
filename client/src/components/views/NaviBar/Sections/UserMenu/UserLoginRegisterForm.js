import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "_actions/user_actions";

export default function Form({ type }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  function submitLogin(e) {
    e.preventDefault();
    if (type === "register") dispatch(registerUser(user));
    if (type === "login") dispatch(loginUser(user));
  }

  const handleTyping = (e) => {
    const { value, id } = e.target;

    setUser({ ...user, [id]: value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {type === "register" && "Register"}
          {type === "login" && "Log In"}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {type === "register" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={user.firstName}
                    autoFocus
                    onChange={handleTyping}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value={user.lastName}
                    onChange={handleTyping}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={user.username}
                onChange={handleTyping}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={handleTyping}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitLogin}
          >
            {type === "register" && "Register"}
            {type === "login" && "Log In"}
          </Button>
          {type === "register" && (
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          )}
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography
      style={{ padding: "20px" }}
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit">Shubham Dubey</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
