import React from "react";
import {connect} from "react-redux"; // como lo que quiero es modificar el store, necesito conectarme
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from "../actions/filters";
import {DateRangePicker} from "react-dates";

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused:null
    };   
    onTextChange = (event) => {
        this.props.setTextFilter(event.target.value);
    };
    onSortChange = (event) => {
        //por como defini el reducer de filter, el default en filters.sortBy es date
        if (event.target.value === "date") this.props.sortByDate();
        else if (event.target.value === "amount") this.props.sortByAmount();
    };
    onDatesChange =({startDate,endDate})=>{
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };
    onFocusChange=(calendarFocused)=>{
        this.setState(()=>({calendarFocused}));
    };
    render(){
        return(
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input type="text" value={this.props.filters.text} onChange={this.onTextChange} className="text-input" placeholder="Search expenses"/>
                    </div>
                    <div className="input-group__item">
                        <select value={this.props.filters.sortBy} onChange={this.onSortChange} className="select">
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            startDateId={"pripripri"}
                            endDate={this.props.filters.endDate}
                            endDateId={"pruprupru"}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={()=>false}
                            showClearDates={true} //esto es para borrar las fechas
                        />
                    </div>
                </div>
                
                {/* cada vez que modifique el input, por el onChange, voy a resetear filter.text en el store
                como en ExpenseList estoy usando selectExpenses, me va cambiando que es lo que renderiza */}
            </div>
        );
   };
}

// esto tiene que despachar una accion para setear el filter.text. 
// cuando conecto un componente, adquiero .dispatch en sus props.
const mapStateToProps = (state) => {
    //aca va qué parte quiero del state
    return {
        filters:state.filter
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setTextFilter:(text) => dispatch(setTextFilter(text)),
        setStartDate:(startDate) => dispatch(setStartDate(startDate)),
        setEndDate:(endDate) => dispatch(setEndDate(endDate)),
        sortByDate:() => dispatch(sortByDate()),
        sortByAmount:() => dispatch(sortByAmount())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);