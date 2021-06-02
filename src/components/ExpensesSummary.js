//tengo que obtener los expenses que cumplen con los filters
//tengo que obtener esas expenses del state como props en mi componente
//entonces voy a necesitar conexion
import React from "react";
import selectExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";
import {connect} from "react-redux";
import numeral from "numeral";

const ExpensesSummary = (props) => {
    return(
        <div>
            {props.expensesCount>0? (
                <p>Total amount: {numeral(props.expensesTotal/100).format("$0,0.00")} for {props.expensesCount} expense(s)</p>
            ): (
                <p>No expenses selected</p>
            )}
        </div>
    )
};

const mapStateToProps = (state)=>{
    const selected =  selectExpenses(state.expenses, state.filter);
    return {
        expensesTotal:getExpensesTotal(selected),
        expensesCount:selected.length
    };
}
export {ExpensesSummary};
export default connect(mapStateToProps)(ExpensesSummary);
    
