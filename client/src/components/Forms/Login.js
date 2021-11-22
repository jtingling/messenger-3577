import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  InputAdornment,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { login } from "../../store/utils/thunkCreators";
import { inputConfig } from "../../InputConfigs/formConfig";
import { Account } from "../Landing";

const accountConfig = {
  callToAction: "Don't have an account?",
  buttonText: "Create account",
  routeName: "/register",
};

const loginConfig = {
  loginMsg: "Welcome Back!",
  buttonText: "Login",
};

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.5rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "3.0rem",
    },
  },
}));

const Login = (props) => {
  const { user, login } = props;
  const history = useHistory();
  const classes = useStyles();
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid item xs={10} container>
      <Account
        history={history}
        callToAction={accountConfig.callToAction}
        buttonText={accountConfig.buttonText}
        routeName={accountConfig.routeName}
      />
      <form onSubmit={handleLogin}>
        <Grid container justifyContent="center" direction="row">
          <Grid
            item
            container
            xs={9}
            justifyContent="flex-start"
            alignContent="center"
          >
            <Typography variant="h4" className={classes.title}>
              {loginConfig.loginMsg}
            </Typography>
            <FormControl margin="normal" fullWidth required>
              <TextField
                aria-label={`${inputConfig.userName.ariaLabel}`}
                label={`${inputConfig.userName.label}`}
                name={`${inputConfig.userName.name}`}
                type={`${inputConfig.userName.type}`}
                margin="normal"
              />
            </FormControl>
            <FormControl margin="normal" fullWidth required>
              <TextField
                aria-label={`${inputConfig.password.ariaLabel}`}
                label={`${inputConfig.password.label}`}
                name={`${inputConfig.password.name}`}
                type={`${inputConfig.password.type}`}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button color="primary" disableRipple>
                        Forgot?
                      </Button>
                    </InputAdornment>
                  ),
                }}
                inputProps={{ style: { fontSize: "2rem" } }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={8} container justifyContent="center">
            <Grid item>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="large"
                disableElevation
                disableRipple
              >
                {loginConfig.buttonText}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
