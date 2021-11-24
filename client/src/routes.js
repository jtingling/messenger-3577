import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./store/utils/thunkCreators";
import { Signup, Login } from "./components/Forms";
import { Landing } from "./components/Landing";
import { Home, SnackbarError } from "./components";

const Routes = (props) => {
  const { user, fetchUser } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user.error) {
      // check to make sure error is what we expect, in case we get an unexpected server error object
      if (typeof user.error === "string") {
        setErrorMessage(user.error);
      } else {
        setErrorMessage("Internal Server Error. Please try again");
      }
      setSnackBarOpen(true);
    }
  }, [user.error]);

  if (props.user.isFetchingUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Switch>
        <Route
          path="/login"
          render={() => (
            <Landing>
              <Login />
            </Landing>
          )}
        />
        <Route
          path="/register"
          render={() => (
            <Landing>
              <Signup />
            </Landing>
          )}
        />
        <Route
          exact
          path="/"
          render={(props) =>
            props.user?.id ? (
              <Home />
            ) : (
              <Landing>
                <Signup />
              </Landing>
            )
          }
        />
        <Route path="/home" render={() => <Home />} />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser() {
      dispatch(fetchUser());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
