import {addExpense, editExpense, removeExpense} from "../../actions/expenses";

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

test("should return an add expense action object when passing values", ()=>{
    const expenseData = {
        description:"rent",
        amount:5100,
        createdAt:1000,
        note:"this was last month rent"
    };
    const action = addExpense(expenseData);
    //si comparo con lo que espero, tengo un id que es generado para ser unico, eso me va a complicar en la prueba. Hay workaround
    expect(action).toEqual({
        type:"ADD_EXPENSE",
        expense:{
            ...expenseData,
            id:expect.any(String)
        }
    });
});
test("should return an add expense action object when passing no arguments", ()=>{
    
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
});