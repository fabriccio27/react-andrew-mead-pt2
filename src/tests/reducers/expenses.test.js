import expensesReducer from "../../reducers/expenses";
import testExpenses from "../fixtures/expenses";
import moment from "moment";

// ver que expenses se setee a array vacio
test("should set initial expenses to empty array", ()=>{
    const defState = [];
    const state = expensesReducer(undefined, {type:"@@INIT"});
    expect(state).toEqual(defState);
});

// para otros test de casos de switch, voy a necesitar un array de expenses, puedo usar el mismo que use en test suite de selectors
test("should remove expense by id", ()=>{
    const action = {type:"REMOVE_EXPENSE", id:testExpenses[1].id};
    const state = expensesReducer(testExpenses, action);
    expect(state).toEqual([testExpenses[0],testExpenses[2]]);
});

test("should not remove when id is not valid", ()=>{
    const action = {type:"REMOVE_EXPENSE", id:-1};
    const state = expensesReducer(testExpenses, action);
    expect(state).toEqual(testExpenses);
});

// should add an expense
test("should add an expense", ()=>{
    const dummy = {
        id:"321abc",
        description:"jabon",
        note:"",
        amount:12000,
        createdAt:moment(0)
    }
    const action = {type:"ADD_EXPENSE", expense:dummy};
    const state = expensesReducer(testExpenses, action);
    expect(state.length).toBe(4);
});
//should edit an expense
test("should edit an expense", ()=>{
    const updates = {
        note:"modificacion"
    };
    const action = {type:"EDIT_EXPENSE", id:testExpenses[2].id, updates};
    const state = expensesReducer(testExpenses, action);
    expect(state[2].note).toEqual(updates.note);
});
//should not edit if invalid expense
test("shouldn't edit an expense with invalid id", ()=>{
    const updates = {
        note:"modificacion"
    };
    const action = {type:"EDIT_EXPENSE", id:-2, updates};
    const state = expensesReducer(testExpenses, action);
    expect(state).toEqual(testExpenses);
});