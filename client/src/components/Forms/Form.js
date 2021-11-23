import React from "react";
import {
  FormControl,
  Button,
  InputAdornment,
  TextField,
} from "@material-ui/core";

const Form = (props) => {
  const { ariaLabel, label, name, type, formType } = props;

  const isLogInForm = () => {
    if (type === "password" && formType === "login") {
      return true;
    }
    return false;
  };

  return (
    <FormControl margin="normal" fullWidth required>
      <TextField
        aria-label={ariaLabel}
        label={label}
        name={name}
        type={type}
        margin="normal"
        InputLabelProps={{ required: false }}
        InputProps={
          isLogInForm()
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <Button color="primary" disableRipple>
                      Forgot?
                    </Button>
                  </InputAdornment>
                ),
              }
            : {}
        }
        inputProps={type === "password" ? { style: { fontSize: 30 } } : {}}
      />
    </FormControl>
  );
};

export default Form;
