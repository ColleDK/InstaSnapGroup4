import React, {useEffect} from 'react'
import {Button, Grid} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {COLORS} from "../util/colors/Colors";
import {LoginInputField} from "../components/login/LoginInputField";
import {CampusNetButton} from "../components/login/CampusNetButton";
import {LoginButton} from "../components/login/LoginButton";
import {SignUpButton} from "../components/login/SignUpButton";
import { useNavigate } from "react-router-dom";
import {NavigationLocations} from "../util/navigation/NavigationLocations";
import Typography from "@mui/material/Typography";
import {LoginStates, tokenDataStore} from "../stores/TokenDataStore";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notifyError} from "../components/common/NotifyError";

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

    console.log(tokenDataStore.state)
    useEffect(
        () => {
            if (tokenDataStore.state === LoginStates.LOGGED_IN) {
                navigate(NavigationLocations.MAIN)
            }
        },[navigate]
    )

    return (
        <Grid container direction={"row"} style={{height: '100vh'}}>
            <Grid container spacing={4} item xs={12} md={8} className={classes.loginContainer} direction={"row"} alignContent={"center"}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h3" component="div" style={{color: COLORS.white, fontWeight: 'bold'}}>
                        Login to your account
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <LoginInputField text={"Email"} width={'60%'} onChange={(event) => {setEmail(event.target.value); setError(false)}} value={email} error={error}/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <LoginInputField text={"Password"} type={"password"} width={'60%'} onChange={(event) => {
                        setPassword(event.target.value); setError(false)
                    }} value={password} error={error}/>
                </Grid>

                <Grid item xs={12} md={12}>
                    <LoginButton variant={"contained"} onClick={(e) => {
                        if (email === "" || password === "") {
                            setError(true)
                        } else {
                            tokenDataStore.login(email, password, (code) => {
                                console.log(code)
                                console.log(code.toString().startsWith('5', 0))
                                if (code.toString().startsWith('5', 0)){
                                    notifyError("Internal error occurred.\nPlease try again!")
                                } else {
                                    setError(true)
                                }
                            }, () => {
                                navigate(NavigationLocations.MAIN)
                            })
                        }
                    }}>Login</LoginButton>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography variant="h3" component="div" style={{color: COLORS.white, fontWeight: 'bold'}}>
                        Or login with
                    </Typography>
                </Grid>

                <Grid item xs={12} md={12}/>

                <Grid container spacing={2} direction={"row"} justifyContent={"center"}>
                    {/*<Grid item xs={3} md={3}>*/}
                    {/*    <FacebookButton variant={"contained"}>Facebook</FacebookButton>*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={3} md={3}>*/}
                    {/*    <GoogleButton variant={"contained"}>Google</GoogleButton>*/}
                    {/*</Grid>*/}
                    <Grid item xs={3} md={3}>
                        <CampusNetButton variant={"contained"} onClick={() => { tokenDataStore.loginCampusNet((code) => { if (code >= 500) notifyError("An internal error occurred, please try again!")}) }}>CampusNet</CampusNetButton>
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
            <ToastContainer />
        </Grid>
    )
}
