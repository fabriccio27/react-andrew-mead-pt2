import React from "react";
import ExpenseForm from "./ExpenseForm";
import {connect} from "react-redux"; //quiero modificar el state a traves de esta pagina, asi que necesito conectar
import {editExpense, startRemoveExpense} from "../actions/expenses";
//lo que quiero es despachar la accion que me permita borrar segun id, una expensa
// - tengo que conectar componente al store, pero si no requiero nada del state (porque ya obtuve de props en este caso), dejo () vacios


export class EditExpensePage extends React.Component {
    onSubmit = (expense) =>{
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push("/");
    };
    onClick = () =>{
        this.props.startRemoveExpense(this.props.expense.id); //el objeto seria data, segun lo que puse en mapDispatchToProps
        this.props.history.push("/");
    };
    render(){
        return(
            <div>
                {/* This is the edit expense page for {this.props.match.params.id} */}
                <ExpenseForm
                    expense={this.props.expense} /* esto pasa a expense form y tiene que poblar el state, en lo posible */
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onClick}>Remove</button>
            </div>
        );
    };
}

//literamente es sacar de state y pasar como props, a quien? al componente a conectar
const mapStateToProps = (state, props) =>{
    // quiero de state.expenses, la expense que tenga el mismo id que el id que saco de props
    //el metodo .find() para arrays es como un filter, pero devuelve un solo match, el 1ro
    return {
        expense: state.expenses.find((expense)=>{
            return expense.id === props.match.params.id;
        })
    };
};

const mapDispatchToProps = (dispatch) =>{
    /* a las props que accedo en las funciones, le mapoe una funcion que incluye dispatch 
    y una accion, pasar los parametros bien */
    return {
        editExpense:(id,expense) => dispatch(editExpense(id,expense)),
        startRemoveExpense:(data) => dispatch(startRemoveExpense(data))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

// en history tengo lo que necesita react-router para hacer client-side routing, metodos para redirigir y demas solo con js
// componentes que no fueron seteados para un Route no tienen props --> Header no recibe props. 
// en location tengo info de query strings si las hubiera, y de hash
// en match tengo info de parametros URL, por ejemplo localhost/edit/45, 45 es un para URL, el cual puede ser un id p/una db
    //para poder agregar esos params URL tengo que configurar el path de edit en el componente Route a path="/edit/:id"
    //esta disponible en match.params como para {"id":4556}, por ejemplo