/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LogoutIcon from "@mui/icons-material/Logout";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HistoryIcon from "@mui/icons-material/History";
import BeenHereIcon from "@mui/icons-material/Beenhere";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Collapse,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Groups2Icon from "@mui/icons-material/Groups2";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../redux/services/auth.slice";
import { useDispatch } from "react-redux";

const drawerWidth = 240;
const activeColor = "rgba(255, 255, 255, 0.08)";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const drawerMenu = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    isActive: false,
    hasChildren: false,
    link: "/",
    roles: ["ADMIN", "EMPLOYEE", "HOD"],
  },
  {
    title: "Department",
    icon: <Diversity3Icon />,
    isActive: false,
    hasChildren: false,
    link: "/department",
    roles: ["ADMIN"],
  },
  {
    title: "HOD",
    icon: <PeopleIcon />,
    isActive: false,
    hasChildren: true,
    collapseText: "HOD",
    roles: ["ADMIN"],
    children: [
      {
        title: "Add HOD",
        icon: <PersonAddAltIcon />,
        isActive: false,
        parent: "HOD",
        link: "/hods/add",
        roles: ["ADMIN"],
      },
      {
        title: "HOD List",
        icon: <Groups2Icon />,
        isActive: false,
        parent: "EMPLOYEE",
        link: "/hods",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Employee",
    icon: <PeopleIcon />,
    isActive: false,
    hasChildren: true,
    collapseText: "EMPLOYEE",
    roles: ["ADMIN", "HOD"],
    children: [
      {
        title: "Add Employee",
        icon: <PersonAddAltIcon />,
        isActive: false,
        parent: "EMPLOYEE",
        link: "/employees/add",
        roles: ["ADMIN", "HOD"],
      },
      {
        title: "Employee List",
        icon: <Groups2Icon />,
        isActive: false,
        parent: "EMPLOYEE",
        link: "/employees",
        roles: ["ADMIN", "HOD"],
      },
    ],
  },
  {
    title: "Leave-Type",
    icon: <LogoutIcon />,
    isActive: false,
    hasChildren: false,
    link: "/leaves/leave-types",
    roles: ["ADMIN"],
  },
  {
    title: "Leave",
    icon: <MeetingRoomIcon />,
    isActive: false,
    hasChildren: true,
    collapseText: "leave",
    roles: ["ADMIN", "EMPLOYEE", "HOD"],
    children: [
      {
        title: "All-leave",
        icon: <AddTaskIcon />,
        isActive: false,
        parent: "leave",
        link: "/leaves",
        roles: ["ADMIN", "HOD"],
      },
      {
        title: "apply-leave",
        icon: <DomainVerificationIcon />,
        isActive: false,
        parent: "leave",
        link: "/leaves/apply",
        roles: ["EMPLOYEE", "HOD"],
      },
      {
        title: "Pending",
        icon: <AccessTimeIcon />,
        isActive: false,
        parent: "leave",
        link: "/leaves/pending",
        roles: ["ADMIN", "HOD", "EMPLOYEE"],
      },
      {
        title: "Approved",
        icon: <BeenHereIcon />,
        isActive: false,
        parent: "leave",
        link: "/leaves/approved",
        roles: ["ADMIN", "HOD", "EMPLOYEE"],
      },
      {
        title: "Rejected",
        icon: <CancelIcon />,
        isActive: false,
        parent: "leave",
        link: "/leaves/rejected",
        roles: ["ADMIN", "HOD", "EMPLOYEE"],
      },
      {
        title: "Leave History",
        icon: <HistoryIcon />,
        isActive: false,
        parent: "leave",
        link: "/leaves/history",
        roles: ["ADMIN", "HOD", "EMPLOYEE"],
      },
    ],
  },
];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DrawerAppBar({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [collapse, setCollapse] = React.useState({});
  const [collapseHistory, setCollapseHistory] = React.useState({}); //for store history that was the collapse menu opened or closed when close drawer
  const handleDrawerOpen = () => {
    setOpen(true);
    setCollapse(collapseHistory);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setCollapseHistory(collapse);
    setCollapse({});
  };

  const handleCollapse = (collapseText) => {
    const temp = { ...collapse };
    temp[collapseText] = !collapse[collapseText];
    setCollapse(temp);
  };

  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const settings = [
    {
      title: "Profile",
      action: () => {
        navigate("/profile");
      },
    },
    {
      title: "Logout",
      action: () => {
        dispatch(userLogout());
      },
    },
  ];

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    if (isSmallScreen) handleDrawerClose();
  }, [isSmallScreen]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar elevation={0} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box
              sx={{
                textDecoration: "none",
                color: "text.primary",
              }}
              component={Link}
              to="/"
            >
              <Typography
                display={open ? "none" : "block"}
                variant="h6"
                noWrap
                component="div"
              >
                Leave Management
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <AccountCircleIcon
                    sx={{ fontSize: "2.5rem", color: "secondary.main" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={setting.action}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Stack>
        </Toolbar>
        <Divider />
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box
            sx={{
              textDecoration: "none",
              color: "text.primary",
            }}
            component={Link}
            to="/"
          >
            <Typography variant="h6">Leave Management</Typography>
          </Box>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerMenu.map((item) => {
            const conditions = item.collapseText
              ? collapse[item.collapseText]
              : false;
            const checkParentRole = item.roles.includes(user?.role);
            return (
              <ListItem
                key={item.title}
                disablePadding
                sx={{ display: "block" }}
              >
                {!item.hasChildren ? (
                  <>
                    {checkParentRole && (
                      <Link
                        to={item.link || ""}
                        style={{ textDecoration: "none" }}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.title}
                            sx={{ opacity: open ? 1 : 0 }}
                            primaryTypographyProps={{
                              color: "textPrimary",
                            }}
                          />
                        </ListItemButton>
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    {checkParentRole && (
                      <>
                        <ListItemButton
                          onClick={() => handleCollapse(item.collapseText)}
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                            backgroundColor: item.isActive ? activeColor : "",
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                            >
                              <Typography>{item.title}</Typography>
                              {conditions ? (
                                <ExpandLessIcon />
                              ) : (
                                <ExpandMoreIcon />
                              )}
                            </Stack>
                          </ListItemText>
                        </ListItemButton>
                        <Collapse in={conditions} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {item.children &&
                              item.children.map((child) => {
                                const checkChildRole = child.roles.includes(
                                  user?.role
                                );
                                return (
                                  <>
                                    {checkChildRole && (
                                      <Link
                                        key={item.title}
                                        to={child.link || ""}
                                        style={{ textDecoration: "none" }}
                                      >
                                        <ListItemButton
                                          href={child.link ? child.link : ""}
                                          sx={{ pl: 4 }}
                                        >
                                          <ListItemIcon>
                                            {child.icon}
                                          </ListItemIcon>
                                          <ListItemText
                                            primary={child.title}
                                            primaryTypographyProps={{
                                              color: "textPrimary",
                                            }}
                                          />
                                        </ListItemButton>
                                      </Link>
                                    )}
                                  </>
                                );
                              })}
                          </List>
                        </Collapse>
                      </>
                    )}
                  </>
                )}
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" flexGrow={1} width="100%">
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
