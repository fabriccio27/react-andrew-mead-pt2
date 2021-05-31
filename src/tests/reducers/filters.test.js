import filtersReducer from "../../reducers/filters";
import moment from "moment";
// aca voy a testear que las modificaciones al state, en particular a su pedazo "filter" se hagan de manera correcta

//test de init
test("should setup default values", ()=>{
    const state = filtersReducer(undefined, {type:"@@INIT"});
    expect(state).toEqual({
        text:"",
        sortBy:"date",
        startDate:moment().startOf("month"),
        endDate:moment().endOf("month")
    });
});
//tengo que testear cada caso del switch
test("should set sortBy to amount", ()=>{
    const state = filtersReducer(undefined, {type:"SORT_BY_AMOUNT"});
    expect(state).toEqual({
        text:"",
        sortBy:"amount",
        startDate:moment().startOf("month"),
        endDate:moment().endOf("month")
    });
});

test("should set sortBy by date", ()=>{
    const currentState = {
        text:"",
        startDate:undefined,
        endDate:undefined,
        sortBy:"amount"
    };
    const action ={type:"SORT_BY_DATE"};
    const state = filtersReducer(currentState, action);
    //directamente veo la parte del state que quiero saber si cambio
    expect(state.sortBy).toBe("date");
});
// podria haber pasado undefined de state en filtersReducer
// se recomienda pasar la modificacion a la action en una variable previamente construida
// aplicado en ultimo test case
test("should set text filter", ()=>{
    const currentState = {
        text:"",
        startDate:undefined,
        endDate:undefined,
        sortBy:"date"
    };
    const action = {type:"SET_TEXT_FILTER", text:"gas"};
    const state = filtersReducer(currentState, action);
    expect(state.text).toBe("gas");
});
test("should set start date", ()=>{
    const currentState = {
        text:"",
        sortBy:"date",
        startDate:undefined,
        endDate:undefined
    };
    const action = {type:"SET_START_DATE", startDate:moment(0)};
    const state = filtersReducer(currentState,action);
    expect(state.startDate).toEqual(moment(0));
});
test("should set end date", ()=>{
    
    const endDate = moment(0).add(2,"days")
    const action = {type:"SET_END_DATE", endDate};
    const state = filtersReducer(undefined,action);
    expect(state.endDate).toEqual(endDate);
});