import React from "react";
import ExpenseForm from "./ExpenseForm";
import {connect} from "react-redux"; //quiero modificar el state a traves de esta pagina, asi que necesito conectar
import {editExpense, removeExpense} from "../actions/expenses";
//lo que quiero es despachar la accion que me permita borrar segun id, una expensa
// - tengo que conectar componente al store, pero si no requiero nada del state (porque ya obtuve de props en este caso), dejo () vacios


const EditExpensePage = (props) => {
    return(
        <div>
            This is the edit expense page for {props.match.params.id}
            <ExpenseForm
                expense={props.expense} /* esto pasa a expense form y tiene que poblar el state, en lo posible */
                onSubmit={(expense)=>{
                    // aca tengo que despachar el editExpense, fijarse con que argumentos llamar
                    props.dispatch(editExpense(props.expense.id, expense));
                    props.history.push("/");
                }}
            />
            <button onClick={()=>{
                props.dispatch(removeExpense({id:props.expense.id}));
                props.history.push("/");
            }}>Remove</button>
        </div>
    )
}
//literamente es sacar de state y pasar como props, a quien? al componente a conectar
const mapStateToProps=(state, props)=>{
    // quiero de state.expenses, la expense que tenga el mismo id que el id que saco de props
    //el metodo .find() para arrays es como un filter, pero devuelve un solo match, el 1ro
    return {
        expense: state.expenses.find((expense)=>{
            return expense.id === props.match.params.id;
        })
    }
}
export default connect(mapStateToProps)(EditExpensePage);

// en history tengo lo que necesita react-router para hacer client-side routing, metodos para redirigir y demas solo con js
// componentes que no fueron seteados para un Route no tienen props --> Header no recibe props. 
// en location tengo info de query strings si las hubiera, y de hash
// en match tengo info de parametros URL, por ejemplo localhost/edit/45, 45 es un para URL, el cual puede ser un id p/una db
    //para poder agregar esos params URL tengo que configurar el path de edit en el componente Route a path="/edit/:id"
    //esta disponible en match.params como para {"id":4556}, por ejemplo