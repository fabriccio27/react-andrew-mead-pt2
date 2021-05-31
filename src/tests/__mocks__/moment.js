const moment = jest.requireActual("moment");
// no puedo import moment from "moment" porque se autollamaria, un quilombo, cambio a sintaxis de node

export default (timestamp=0)=>{
    return moment(timestamp);
}