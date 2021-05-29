import React from "react";
import ExpenseForm from "./ExpenseForm";
import {connect} from "react-redux";
import {addExpense} from "../actions/expenses"


const AddExpensePage = (props) => (
    <div>
        
        <h2>Add Expense</h2>
        <ExpenseForm onSubmit={(expense)=>{
            props.dispatch(addExpense(expense));
            props.history.push("/");
        }} />
        {/* en ExpenseForm le estoy pasando un objeto a this.props.onSubmit, asi que printea objeto en consola */}
    </div>
);



export default connect()(AddExpensePage);