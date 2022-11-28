import {useNavigate} from "react-router-dom";
import {Divider, Grid, TextField} from "@mui/material";
import {LoginInputField} from "../components/login/LoginInputField";
import React from "react";
import dayjs from "dayjs";
import {makeStyles} from "@mui/styles";
import {COLORS} from "../util/colors/Colors";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {notifyError} from "../components/common/NotifyError";
import {LoginButton} from "../components/login/LoginButton";

const useStyles = makeStyles((theme) => ({
    signUpContainer: {
        backgroundColor: COLORS.gray
    },
}))

export default function ProfileSettingsScreen(){
    const classes = useStyles()

    const [nameError, setNameError] = React.useState(false)
    const [emailError, setEmailError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)

    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [date, setDate] = React.useState(dayjs())

    return(
        <Grid container direction={"row"} style={{height:`calc(100vh - 7vh)`}} alignContent={"center"} className={classes.signUpContainer}>
            <Grid item xs={12} md={12}>
                <LoginInputField text={"Name"} width={'60%'} onChange={(event) => {setName(event.target.value); setNameError(false)}} value={name} error={nameError}/>
            </Grid>

            <Divider sx={{height: '10vh', borderColor: COLORS.gray}}/>
            <Grid item xs={12} md={12}>
                <LoginInputField text={"Email"} width={'60%'} onChange={(event) => {setEmail(event.target.value); setEmailError(false)}} value={email} error={emailError}/>
            </Grid>

            <Divider sx={{height: '10vh', borderColor: COLORS.gray}}/>
            <Grid item xs={12} md={12}>
                <LoginInputField text={"Password"} width={'60%'} onChange={(event) => {setPassword(event.target.value); setPasswordError(false)}} value={password} error={passwordError}/>
            </Grid>

            <Divider sx={{height: '10vh', borderColor: COLORS.gray}}/>
            <Grid item xs={12} md={12}>
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
            </Grid>
            <Divider sx={{height: '10vh', borderColor: COLORS.gray}}/>
            <Grid item xs={12} md={12}>
                <LoginButton variant={"contained"} onClick={(e) => {
                    setNameError(name === "")
                    setEmailError(email === "")
                    setPasswordError(password === "")
                    if (name === "" || email === "" || password === ""){
                        notifyError("Make sure that all information is filled out!")
                        return;
                    }
                    // tokenDataStore.createUser(name, email, password, date, () => {setEmailError(true); setNameError(true); setPasswordError(true); notifyError("An error has occurred.\nMake sure that all data is correct and try again!")}, () => navigate(NavigationLocations.LOGIN))
                }}>Save</LoginButton>
            </Grid>
        </Grid>
    )

}