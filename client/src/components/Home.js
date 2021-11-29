import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { fetchConversations } from "../store/utils/thunkCreators";
import { cloudinaryWidget, UploadWidget } from "../contexts/cloundaryWidget";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const { user, fetchConversations } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user.id) {
      setIsLoggedIn(true);
    }
  }, [user.id]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  if (!user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (isLoggedIn) return <Redirect to="/login" />;
    return <Redirect to="/register" />;
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer />
        <UploadWidget.Provider value={cloudinaryWidget}>
          <ActiveChat />
        </UploadWidget.Provider>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
