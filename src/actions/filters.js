const setTextFilter = (text = "") => {
    return {
        type:"SET_TEXT_FILTER",
        text
    };
}

const sortByDate= ()=>({type:"SORT_BY_DATE"});
const sortByAmount= ()=>({type:"SORT_BY_AMOUNT"});

const setStartDate = (startDate=undefined) => {
    return {
        type:"SET_START_DATE",
        startDate
    }
}
const setEndDate = (endDate=undefined) => {
    return {
        type:"SET_END_DATE",
        endDate
    }
}

export {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate};