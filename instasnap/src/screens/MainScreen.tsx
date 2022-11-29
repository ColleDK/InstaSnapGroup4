import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {useEffect, useState} from "react";
import {postDataSTore} from "../stores/PostsDataStore";
import {tokenDataStore} from "../stores/TokenDataStore";
import {useNavigate} from "react-router-dom";
import {NavigationLocations} from "../util/navigation/NavigationLocations";
import {notifyError} from "../components/common/NotifyError";
import {ToastContainer} from "react-toastify";

interface MediaProps {
    loading?: boolean;
}

function Media(props: MediaProps) {
    const { loading = false } = props;

    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardHeader
                avatar={
                    loading ? (
                        <Skeleton
                            animation="wave"
                            variant="circular"
                            width={40}
                            height={40}
                        />
                    ) : (
                        <Avatar
                            alt="Ted talk"
                            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                        />
                    )
                }
                action={
                    loading ? null : (
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    )
                }
                title={
                    loading ? (
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />
                    ) : (
                        "Ted"
                    )
                }
                subheader={
                    loading ? (
                        <Skeleton animation="wave" height={10} width="40%" />
                    ) : (
                        "5 hours ago"
                    )
                }
            />
            {loading ? (
                <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
            ) : (
                <CardMedia
                    component="img"
                    height="140"
                    image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
                    alt="Nicola Sturgeon on a TED talk stage"
                />
            )}
            <CardContent>
                {loading ? (
                    <React.Fragment>
                        <Skeleton
                            animation="wave"
                            height={10}
                            style={{ marginBottom: 6 }}
                        />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>
                ) : (
                    <Typography variant="body2" color="text.secondary" component="p">
                        {
                            "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
                        }
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

export default function Facebook() {
    const [dir, setDir] = useState(true);
    const onToggle = (value = false) => setDir(value);
    const [view, setView] = React.useState("list");

    const [postsStore] = React.useState(postDataSTore)
    let navigate = useNavigate()

    useEffect(() => {
        postsStore.getPosts((code: any) => { if (code >= 500) {notifyError("An internal error has occurred.\nPlease try to reload the page!")} else {tokenDataStore.logout(); navigate(NavigationLocations.LOGIN); notifyError("You are not authorized. Please login before you continue!") }})
    }, [navigate, postsStore])

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        nextView: string
    ) => {
        setView(nextView);
        if (nextView === "list") {
            onToggle(true);
        } else {
            onToggle(false);
        }
    };
    return (
        <div>
            <ToggleButtonGroup
                orientation="horizontal"
                value={view}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton value="list" aria-label="list">
                    <ViewListIcon />
                </ToggleButton>
                <ToggleButton value="module" aria-label="module">
                    <ViewModuleIcon />
                </ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    /// <reference path="ref" />
                    container
                    direction={dir?"column":"row"}
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                >
                    <Grid item xs={5}>
                        <Media />
                    </Grid>
                    <Grid item xs={5}>
                        <Media />
                    </Grid>
                    <Grid item xs={5}>
                        <Media />
                    </Grid>
                    <Grid item xs={5}>
                        <Media />
                    </Grid>
                    <Grid item xs={5}>
                        <Media />
                    </Grid>
                    <Grid item xs={5}>
                        <Media />
                    </Grid>
                </Grid>
            </Box>
            <ToastContainer />
        </div>
    );
}
