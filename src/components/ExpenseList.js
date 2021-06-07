import React from "react";
import {connect} from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

//IMPORTANTE cuando conecto componente al store de Redux, se vuelve reactivo, se actualiza ante el cambio de store
//no necesito usar store.subscribe o store.getState...

//exporto para el testeo
export const ExpenseList = (props) =>(
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-larger">Expense</div>
            <div className="show-for-larger">Amount</div>
        </div>
        <div className="list-body">
        {
            props.expenses.length === 0? (
                <div className="list-item list-item--message">
                    <span>No expenses to show</span>
                </div>
            ) : (
                props.expenses.map((expense)=>{
                    return <ExpenseListItem key={expense.id} {...expense} />
                })
            )
        }
        </div>
    </div>
);

//en mi ejemplo de HOC, yo creaba la funcion, aca la función es el return value de connect(...) (sería mi withAdminWarning)
//llamo a connect con que parte del estado quiero acceso, uso una callback
//en general no creo este ConnectComponent, lo exporto anonimamente, esto de abajo fue para ilustrar
/* 
const ConnectedExpenseList = connect((state)=>{
    return {
        //puedo poner cualquier key:value que yo quiero, gralmente del state, pero puedo pasar cualquier cosa (x ej, name:"Fabricio")
        expenses:state.expenses
    }; //esto va a estar disponible como props al componente conectado
})(ExpenseList);
export default ConnectedExpenseList; */

/* otro pattern mas resumido
export default connect(state=>{
    return {
        expenses:state.expenses
    };
})(ExpenseList);
*/
// el que ya conocia es crear mapStateToProps
const mapStateToProps = (state)=>{
    return {
        //expenses:state.expenses, esto pasa todas las expenses sin filtro, pero a mi me interesa filtrarlos
        expenses: selectExpenses(state.expenses, state.filter)
        //como habia seteado el filtro por palabra water, me va a salir un solo expense representado en expense list
    };
};
// y pasarle esto de argumento a connect

export default connect(mapStateToProps)(ExpenseList);

//esto se lo voy a pasar al dashboard