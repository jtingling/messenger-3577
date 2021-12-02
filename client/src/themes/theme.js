import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, regular",
    fontWeight: "600",
    fontSize: 20,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold",
    },
  },
  props: {
    MuiInputLabel: {
      shrink: true,
    },
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "600",
        fontSize: 20,
      },
    },
    MuiFormControl: {
      root: {
        paddingTop: "20px",
      },
    },
    MuiButton: {
      containedSizeLarge: {
        padding: "20px 75px",
        marginTop: "50px",
      },
      label: {
        fontSize: 20,
        fontWeight: "500",
      },
      outlinedSecondary: {
        padding: "20px 75px",
        borderStyle: "none",
      },
      outlinedPrimary: {
        padding: "20px 50px",
        borderStyle: "none",
        boxShadow: "0px 0px 25px 3px rgba(228, 233, 237, 1)",
      },
    },
    MuiInputLabel: {
      formControl: {
        fontSize: 24,
      },
    },
    MuiTypography: {
      h3: {
        color: "white",
      },
    },
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" },
    bubble: { background: "#F4F6FA", text: "#91A3C0", date: "#BECCE2" },
    icons: { main: "#95A7C4"}
  },
  spacing: 10,
});
