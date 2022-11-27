import {makeStyles} from "@mui/styles";
import {Divider, Grid, TextField} from "@mui/material";
import {COLORS} from "../util/colors/Colors";
import {SignUpAddPicture} from "../components/signup/SignUpAddPicture";
import {LoginInputField} from "../components/login/LoginInputField";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {LoginButton} from "../components/login/LoginButton";
import {tokenDataStore} from "../stores/TokenDataStore";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import {NavigationLocations} from "../util/navigation/NavigationLocations";
import {toast, ToastContainer} from "react-toastify";

const useStyles = makeStyles((theme) => ({
    signUpContainer: {
        backgroundColor: COLORS.gray
    },
}))

export const SignUpScreen = () => {
    const classes = useStyles()
    let navigate = useNavigate()

    const [nameError, setNameError] = React.useState(false)
    const [emailError, setEmailError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)

    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [date, setDate] = React.useState(dayjs())

    const notify = (text) => toast.error(text, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    return (
        <Grid container direction={"row"} style={{height: '100vh'}} className={classes.signUpContainer} alignContent={"top"}>
            <Grid item xs={12} md={12} align={"left"}>
                <SignUpAddPicture onClick={(event) => {navigate(NavigationLocations.LOGIN)}}>
                    <ArrowBackIcon style={{color: 'black'}} sx={{width: 15, height: 15, alignSelf: "center"}}/>
                </SignUpAddPicture>
            </Grid>
            <Grid item xs={12} md={12} align={"center"}>
                <Divider sx={{"&::before, &::after": {borderColor: COLORS.white}}}><h1
                    style={{color: COLORS.white}}>Create account</h1></Divider>
                <LoginInputField text={"Name"} type={"text"} width={'40%'} onChange={(event) => {
                    setName(event.target.value);
                    setNameError(false);
                }} value={name} error={nameError}/>
                <Divider sx={{height: '2vh', borderColor: COLORS.gray}}/>
                <LoginInputField text={"Email"} type={"text"} width={'40%'} onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailError(false);
                }} value={email} error={emailError}/>
                <Divider sx={{height: '2vh', borderColor: COLORS.gray}}/>
                <LoginInputField text={"Password"} type={"text"} width={'40%'} onChange={(event) => {
                    setPassword(event.target.value);
                    setPasswordError(false);
                }} value={password} error={passwordError}/>
                <Divider sx={{height: '2vh', borderColor: COLORS.gray}}/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        disableFuture={true}
                        label={"Birthday"}
                        openTo={"year"}
                        views={['year', 'month', 'day']}
                        value={date}
                        onChange={(newDate) => {
                            setDate(newDate)
                        }}
                        renderInput={(params) => <TextField {...params} sx={{backgroundColor: COLORS.lightGray}}/>}
                    />
                </LocalizationProvider>
                <Divider sx={{height: '10vh', borderColor: COLORS.gray}}/>
                <LoginButton variant={"contained"} onClick={(e) => {
                    setNameError(name === "")
                    setEmailError(email === "")
                    setPasswordError(password === "")
                    if (name === "" || email === "" || password === ""){
                        notify("Make sure that all information is filled out!")
                        return;
                    }
                    tokenDataStore.createUser(name, email, password, date, () => {setEmailError(true); setNameError(true); setPasswordError(true); notify("An error has occurred.\nMake sure that all data is correct and try again!")}, () => navigate(NavigationLocations.LOGIN))
                }}>Sign up</LoginButton>
            </Grid>
            <ToastContainer />
        </Grid>
    )
}