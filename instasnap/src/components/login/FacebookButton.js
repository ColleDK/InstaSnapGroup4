import {Button} from "@mui/material";
import {styled} from "@mui/styles";
import {COLORS} from "../../util/colors/Colors";


export const FacebookButton = styled(Button)({
    '&&&': {
        backgroundColor: COLORS.facebook,
        color: COLORS.white,
    }
})
