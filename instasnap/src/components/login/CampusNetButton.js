import {styled} from "@mui/styles";
import {COLORS} from "../../colors/colors";
import {Button} from "@mui/material";


export const CampusNetButton = styled(Button)({
    '&&&': {
        backgroundColor: COLORS.campusNet,
        color: COLORS.white,
    }
})
