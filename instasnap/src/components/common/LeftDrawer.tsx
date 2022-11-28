import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import {ReactNode} from "react";
import {tokenDataStore} from "../../stores/TokenDataStore";
import {NavigationLocations} from "../../util/navigation/NavigationLocations";
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    })
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    }),
    ...{
        backgroundColor: "#414040"
    }
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    ...{
        backgroundColor: "#414040"
    }
}));

const DrawerFooter = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "end",
    padding: theme.spacing(0, 0),
    flex: 1,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    ...{
        backgroundColor: "#414040",
        color: "white"
    }
}));

export default function LeftDrawer({content}:{content?:ReactNode}) {
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const images = [
        <HomeIcon style={{color: "white"}}/>,
        <AccountCircleIcon style={{ color: "white" }} />,
        <AddPhotoAlternateIcon style={{ color: "white" }} />,
        <PeopleAltIcon style={{ color: "white" }} />,
        <SettingsIcon style={{ color: "white" }} />
    ];

    const navigations = [
        NavigationLocations.MAIN,
        NavigationLocations.MAIN,
        NavigationLocations.MAIN,
        NavigationLocations.MAIN,
        NavigationLocations.SETTINGS,
    ]

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Instasnap
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box"
                    }
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon style={{ color: "white" }} />
                        ) : (
                            <ChevronRightIcon style={{ color: "white" }} />
                        )}
                    </IconButton>
                </DrawerHeader>
                <ListItem
                    style={{ backgroundColor: "#414040", justifyContent: "center" }}
                >
                    <IconButton sx={{ width: 56, height: 56, alignSelf: "center" }}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56, alignSelf: "center" }}
                        />
                    </IconButton>
                </ListItem>
                <List style={{ backgroundColor: "#414040", color: "white" }}>
                    {["Homepage","Profile", "Create post", "Friend's activity", "Settings"].map(
                        (text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={(e) => {navigate(navigations[index])}}>
                                    <ListItemIcon>{images[index]}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        )
                    )}
                </List>
                <DrawerFooter>
                    <ListItemButton onClick={(e) => {
                        tokenDataStore.logout()
                        navigate(NavigationLocations.LOGIN)
                    }}>
                        <ListItemIcon>
                            <LogoutIcon style={{ color: "white", opacity: "50%" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Logout"
                            style={{ textAlign: "start", opacity: "50%" }}
                        />
                    </ListItemButton>
                </DrawerFooter>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {content}
            </Main>
        </Box>
    );
}
