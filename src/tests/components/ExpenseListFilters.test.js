import React from "react";
import {shallow} from "enzyme";
import {ExpenseListFilters} from "../../components/ExpenseListFilters";
import {filters, altFilters} from "../fixtures/filters";
import moment from "moment";

//para hacer prueba de snapshot necesito info, por eso genero nuevo elemento en fixtures, que guarda seteos de filtro

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(()=>{
    setTextFilter=jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    sortByAmount = jest.fn();
    sortByDate = jest.fn();

    wrapper = shallow(
        <ExpenseListFilters
            setTextFilter={setTextFilter}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            sortByAmount={sortByAmount}
            sortByDate={sortByDate}
            filters={filters}
        />
    );
});

test("should render default filter correctly", ()=>{
    expect(wrapper).toMatchSnapshot();
    //si voy a ver a ver el snapshot veo que seteo a undefined las fechas y el text a ""
});

test("should render expenses filter with alt data correctly", ()=>{
    // quiero cambiar props para filter para que sea altFilters ( cuando defini wrapper lo hice con otro valoe)
    //enzyme ademas de permite ver los props, puedo setearlos. Es util para ver evol de componente con la info
    wrapper.setProps({
        filters:altFilters
    });
    expect(wrapper).toMatchSnapshot();
});


test("should change the text filter", ()=>{
    wrapper.find("input").at(0).simulate("change", {
        target:{value:"mondongo"}
    });
    expect(setTextFilter).toHaveBeenLastCalledWith("mondongo");
});

test("should change the sort criteria to amount", ()=>{
    const criteria = "amount";
    wrapper.find("select").simulate("change", {
        target:{value:criteria}
    });
    expect(sortByAmount).toHaveBeenCalled();
});

test("should change the sort criteria to date", ()=>{
    wrapper.setProps({
        filters:altFilters
    });
    //hago esto de arriba para arrancar de un valor de sortBy de "amount"
    const criteria = "date";
    wrapper.find("select").simulate("change", {
        target:{value:criteria}
    });
    expect(sortByDate).toHaveBeenCalled();
});

test("should change the start date and end date", ()=>{
    const startDate=moment(0);
    const endDate=moment(0).add(3,"days");
    wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange")({startDate,endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test("should change the focus state", ()=>{
    const calendarFocused = "endDate";
    wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")(calendarFocused);
    //expect(onFocusChange).toHaveBeenLastCalledWith(calendarFocused);
    expect(wrapper.state().calendarFocused).toBe(calendarFocused);
});

