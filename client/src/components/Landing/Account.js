import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  accountGroup: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    maxHeight: "50px",
    marginTop: "7%",
    [theme.breakpoints.down("xs")]: {
      marginTop: "10%",
      marginBottom: "15%",
    },
  },
  subtitle: {
    color: `${theme.palette.secondary.main}`,
    fontSize: "larger",
    paddingRight: "5%",
    [theme.breakpoints.down("xs")]: {
      fontSize: "medium",
    },
  },
  button: {
    [theme.breakpoints.down("xs")]: {
      padding: "10px 50px",
      width: "150px",
    },
  },
});

const Account = (props) => {
  const { callToAction, buttonText, routeName } = props;
  
  return (
    <Grid item xs={12} className={props.classes.accountGroup}>
      <Typography variant="string" className={props.classes.subtitle}>
        {callToAction}
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        className={props.classes.button}
        onClick={() => props.history.push(`${routeName}`)}
        disableRipple
      >
        <Typography variant="button">{buttonText}</Typography>
      </Button>
    </Grid>
  );
};

export default withStyles(styles)(Account);
