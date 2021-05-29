import moment from "moment";
//quiero que tome de startDate y endDate los extremos del mes corriente

const filReducerDefaultState = {
    text:"",
    sortBy:"date",
    startDate:moment().startOf("month"),
    endDate:moment().endOf("month")
};
const filtersReducer = (state=filReducerDefaultState, action) =>{
    switch(action.type){
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text:action.text
            };
        case "SORT_BY_AMOUNT":
            return {
                ...state,
                sortBy:"amount"
            };
        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy:"date"
            };
        case "SET_START_DATE":
            return {
                ...state,
                startDate:action.startDate
            };
        case "SET_END_DATE":
            return {
                ...state,
                endDate:action.endDate
            };
        default:
            return state;
    }
};

export default filtersReducer;