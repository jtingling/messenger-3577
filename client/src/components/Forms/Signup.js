import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { register } from "../../store/utils/thunkCreators";
import { signupConfig } from '../../configs'
import { FormContainer } from "./index";
import { Account } from "../Landing";

const Login = (props) => {
  const { user, register } = props;
  const history = useHistory();

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
        callToAction="Already have an Account?"
        buttonText="Login"
        routeName="/login"
      />
      <FormContainer
        handleSubmit={handleRegister}
        formType="signup"
        form={signupConfig}
      />
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
