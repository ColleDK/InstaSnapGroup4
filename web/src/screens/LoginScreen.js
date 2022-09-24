import React from 'react'
import {Button, Grid} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {FacebookButton} from "../components/login/FacebookButton";
import {COLORS} from "../colors/colors";
import {LoginInputField} from "../components/login/LoginInputField";
import {GoogleButton} from "../components/login/GoogleButton";
import {CampusNetButton} from "../components/login/CampusNetButton";
import {LoginButton} from "../components/login/LoginButton";
import {SignUpButton} from "../components/login/SignUpButton";
import { useNavigate } from "react-router-dom";

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

export const LoginScreen = () => {
    const classes = useStyles()
    let navigate = useNavigate()

    return (
        <Grid container direction={"row"} style={{height: '100vh'}} alignContent={"stretch"}>
            <Grid container spacing={4} item xs={12} md={8} className={classes.loginContainer} direction={"row"} alignContent={"center"}>
                <Grid item xs={12} md={12}>
                    <h1 style={{color: COLORS.white, fontWeight: 'bold'}}>Login to your account</h1>
                </Grid>
                <Grid item xs={12} md={12}>
                    <LoginInputField text={"Email"}/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <LoginInputField text={"Password"} type={"password"}/>
                </Grid>

                <Grid item xs={12} md={12}>
                    <LoginButton variant={"contained"} onClick={(e) => navigate("/")}>Login</LoginButton>
                </Grid>

                <Grid item xs={12} md={12}>
                    <h1 style={{color: COLORS.white, fontWeight: 'bold'}}>Or login with</h1>
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
            <Grid container item xs={12} md={4} className={classes.signUpContainer} direction={"row"} alignContent={"center"}>
                <Grid item xs={12} md={12}>
                    <h1 style={{color: COLORS.white, fontWeight: 'bold'}}>New to InstaSnap?</h1>
                </Grid>
                <Grid item xs={12} md={12}>
                    <h3 style={{color: COLORS.white, fontWeight: 'bold'}}>Sign up now to unlock a great amount of features </h3>
                </Grid>
                <Grid item xs={12} md={12}>
                    <SignUpButton onClick={(e) => navigate("/signup")}>Sign up</SignUpButton>
                </Grid>
            </Grid>
        </Grid>
    )
}