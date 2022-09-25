import {styled} from "@mui/styles";
import {COLORS} from "../../util/colors/Colors";
import {LoadingButton} from "@mui/lab";


export const LoginButton = styled(LoadingButton)({
    '&&&': {
        backgroundColor: COLORS.lightGray,
        color: 'black',
        width: '20%'
    }
})
