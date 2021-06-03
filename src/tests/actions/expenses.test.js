import {addExpense, editExpense, removeExpense, startAddExpense} from "../../actions/expenses";
import testExpenses from "../fixtures/expenses";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const createMockStore = configureMockStore([thunk]);

// para hacer imports con esta notacion tengo que hacer un archivo de babel
test("should remove expense action object", ()=>{
    const action = removeExpense({id:"123abc"});
    //toBe usa === para comparar, y comparar 2 objetos siempre da false
    expect(action).toEqual({
        type:"REMOVE_EXPENSE",
        id:"123abc"
    })
});

test("should return an edit expense action object", ()=>{
    const action = editExpense("123abc",{prop1:"necio", prop2:"pelos" });
    expect(action).toEqual({
        type:"EDIT_EXPENSE",
        id:"123abc",
        updates:{
            prop1:"necio",
            prop2:"pelos"
        }
    });
});

test("should setupadd expense action object when passing values", ()=>{
    
    const action = addExpense(testExpenses[2]);
    //si comparo con lo que espero, tengo un id que es generado para ser unico, eso me va a complicar en la prueba. Hay workaround
    expect(action).toEqual({
        type:"ADD_EXPENSE",
        expense:testExpenses[2]
    });
});

test("should add expense to database and store", ()=>{
    const store = createMockStore({});
    const expenseData = {
        description:"Mouse",
        note:"",
        amount:3000,
        createAdd:1000
    };
    store.dispatch(startAddExpense(expenseData));
});

/* test("should return an add expense action object when passing no arguments", ()=>{
    
    const action = addExpense();
    //si comparo con lo que espero, tengo un id que es generado para ser unico, eso me va a complicar en la prueba. Hay workaround
    expect(action).toEqual({
        type:"ADD_EXPENSE",
        expense:{
            id:expect.any(String),
            description:"",
            note:"",
            amount:0,
            createdAt:0
        }
    });
}); */