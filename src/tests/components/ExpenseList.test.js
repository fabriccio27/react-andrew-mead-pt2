import React from "react";
import {shallow} from "enzyme";
import {ExpenseList} from "../../components/ExpenseList";
import testExpenses from "../fixtures/expenses";

test("should render ExpenseList with testExpenses", ()=>{
    const wrapper = shallow(<ExpenseList expenses={testExpenses}/>);
    expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseList when no expenses", ()=>{
    const wrapper = shallow(<ExpenseList expenses={[]}/>);
    expect(wrapper).toMatchSnapshot();
})