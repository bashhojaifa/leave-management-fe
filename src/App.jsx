import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import DrawerAppBar from "./components/app-bar/AppBar";
import { Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import Router from "./router/Router";

const withoutNavRoute = ["/auth/login", "/auth/register", "/not-found"];

export function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Leave Management
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  const location = useLocation();
  const withoutNav = withoutNavRoute.includes(location.pathname);

  return (
    <>
      <Stack margin={4} justifyContent="space-between" spacing={5}>
        {withoutNav ? (
          <>
            <Router />
          </>
        ) : (
          <>
            <Box>
              <DrawerAppBar>
                <Router />
              </DrawerAppBar>
            </Box>
            <Box position="relative" bottom="0px">
              <Copyright />
            </Box>
          </>
        )}
      </Stack>
    </>
  );
}
