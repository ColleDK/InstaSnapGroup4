import React from 'react'
import {TextField} from "@mui/material";
import {COLORS} from "../../colors/colors";


export const LoginInputField = ({text, type}) => {
    return (
        <TextField label={text} variant={"filled"} fullWidth={true} type={type}
                   style={{color: COLORS.white, backgroundColor: COLORS.lightGray, width: '60%', borderRadius: 50}}/>
    )
}