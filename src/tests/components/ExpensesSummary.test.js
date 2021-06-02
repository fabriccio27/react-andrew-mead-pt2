import {shallow} from "enzyme";
import React from "react";
import {ExpensesSummary} from "../../components/ExpensesSummary";

test("should render correctly ExpensesSummary with no expenses", ()=>{
    const wrapper =  shallow(<ExpensesSummary/>);
    expect(wrapper).toMatchSnapshot();
});
test("should render correctly ExpensesSummary when passing expenses", ()=>{
    const wrapper = shallow(<ExpensesSummary expensesCount={3} expensesTotal={18999}/>);
    expect(wrapper).toMatchSnapshot();
});