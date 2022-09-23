import React from 'react'
import {TextField} from "@mui/material";
import {COLORS} from "../../colors/colors";


export const LoginInputField = ({text, type}) => {
    return (
        <TextField label={text} variant={"filled"} fullWidth={true} type={type}
                   style={{color: COLORS.white, backgroundColor: COLORS.lightGray, borderRadius: 50, width: '70%'}}/>
    )
}