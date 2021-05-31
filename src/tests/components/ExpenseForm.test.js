import React from "react";
import {shallow} from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
//si testeo este componente me va a dar falla siempre porque en un lugar tengo moment(), y entre un test y otro, el tiempo cambia
//por eso simulo una libreria
/* https://jestjs.io/docs/mock-functions */
//normalmente cuando llamo a moment me devuelve una funcion, pero yo espero un valor fijo para poder comparar entre 2 llamadas

test("should render expense form correctly with no data", ()=>{
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

import testExpenses from "../fixtures/expenses";
//el state de Expense form es vacio o lo que le pase de props,
test("should render expense form with data", ()=>{
    const wrapper = shallow(<ExpenseForm expense={testExpenses[2]} />);
    expect(wrapper).toMatchSnapshot();

})