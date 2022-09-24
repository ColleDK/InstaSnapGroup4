import {styled} from "@mui/styles";
import {COLORS} from "../../colors/colors";
import {Button} from "@mui/material";


export const SignUpButton = styled(Button)({
    '&&&': {
        backgroundColor: COLORS.lightGray,
        color: 'black',
        width: '20%'
    }
})
