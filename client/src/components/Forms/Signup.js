import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  FormControl,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { register } from "../../store/utils/thunkCreators";
import { inputConfig } from "../../InputConfigs/formConfig";
import { Account } from "../Landing";

const accountConfig = {
  callToAction: "Already have an Account?",
  buttonText: "Login",
  routeName: "/login",
};

const signupConfig = {
  signupMsg: "Create an account.",
  buttonText: "Create",
};

const useFontSizes = makeStyles((theme) => ({
  password: {
    fontSize: "3.0rem",
  },
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
  const { user, register } = props;
  const history = useHistory();
  const classesFontSize = useFontSizes();

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register({ username, email, password });
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
      <form onSubmit={handleRegister}>
        <Grid item container sm={12}>
          <Grid container justifyContent="center" direction="row">
            <Grid
              item
              container
              xs={9}
              justifyContent="flex-start"
              alignContent="center"
            >
              <Typography variant="h4" className={classesFontSize.title}>
                {signupConfig.signupMsg}
              </Typography>
              <FormControl margin="normal" fullWidth required>
                <TextField
                  aria-label={`${inputConfig.userName.ariaLabel}`}
                  label={`${inputConfig.userName.label}`}
                  name={`${inputConfig.userName.name}`}
                  type={`${inputConfig.userName.type}`}
                  InputLabelProps={{ required: false }}
                  margin="normal"
                />
              </FormControl>
              <FormControl margin="normal" fullWidth required>
                <TextField
                  aria-label={`${inputConfig.email.ariaLabel}`}
                  label={`${inputConfig.email.label}`}
                  name={`${inputConfig.email.name}`}
                  type={`${inputConfig.email.type}`}
                  InputLabelProps={{ required: false }}
                  margin="normal"
                />
              </FormControl>
              <FormControl margin="normal" fullWidth required>
                <TextField
                  aria-label={`${inputConfig.password.ariaLabel}`}
                  label={`${inputConfig.password.label}`}
                  name={`${inputConfig.password.name}`}
                  type={`${inputConfig.password.type}`}
                  inputProps={{ minLength: 6, style: { fontSize: "2rem" } }}
                  InputLabelProps={{ required: false }}
                  margin="normal"
                />
              </FormControl>
              <Grid item container justifyContent="center">
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="large"
                  disableElevation
                  disableRipple
                >
                  {signupConfig.buttonText}
                </Button>
              </Grid>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
