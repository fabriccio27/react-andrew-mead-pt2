//primero tengo que hacer unas cosas para poder hacer la pagina mas testeable
// usar mapDispatchToProps y hacer el componente con una clase (para evitar usar inline functions que se ejecutan dentro de render)
//el problema es que estaba usando una funcion directamente importada, no que la tenia a traves de props

import React from "react";
import {shallow} from "enzyme";
import {AddExpensePage} from "../../components/AddExpensePage";
import testExpenses from "../fixtures/expenses";

/* para no repetir lineas de un test a otro, uso lifecycle method beforeEach, ver otros en docs */
let startAddExpense, history, wrapper;
beforeEach(()=>{
    startAddExpense = jest.fn();
    history = {push:jest.fn()};
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});
test("should render add expense page correctly", ()=>{
    expect(wrapper).toMatchSnapshot();
});

test("should use onSubmit correctly", ()=>{

    //lo que quiero aca es ejecutar el onSubmit que le paso a ExpenseForm, lo agarro con find y prop
    //tambien necesito un expense, lo importo
    wrapper.find("ExpenseForm").prop("onSubmit")(testExpenses[0]);
    expect(startAddExpense).toHaveBeenLastCalledWith(testExpenses[0]);
    expect(history.push).toHaveBeenLastCalledWith("/");
});
