// chứa các biến là function dùng chung cho project

import moment from "moment";

export const format = (date, format = "LLL") => {
    return moment(date).format(format)
}