import React from "react";
import moment from "moment";
import {SingleDatePicker} from "react-dates";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';



/* const now = moment();
console.log(now.format("Do MMM YYYY"));  //estos codigos se ven en la doc --> 28th May 2021 */
class ExpenseForm extends React.Component {
    //aca voy a usar la sintaxis vieja para poder acceder a los props y poblar el state
    constructor(props){
        super(props);
        this.state = {
            description: props.expense? props.expense.description:"",
            note: props.expense? props.expense.note:"",
            amount: props.expense?(props.expense.amount/100).toString():"",
            createdAt: props.expense?moment(props.expense.createdAt): moment(),
            calendarFocused:false,
            error:""
        };
    }
    onDescriptionChange=(event)=>{
        const description = event.target.value;
        this.setState(()=>({description}))
    };
    onNoteChange = (event) => {
        const note = event.target.value;
        this.setState(()=>({note}));
    };
    onAmountChange = (event) => {
        const amount = event.target.value;
        // para esto tengo que verificar entrada
        //hago un test de regular expression 
        const testRE = /^\d{1,}(\.\d{0,2})?$/
        if (!amount || amount.match(testRE)){
            this.setState(() => ({amount}));
        }
    };
    onDateChange = (createdAt) => {
        //la referencia dice que el argumento del handler es date, si le puse createdAt en mi state, me ahorro caracteres
        if (createdAt){
            this.setState(()=>({createdAt}));
        }
    };
    onFocusChange = ({focused}) =>{
        this.setState(()=>{
            return {calendarFocused:focused}
        })
    };
    onSubmit = (event) =>{
        event.preventDefault();
        if(!this.state.description || !this.state.amount){
            this.setState(()=>({error:"Please fill correctly both description and amount fields."}));
        }else{
            this.setState(()=>({error:""}));
            //aca no pongo el dispatch de addExpense, porque la idea es que este ExpenseForm sea reutilizable para edit
            //lo que pongo aca es una funcion que le paso a ExpenseForm como prop. En AddExpensePage esta definida.
            this.props.onSubmit({
                description:this.state.description,
                amount:parseFloat(this.state.amount,10)*100,
                note:this.state.note, 
                createdAt: this.state.createdAt.valueOf() //esto me pasa de string de fecha a timestamp, metodo de moment
            });
        }
    };
    render(){
        return(
            <div>
                ExpenseForm
                {this.state.error && <h3>{this.state.error}</h3>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text" 
                        autoFocus 
                        placeholder="Description" 
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input type="text" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange}/> {/* si para amount dejo type number, no puedo controlar los decimales, por eso cambio a text */}
                    <textarea placeholder="Add a note to your expense (optional)" onChange={this.onNoteChange}></textarea>
                    <SingleDatePicker
                        date={this.state.createdAt} // esta es la fecha que se va a mostrar inicialmente. En state sale de moment()
                        onDateChange={this.onDateChange} // handler para cuando user cambia fecha
                        focused={this.state.calendarFocused} // P
                        onFocusChange={this.onFocusChange} // handler para cuando react-dates necesita cambiar el valor de focused
                        numberOfMonths={1} // me muestra de a un mes en el picker
                        isOutsideRange={()=>false}
                    />
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}

export default ExpenseForm;