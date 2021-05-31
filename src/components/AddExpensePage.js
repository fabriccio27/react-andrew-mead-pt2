import React from "react";
import ExpenseForm from "./ExpenseForm";
import {connect} from "react-redux";
import {addExpense} from "../actions/expenses"

//lo exporto sin conectar para poder testearlo
export class AddExpensePage extends React.Component {
    onSubmit=(expense)=>{
        this.props.onSubmit(expense);
        this.props.history.push("/");
    };
    render(){
        return(
            <div>
                <h2>Add Expense</h2>
                <ExpenseForm onSubmit={this.onSubmit} /> 
                {/* al no pasar funciones inline, no tiene que calcularlas en cada render */}
                {/* en ExpenseForm le estoy pasando un objeto a this.onSubmit */}
            </div>
        );
    };
}


const mapDispatchToProps = (dispatch) =>{
    return {
        onSubmit:(expense)=> dispatch(addExpense(expense))
    };
};

export default connect(undefined, mapDispatchToProps)(AddExpensePage);