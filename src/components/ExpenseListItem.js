import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import numeral from "numeral";


//aca en vez de usar props, podria usar un destructurado {dispatch(si lo requeria), id, description, amount, createdAt}
const ExpListItem = (props) => {
    return (
        <div>
            <h4><Link to={`/edit/${props.id}`}>{props.description}</Link></h4>
            <p>
                {numeral(props.amount/100).format("$0,0.00")} 
                - 
                {moment(props.createdAt).format("MMMM Do, YYYY")}
            </p>
        </div>
    );
};


export default ExpListItem;