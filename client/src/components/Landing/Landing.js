import React from "react";
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import bubble from "../../assets/images/bubble.svg";
import bgImg from "../../assets/images/bg-img.png";

const useStyles = makeStyles((theme) => ({
  landingContainer: {
    width: "100vw",
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    justifyContent: "center",
    alignContent: "center",
    [theme.breakpoints.up("xs")]: {
      height: "33vh",
      backgroundPosition: "15% 0%",
    },
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
      backgroundPosition: "50% 50%",
    },
  },
  gradient: {
    justifyContent: "center",
    width: "inherit",
    height: "inherit",
    opacity: "85%",
    background: "linear-gradient(#3A8DFF, #86B9FF)",
  },
  logoGroup: {
    alignContent: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      maxWidth: theme.spacing(25),
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: theme.spacing(40),
    },
  },
  speechBubble: {
    width: "90px",
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(-1),
      marginBottom: theme.spacing(1),
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(-5),
      marginBottom: theme.spacing(2.5),
    },
  },
  titleText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 26,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 28,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 32,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 36,
    },
  },
}));

const Landing = (props) => {
  const classes = useStyles()
  return (
    <Grid container direction="row">
      <Grid
        item
        xs={12}
        sm={4}
        container
        className={classes.landingContainer}
      >
        <Grid item container className={classes.gradient}>
          <Grid item container className={classes.logoGroup}>
            <Box>
              <Box
                component="img"
                src={bubble}
                className={classes.speechBubble}
                alt="speech bubble"
              />
            </Box>
            <Typography
              align="center"
              variant="h3"
              className={classes.titleText}
            >
              Converse with anyone with any language
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        style={{ backgroundColor: "white" }}
        container
        direction="row"
        justifyContent="center"
      >
        {props.children}
      </Grid>
    </Grid>
  );
};

export default Landing;
