import React from "react";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Form } from ".";

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 24,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 32,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 42,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 52,
    },
  },
}));

const FormContainer = (props) => {
  const { handleSubmit, formType, form } = props;
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <Grid container justifyContent="center" direction="row">
        <Grid
          item
          container
          xs={9}
          justifyContent="flex-start"
          alignContent="center"
        >
          <Typography varient="h4" className={classes.title}>
            {form.title}
          </Typography>
          {form.labels.map((label) => {
            return (
              <Form
                ariaLabel={label.ariaLabel}
                label={label.label}
                name={label.name}
                type={label.type}
                formType={formType}
                key={label.id}
              />
            );
          })}
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
              {form.buttonText}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormContainer;
