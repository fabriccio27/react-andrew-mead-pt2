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

    const removeExpense = jest.fn();
    const wrapper = shallow(<EditExpensePage removeExpense={removeExpense} expense={testExpenses[0]} history={history} />);
    // tengo que encontrar el boton para borrar
    wrapper.find("button").simulate("click");
    expect(removeExpense).toHaveBeenLastCalledWith({id:testExpenses[0].id});
    expect(history.push).toHaveBeenLastCalledWith("/");
});

test("should edit expense correctly", ()=>{
    
    const editExpense = jest.fn();
    const wrapper = shallow(<EditExpensePage editExpense={editExpense} expense={testExpenses[0]} history={history} />);
    // tengo que encontrar el boton para borrar
    wrapper.find("ExpenseForm").prop("onSubmit")(testExpenses[0]);
    expect(editExpense).toHaveBeenLastCalledWith(testExpenses[0].id,testExpenses[0]);
    expect(history.push).toHaveBeenLastCalledWith("/");
});