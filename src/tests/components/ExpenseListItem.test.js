import React from "react";
import {shallow} from "enzyme";
import ExpenseListItem from "../../components/ExpenseListItem";
import testExpenses from "../fixtures/expenses";

test("should render expense item with data", ()=>{
    const exp = testExpenses[1];
    const wrapper = shallow(<ExpenseListItem key={exp.id} {...exp} />);
    expect(wrapper).toMatchSnapshot();
});
