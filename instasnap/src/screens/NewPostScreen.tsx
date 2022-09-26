import * as React from "react";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
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
import { useState} from "react";
import { Button } from "@mui/material";

interface MediaProps {
    loading?: boolean;
    bodyText?: string;
    lastEditTime?: Date;
}

function Media(props: MediaProps) {
    const { loading = false, bodyText, lastEditTime } = props;
    const now = new Date();
    // @ts-ignore
    const diffTime = Math.abs(now.getTime() - lastEditTime.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

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
                        diffHours + " hours ago"
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
                        {bodyText}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

function subtractTimeFromDate(objDate: Date, intHours: number) {
    var numberOfMlSeconds = objDate.getTime();
    var addMlSeconds = (intHours * 60) * 60 * 1000;
    var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
    return newDateObj;
}

export default function CreatePost() {
    const [bodyText, setbodyText] = useState("");
    const fiveHoursAgo = subtractTimeFromDate(new Date(), 5);
    const [lastEditTime, setLastEditTime] = useState(fiveHoursAgo);

    return (
        <Box sx={{ width: "100%", maxWidth: 500 }}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Create new post
                </Typography>
                <FormControl>
                    <InputLabel htmlFor="my-input"></InputLabel>
                    <Input
                        id="my-input"
                        aria-describedby="my-helper-text"
                        onChange={(e) => {
                            setbodyText(e.target.value);
                            setLastEditTime(new Date());
                        }}
                    />
                    <FormHelperText id="my-helper-text">
                        Please write something about your post
                    </FormHelperText>
                </FormControl>
                <Box>
                    <Button variant="outlined">Post</Button>
                    <Button variant="outlined" disabled>
                        {" "}
                        Save Draft{" "}
                    </Button>
                </Box>
            </Box>
            <Media bodyText={bodyText} lastEditTime={lastEditTime} />
        </Box>
    );
}
