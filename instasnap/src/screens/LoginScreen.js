import React from 'react'
import {Button, Grid} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {FacebookButton} from "../components/login/FacebookButton";
import {COLORS} from "../util/colors/Colors";
import {LoginInputField} from "../components/login/LoginInputField";
import {GoogleButton} from "../components/login/GoogleButton";
import {CampusNetButton} from "../components/login/CampusNetButton";
import {LoginButton} from "../components/login/LoginButton";
import {SignUpButton} from "../components/login/SignUpButton";
import { useNavigate } from "react-router-dom";
import {NavigationLocations} from "../util/navigation/NavigationLocations";
import Typography from "@mui/material/Typography";
import {tokenDataStore, LoginStates} from "../stores/TokenDataStore";

const useStyles = makeStyles((theme) => ({
    dividerContainer: {
        borderRight: '1px solid white',
        display: 'inline-flex'
    },
    loginContainer: {
        backgroundColor: COLORS.gray
    },
    signUpContainer: {
        backgroundColor: COLORS.signUpGray,
        borderLeft: {xs: 0, md: 1}
    },
    facebookButton: {
        backgroundColor: COLORS.facebook,
        color: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButton: {
        color: "secondary",
        backgroundColor: COLORS.lightGray,
        width: 'auto'
    }
}))

export default function LoginScreen() {
    const classes = useStyles()
    let navigate = useNavigate()

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const [error, setError] = React.useState(false)

    return (
        <Grid container direction={"row"} style={{height: '100vh'}}>
            <Grid container spacing={4} item xs={12} md={8} className={classes.loginContainer} direction={"row"} alignContent={"center"}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h3" component="div" style={{color: COLORS.white, fontWeight: 'bold'}}>
                        Login to your account
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <LoginInputField text={"Email"} width={'60%'} onChange={(event) => setEmail(event.target.value)} value={email} error={error}/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <LoginInputField text={"Password"} type={"password"} width={'60%'} onChange={(event) => setPassword(event.target.value)} value={password} error={error}/>
                </Grid>

                <Grid item xs={12} md={12}>
                    <LoginButton loading={ tokenDataStore.state === LoginStates.LOGGING_IN } variant={"contained"} onClick={(e) => {
                        tokenDataStore.login(email, password)
                    }}>Login</LoginButton>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography variant="h3" component="div" style={{color: COLORS.white, fontWeight: 'bold'}}>
                        Or login with
                    </Typography>
                </Grid>

                <Grid item xs={12} md={12}/>

                <Grid container spacing={2} direction={"row"} justifyContent={"center"}>
                    <Grid item xs={3} md={3}>
                        <FacebookButton variant={"contained"}>Facebook</FacebookButton>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <GoogleButton variant={"contained"}>Google</GoogleButton>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <CampusNetButton variant={"contained"}>CampusNet</CampusNetButton>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={12}/>
                <Grid item xs={12} md={12}/>
                <Grid item xs={12} md={12}/>

                <Grid item xs={12} md={12}>
                    <Button style={{color: COLORS.white, opacity: '50%'}}>Forgot your password?</Button>
                </Grid>

            </Grid>
            <Grid container spacing={4} item xs={12} md={4} className={classes.signUpContainer} direction={"row"} alignContent={"center"}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h3" component="div" style={{color: COLORS.white, fontWeight: 'bold'}}>
                        New to InstaSnap?
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" component="div" style={{color: COLORS.white, fontWeight: 'bold'}}>
                        Sign up now to unlock a great amount of features
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <SignUpButton onClick={(e) => navigate(NavigationLocations.SIGN_UP)}>Sign up</SignUpButton>
                </Grid>
            </Grid>
        </Grid>
    )
}
