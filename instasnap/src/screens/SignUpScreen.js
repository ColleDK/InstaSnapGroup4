import {makeStyles} from "@mui/styles";
import {Divider, Grid, TextField} from "@mui/material";
import {COLORS} from "../util/colors/Colors";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import {SignUpAddPicture} from "../components/signup/SignUpAddPicture";
import {LoginInputField} from "../components/login/LoginInputField";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {LoginButton} from "../components/login/LoginButton";

const useStyles = makeStyles((theme) => ({
    signUpContainer: {
        backgroundColor: COLORS.gray
    },
}))

export const SignUpScreen = () => {
    const classes = useStyles()
    const [date, setDate] = React.useState(dayjs())

    return (
        <Grid container direction={"row"} style={{height: '100vh'}} className={classes.signUpContainer} alignContent={"space-evenly"}>
            <Grid item xs={12} md={12} align={"center"}>
                <SignUpAddPicture>
                    <AddPhotoAlternateOutlinedIcon style={{color: 'black'}} sx={{width: 100, height: 100, alignSelf: "center"}}/>
                </SignUpAddPicture>
                <Divider sx={{"&::before, &::after": {borderColor: COLORS.white}}}><h1
                    style={{color: COLORS.white}}>Create account</h1></Divider>
                <LoginInputField text={"Email"} type={"text"} width={'40%'}/>
                <Divider sx={{height: '2vh', borderColor: COLORS.gray}}/>
                <LoginInputField text={"Password"} type={"text"} width={'40%'}/>
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
                        renderInput={(params) => <TextField {...params} sx={{backgroundColor: COLORS.lightGray, borderRadius: 50}}/>}
                    />
                </LocalizationProvider>
                <Divider sx={{height: '10vh', borderColor: COLORS.gray}}/>
                <LoginButton variant={"contained"} onClick={(e) => {}}>Sign up</LoginButton>
            </Grid>
        </Grid>
    )
}