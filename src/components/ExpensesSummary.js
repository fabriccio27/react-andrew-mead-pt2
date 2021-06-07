//tengo que obtener los expenses que cumplen con los filters
//tengo que obtener esas expenses del state como props en mi componente
//entonces voy a necesitar conexion
import React from "react";
import selectExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";
import {connect} from "react-redux";
import numeral from "numeral";
import {Link} from "react-router-dom";

const ExpensesSummary = (props) => {
    const expenseMessage = props.expensesCount>0? (
        <h2 className="page-header__title">Total of <span>{numeral(props.expensesTotal/100).format("$0,0.00")}</span> for <span>{props.expensesCount}</span> expense(s)</h2>
    ): (
        <h3 className="page-header__title">No expenses selected</h3>
    );
    return(
        <div className="page-header">
            <div className="content-container">
                {expenseMessage}
                <div className="page-header__action">
                    <Link className="btn" to="/create">Add Expense</Link>
                </div>
            </div>
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
    
