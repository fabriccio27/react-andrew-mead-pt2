import {addExpense, 
    editExpense, 
    removeExpense, 
    startAddExpense, 
    setExpenses, 
    startSetExpenses, 
    startRemoveExpense} from "../../actions/expenses";
import testExpenses from "../fixtures/expenses";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
import expensesReducer from "../../reducers/expenses";

const createMockStore = configureMockStore([thunk]);
//esto lo hago para poder despachar acciones, o sea, creo un store tal que me permite usar dispatch, y ver las acciones que ha recibido ese mock store
//al tener las acciones recibidas por el mock store, puedo correr asserts para ver si la accion esta generando el efecto deseado

beforeEach((done)=>{
    //esto es para que haya algo en la db de firebase y poder ver si los fetch andan.
    const expensesData = {};
    testExpenses.forEach(({id, description, createdAt, amount, note})=>{
        expensesData[id]={description, createdAt, amount, note};
    })
    database.ref("expenses").set(expensesData).then(()=>done());
});


// para hacer imports con esta notacion tengo que hacer un archivo de babel
test("should remove expense action object", ()=>{
    const action = removeExpense({id:"123abc"});
    //toBe usa === para comparar, y comparar 2 objetos siempre da false
    expect(action).toEqual({
        type:"REMOVE_EXPENSE",
        id:"123abc"
    });
});

test("should remove expense from database when passing id", (done)=>{
    const id = testExpenses[1].id;
    const store = createMockStore({});
    store.dispatch(startRemoveExpense(id))
    .then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:"REMOVE_EXPENSE",
            id
        });
        //esto lo hago para que la promise la pueda enganchar en el proximo then y no despues de once("value")
        return database.ref(`expenses/${id}`).once("value"); //esto me va devolver null o undefined, por eso uso toBeFalsy
    })
    .then((snapshot)=>{
        expect(snapshot.val()).toBeFalsy();
        done();
    });
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
test("should setup add expense action object when passing values", ()=>{
    
    const action = addExpense(testExpenses[2]);
    //si comparo con lo que espero, tengo un id que es generado para ser unico, eso me va a complicar en la prueba. Hay workaround
    expect(action).toEqual({
        type:"ADD_EXPENSE",
        expense:testExpenses[2]
    });
});

test("should add expense to database and store", (done)=>{
    
    /* por que paso done? hasta aca todos los test fueron sync, pero aca estoy usando una llamada a firebase async
    Si no paso done, el test va a correr y no va a esperar a que la promise se resuelva, si la promesa fracaso, el test no se enteró 
    y da como valido el test case. Con done(), indico al test hasta que parte del codigo tiene que esperar para concluir*/
    const store = createMockStore({});
    const expenseData = {
        description:"Mouse",
        note:"",
        amount:3000,
        createdAt:1000
    };
    store.dispatch(startAddExpense(expenseData)).then(()=>{
        
        const actions = store.getActions();
        //en este test solo despacho una accion, por eso accedo a la primera
        expect(actions[0]).toEqual({
            type:"ADD_EXPENSE",
            expense:{
                id:expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once("value");
        //cualquier cosa que ponga aca corre despues de la llamada async a firebase, por el then
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test("should add expense when expense is empty", (done)=>{
    
    /* por que paso done? hasta aca todos los test fueron sync, pero aca estoy usando una llamada a firebase async
    Si no paso done, el test va a correr y no va a esperar a que la promise se resuelva, si la promesa fracaso, el test no se enteró 
    y da como valido el test case. Con done(), indico al test hasta que parte del codigo tiene que esperar para concluir*/
    const store = createMockStore({});
    const expenseDefaults = {
        description:"",
        note:"",
        amount:0,
        createdAt:0
    };
    store.dispatch(startAddExpense(expenseDefaults)).then(()=>{
        
        const actions = store.getActions();
        //en este test solo despacho una accion, por eso accedo a la primera
        expect(actions[0]).toEqual({
            type:"ADD_EXPENSE",
            expense:{
                id:expect.any(String),
                ...expenseDefaults
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once("value");
        //cualquier cosa que ponga aca corre despues de la llamada async a firebase, por el then
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});



test("should setup set expenses action object with data", ()=>{
    const action = setExpenses(testExpenses);
    expect(action).toEqual({
        type:"SET_EXPENSES",
        expenses:testExpenses
    });
});

test("should setup expenses", ()=>{
    const action = {
        type:"SET_EXPENSES",
        expenses:[testExpenses[0]]
    }
    const state = expensesReducer(testExpenses, action)
    expect(state).toEqual([testExpenses[0]]);
});

test("should fetch expenses from the firebase database", (done)=>{
    const store = createMockStore({});

    store.dispatch(startSetExpenses()).then(()=>{

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:"SET_EXPENSES",
            expenses:testExpenses
        });
        done();
    });
});
