import React from 'react'
import {Button, Grid} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {LoginButton} from "../components/login/LoginButton";
import {COLORS} from "../colors/colors";
import {LoginInputField} from "../components/login/LoginInputField";

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

    return (
        <Grid container spacing={{xs: 1, md: 3}} direction={"row"} style={{height: '100vh'}} alignContent={"stretch"}>
            <Grid container spacing={4} item xs={12} md={7} className={classes.loginContainer}>
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
                    <h1 style={{color: COLORS.white, fontWeight: 'bold'}}>Or login with</h1>
                </Grid>
                <Grid container spacing={2} direction={"row"} justifyContent={"space-evenly"}>
                    <Grid item xs={3} md={3}>
                        <LoginButton variant={"contained"}>Facebook</LoginButton>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <LoginButton variant={"contained"}>Google</LoginButton>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <LoginButton variant={"contained"}>CampusNet</LoginButton>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button >Forgot your password?</Button>
                </Grid>
            </Grid>
            <Grid item xs={12} md={5} className={classes.signUpContainer}>

            </Grid>
        </Grid>
    )
}
