import {v4 as uuid} from "uuid";
import database from "../firebase/firebase";
/* 
component calls action generator
action generator returns object
component dispatch object
redux store changes
*/
/* 
component calls action generator
action generator returns function
component dispatch function(needs middleware and to modify store) 
function runs 
*/

const addExpense = (expense) => {
    return {
        type:"ADD_EXPENSE",
        expense
    };
};
//si no agrego redux-thunk, no puedo procesar acciones que devuelven funciones en lugar de objetos
const startAddExpense  = (expenseData = {}) => {
    return (dispatch)=>{
        const {
            description="",
            note="",
            amount=0,
            createdAt=0
        } = expenseData; //esto es destructuracion del objeto, description, note etc se vuelven disponibles como variables

        const expense = {description,note,amount,createdAt}; //uso shorthand de js, key y value tienen mismo nombre
        //esto lo devuelvo para poder hacer chain de promises en test cases
        return database.ref("expenses").push(expense).then((refObj)=>{
            dispatch(addExpense({
                id:refObj.key,
                ...expense
            }));
        });
    };
}

const editExpense = (id, updates) => {
    return {
        type:"EDIT_EXPENSE",
        id,
        updates
    };
};
//REMOVE EXPENSE SECTION ---------------------------------------------
const removeExpense = ({id}={}) => {
    return {
        type:"REMOVE_EXPENSE",
        id
    };
};
const startRemoveExpense = (id) => {
    return (dispatch)=>{
        /* tengo que usar database para borrar el elemento con id coincidente */
        return database.ref(`expenses/${id}`).remove()
        .then(()=>{
            dispatch(removeExpense({id}));
        })
        .catch(err=>{
            console.log(err);
            dispatch(removeExpense());
        });
    };
};
//SET_EXPENSES
const setExpenses=(expenses)=>{
    return {
        type:"SET_EXPENSES",
        expenses
    }
};

const startSetExpenses = () => {
    return (dispatch)=>{
        //si de aca no regreso nada, en app.js store.dispatch(startSetExpenses()) tiene undefined como return value de startSetExpenses
        return database.ref("expenses").once("value")
        .then((snapshot)=>{
            const retrieved = []
            snapshot.forEach(childSnap=>{
                retrieved.push({
                    id:childSnap.key,
                    ...childSnap.val()
                });
            });
            //console.log(retrieved); //recupera bien
            dispatch(setExpenses(retrieved));
        });
    };
    
    //fetch all expense data once
    //parse expense data as array
    //dispatch setExpenses with parsed array
}
export {addExpense, editExpense, removeExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense};