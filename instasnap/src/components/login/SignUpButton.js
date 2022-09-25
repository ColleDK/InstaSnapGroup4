import {styled} from "@mui/styles";
import {COLORS} from "../../util/colors/Colors";
import {Button} from "@mui/material";


export const SignUpButton = styled(Button)({
    '&&&': {
        backgroundColor: COLORS.lightGray,
        color: 'black',
        width: '20%'
    }
})
