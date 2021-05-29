import React from "react";
import {Link} from "react-router-dom";


//aca en vez de usar props, podria usar un destructurado {dispatch(si lo requeria), id, description, amount, createdAt}
const ExpListItem = (props) => {
    return (
        <div>
            <h4><Link to={`/edit/${props.id}`}>{props.description}</Link></h4>
            <p>Amount : {props.amount} | Created:{props.createdAt}</p>
        </div>
    );
};


export default ExpListItem;