import {styled} from "@mui/styles";
import {COLORS} from "../../colors/colors";
import {LoadingButton} from "@mui/lab";


export const LoginButton = styled(LoadingButton)({
    '&&&': {
        backgroundColor: COLORS.lightGray,
        color: 'black',
        width: '20%'
    }
})
