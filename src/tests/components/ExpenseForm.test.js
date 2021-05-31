import React from "react";
import {shallow} from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import moment from "moment";

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

test("should render when input data is bad", ()=>{
    const wrapper = shallow(<ExpenseForm />);
    //simulate sirve para simular eventos, click, submit, change. 
    //me interesa comparar el snapshot antes y despues de generar el error
    expect(wrapper).toMatchSnapshot();
    //El tema es que estaria simulando sin pasarle 'event' o 'e' como argumento
    wrapper.find("form").simulate("submit", {
        preventDefault:()=>{}
    });
    //quiero checkear si en el state se seteo el error de haber mandado form vacio
    expect(wrapper.state().error.length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});
//en el 2do snapshot veo que se genere el texto en el render que indica un error

test("should set description on input change", ()=>{
    const value = "new sen-sa-tion";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(0).simulate("change", {
        target:{value}
    });
    expect(wrapper.state().description).toBe(value);
});

test("should set optional note on input change", ()=>{
    const note = "I'm inevitable (actually not).";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("textarea").simulate("change", {
        target:{value:note}
    });
    expect(wrapper.state().note).toBe(note);
    expect(wrapper).toMatchSnapshot();
});

test("should set amount when input is valid", ()=>{
    const amount="3.14"; //uso una regex para validar un string como numero
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find("input").at(1).simulate("change", {
        target:{value:amount}
    });
    expect(wrapper.state().amount).toBe(amount);
});

test("should set error when attempting to submit invalid amount", ()=>{
    const amount="3.147";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate("change", {
        target:{value:amount}
    });
    //expect(wrapper.state().error.length).toBeGreaterThan(0); mal planteado
    expect(wrapper.state().amount).toBe("");
});

//como hago para ver si enviara bien el form, sin correr el server?
/* uso mock functions, tambien llamados spies. Recordemos que a ExpenseForm en EditExpense le tenia que pasar un handler 
para el submit */
/* Mock functions are also known as "spies", because they let you spy on the behavior of a function that is called 
indirectly by some other code, rather than only testing the output. */
test("should submit correctly when data is valid",()=>{
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={testExpenses[1]} onSubmit={onSubmitSpy}/>);
    wrapper.find("form").simulate("submit", {
        preventDefault:()=>{}
    });
    expect(wrapper.state().error).toBe("");
    //aca no puedo pasar directamente testExpenses[0] o testExpenses[1] porque esos ya tienen id, y en expense form, 
    //no lo uso para el submit
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description:testExpenses[1].description,
        amount:testExpenses[1].amount,
        note:testExpenses[1].note,
        createdAt:testExpenses[1].createdAt
    });
});

test("should set a new date on date change", ()=>{
    const wrapper = shallow(<ExpenseForm/>);
    const now = moment();
    //en este caso quiero llamar a alguna prop de <SingleDatePicker /> (onDateChange). Voy a usar enzyme
    wrapper.find('withStyles(SingleDatePicker)').prop("onDateChange")(now);
    expect(wrapper.state().createdAt).toBe(now);
});

test("should set calendarFocused on focus", ()=>{
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop("onFocusChange")({focused:true});
    expect(wrapper.state().calendarFocused).toEqual(true);
});