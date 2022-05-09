import { createTheme } from "@mui/material/styles";
import { green, purple, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[500],
      contrastText: "#fff",
    },
    secondary: {
      main: green[500],
    },
  },
});

export default theme;
