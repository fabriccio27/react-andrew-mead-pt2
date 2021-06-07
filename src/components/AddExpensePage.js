import React from "react";
import ExpenseForm from "./ExpenseForm";
import {connect} from "react-redux";
import {startAddExpense} from "../actions/expenses"

//lo exporto sin conectar para poder testearlo
export class AddExpensePage extends React.Component {
    onSubmit=(expense)=>{
        this.props.startAddExpense(expense);
        this.props.history.push("/");
    };
    render(){
        return(
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm onSubmit={this.onSubmit} /> 
                </div>
                
                {/* al no pasar funciones inline, no tiene que calcularlas en cada render */}
                {/* en ExpenseForm le estoy pasando un objeto a this.onSubmit */}
            </div>
        );
    };
}


const mapDispatchToProps = (dispatch) =>{
    return {
        //es practica ponerle a la propiedad el nombre de la accion
        startAddExpense:(expense)=> dispatch(startAddExpense(expense))
    };
};

export default connect(undefined, mapDispatchToProps)(AddExpensePage);