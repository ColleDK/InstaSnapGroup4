import React from 'react'
import {TextField} from "@mui/material";
import {COLORS} from "../../util/colors/Colors";


export const LoginInputField = ({text, type, width, value, onChange, error, helperText}) => {
    return (
        <TextField label={text} variant={"filled"} fullWidth={true} type={type}
                   style={{color: COLORS.white, backgroundColor: COLORS.lightGray, width: width, borderColor: COLORS.gray}} onChange={onChange} value={value} error={error} helperText={helperText}/>
    )
}