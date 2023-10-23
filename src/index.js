import * as React from "react";
import * as ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { store } from "./redux/store";
import App from "./App";
import { SnackbarProvider } from "notistack";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <CssBaseline />
          <GlobalStyles
            styles={{
              body: {
                backgroundColor:
                  theme.palette.mode === "light" ? grey[100] : "",
              },
            }}
          />
          <SnackbarProvider autoHideDuration={5000} maxSnack={3}>
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </Provider>
  </ThemeProvider>
);
