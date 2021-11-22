import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, regular",
    fontWeight: "600",
    fontSize: 'large',
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    },
  },
  props: {
    MuiInputLabel: {
      shrink: true
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "600",
        fontSize: '1rem'
      }
    },
    MuiFormControl: {
      root: {
        paddingTop: '20px'
      }
    },
    MuiButton: {
      '&:hover': {
        backgroundColor: 'transparent'
      },
      containedSizeLarge: {
        padding: '20px 75px',
        marginTop: '50px'
      },
      label: {
        fontSize: 'large',
        fontWeight: '500',

      },
      outlinedSecondary: {
        padding: '20px 75px',
        borderStyle: 'none'
      },
      outlinedPrimary: {
        padding: '20px 50px',
        borderStyle: 'none',
        boxShadow: '0px 0px 25px 3px rgba(228, 233, 237, 1)',
      }
    },
    MuiInputLabel: {
      formControl: {
        fontSize: 'x-large'
      }
    },
    MuiTypography: {
      h3: {
        color: 'white'
      }
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" }
  },
});
