import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [emailerr, setemailerr] = useState("");
  const [passerr, setpasserr] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const history = useNavigate();

  const validmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const validpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  return (
    <Container component="main" maxWidth="xs" className="main-comp">
      <CssBaseline />
      <div id="rt" className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} required>
          <TextField
            onChange={(e) => {
              setemail(e.target.value);
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
          />
          <p className="err">{emailerr}</p>
          <TextField
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <p className="err">{passerr}</p>
          <Button
            onClick={async () => {
              try {
                const res = await fetch(
                  "https://private-052d6-testapi4528.apiary-mock.com/authenticate",
                  {
                    method: "post",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ email, password }),
                  }
                );

                if (!password.match(validpass)) {
                  setpasserr("Unvalid Password!");
                } else {
                  setpasserr("");
                }
                if (!email.match(validmail)) {
                  setemailerr("Email is Unvalid!");
                } else {
                  setemailerr("");
                }

                if (!email || !password) {
                  setemailerr("Missing Info!");
                }
                if (
                  email &&
                  password &&
                  password.match(validpass) &&
                  email.match(validmail)
                ) {
                  const data = await res.json();
                  console.log(data);

                  setemailerr("Sucsses!");
                  setpasserr("Sucsses!");
                  history("/info");
                  localStorage.name = data[0].personalDetails.name;
                  localStorage.joined = data[0].personalDetails.joinedAt;
                  localStorage.avatar = data[0].personalDetails.avatar;
                  localStorage.team = data[0].personalDetails.Team;
                  localStorage.token = data[0].token;
                }
              } catch (err) {
                console.log(err);
              }
            }}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
// Fix Colors//
