import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { login } from "../../store/utils/thunkCreators";
import { loginConfig } from '../../configs'
import {Account} from "../Landing";
import { FormContainer } from './index';



const Login = (props) => {
  const { user, login } = props;
  const history = useHistory();
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
        callToAction="Don't have an account?"
        buttonText="Create account"
        routeName="/register"
      />
      <FormContainer
        handleSubmit={handleLogin}
        formType="login"
        form={loginConfig}
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
