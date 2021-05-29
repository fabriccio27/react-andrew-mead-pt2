import React from "react";
import {connect} from "react-redux"; // como lo que quiero es modificar el store, necesito conectarme
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from "../actions/filters";
import {DateRangePicker} from "react-dates";

class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused:null
    };   
    onDatesChange =({startDate,endDate})=>{
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    onFocusChange=(calendarFocused)=>{
        this.setState(()=>({calendarFocused}));
    };
    render(){
        return(
            <div>
                <input type="text" value={this.props.filters.text} onChange={(event)=>{
                    props.dispatch(setTextFilter(event.target.value))
                }} />
                {/* cada vez que modifique el input, por el onChange, voy a resetear filter.text en el store
                como en ExpenseList estoy usando selectExpenses, me va cambiando que es lo que renderiza */}
                <select value={this.props.filters.sortBy} onChange={(event)=>{
                    //por como defini el reducer de filter, el default en filters.sortBy es date
                    if (event.target.value === "date") this.props.dispatch(sortByDate());
                    else if (event.target.value === "amount") this.props.dispatch(sortByAmount());
                }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={()=>false}
                    showClearDates={true} //esto es para borrar las fechas
                    
                />
            </div>
        );
   };
}

// esto tiene que despachar una accion para setear el filter.text. 
// cuando conecto un componente, adquiero .dispatch en sus props
const mapStateToProps = (state) => {
    //aca va qué parte quiero del state
    return {
        filters:state.filter
    };
};
/* const mapDispatchToProps = ()=> {

}
 */
export default connect(mapStateToProps)(ExpenseListFilters);