import React from "react";
import {shallow} from "enzyme";
import {EditExpensePage} from "../../components/EditExpensePage";
import testExpenses from "../fixtures/expenses";

let history; //shallow si siempre pasara todos los props tambien podria extraerlo aca

beforeEach(()=>{
    history = {push:jest.fn()};
});

test("should render page correctly", ()=>{
    const wrapper = shallow(<EditExpensePage expense={testExpenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});

test("should erase expense correctly", ()=>{

    const startRemoveExpense = jest.fn();
    const wrapper = shallow(<EditExpensePage startRemoveExpense={startRemoveExpense} expense={testExpenses[0]} history={history} />);
    // tengo que encontrar el boton para borrar
    wrapper.find("button").simulate("click");
    expect(startRemoveExpense).toHaveBeenLastCalledWith(testExpenses[0].id);
    expect(history.push).toHaveBeenLastCalledWith("/");
});

test("should edit expense correctly", ()=>{
    
    const startEditExpense = jest.fn();
    const wrapper = shallow(<EditExpensePage startEditExpense={startEditExpense} expense={testExpenses[0]} history={history} />);
    // tengo que encontrar el boton para borrar
    wrapper.find("ExpenseForm").prop("onSubmit")(testExpenses[0]);
    expect(startEditExpense).toHaveBeenLastCalledWith(testExpenses[0].id,testExpenses[0]);
    expect(history.push).toHaveBeenLastCalledWith("/");
});