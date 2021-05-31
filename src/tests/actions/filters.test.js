import {setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate} from "../../actions/filters";
import moment from "moment";


test("should generate a setStartDate action object with number argument", ()=> {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type:"SET_START_DATE",
        startDate:moment(0)
    });
});

test("should generate a setEndDate action object with number argument", ()=> {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type:"SET_END_DATE",
        endDate:moment(0)
    });
});
test("should generatea setTextFilter action object with no argument", ()=>{
    const action = setTextFilter(); //aca podria pasar directamente setTextFilter en vez de crear variable action
    expect(action).toEqual({
        type:"SET_TEXT_FILTER",
        text:""
    });
});
test("should generate setTextFilter action object with passed arg", ()=>{
    const action = setTextFilter("date");
    expect(action).toEqual({
        type:"SET_TEXT_FILTER",
        text:"date"
    });
});
test("should generate sortByAmount action object",()=>{
    const action = sortByAmount();
    expect(action).toEqual({type:"SORT_BY_AMOUNT"});
});
test("should generate sortByDate action object",()=>{
    const action = sortByDate();
    expect(action).toEqual({type:"SORT_BY_DATE"});
});