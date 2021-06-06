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

//si quiero hacer private space para users, tengo que cambiar las refs en las acciones relacionadas con la db

const addExpense = (expense) => {
    return {
        type:"ADD_EXPENSE",
        expense
    };
};
//si no agrego redux-thunk, no puedo procesar acciones que devuelven funciones en lugar de objetos
//redux-thunk lo agrego como middleware en el store
const startAddExpense  = (expenseData = {}) => {
    //en redux-thunk el 1er arg de la funcion es dispatch y el segundo es getState
    return (dispatch, getState)=>{
        const uid = getState().auth.uid;
        const {
            description="",
            note="",
            amount=0,
            createdAt=0
        } = expenseData; //esto es destructuracion del objeto, description, note etc se vuelven disponibles como variables

        const expense = {description,note,amount,createdAt}; //uso shorthand de js, key y value tienen mismo nombre
        //esto lo devuelvo para poder hacer chain de promises en test cases
        return database.ref(`users/${uid}/expenses`).push(expense).then((refObj)=>{
            dispatch(addExpense({
                id:refObj.key,
                ...expense
            }));
        });
    };
}
//EDIT EXPENSE SECTION -----------------------------------------------
const editExpense = (id, updates) => {
    return {
        type:"EDIT_EXPENSE",
        id,
        updates
    };
};
const startEditExpense =  (id, updates) =>{
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update({...updates})
        .then(()=>{
            dispatch(editExpense(id,updates));
        })
        .catch((error)=>console.log(error));
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
    return (dispatch, getState)=>{
        const uid = getState().auth.uid;
        /* tengo que usar database para borrar el elemento con id coincidente */
        return database.ref(`users/${uid}/expenses/${id}`).remove()
        .then(()=>{
            dispatch(removeExpense({id}));
        })
        .catch(err=>{
            console.log(err);
            dispatch(removeExpense());
        });
    };
};
//SET_EXPENSES --------------------------------------------------------------
const setExpenses=(expenses)=>{
    return {
        type:"SET_EXPENSES",
        expenses
    }
};

const startSetExpenses = () => {
    return (dispatch, getState)=>{
        //si de aca no regreso nada, en app.js store.dispatch(startSetExpenses()) tiene undefined como return value de startSetExpenses
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`).once("value")
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
export {addExpense, editExpense, removeExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense};