import React from "react";
import {NavLink} from "react-router-dom";
import {startLogout} from "../actions/auth";
import {connect} from "react-redux";

export const Header = ({startLogout}) => (
    <div>
        <h1>expensify</h1>
        <NavLink exact={true} to="/" activeClassName="is-active">Dashboard</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
        <button onClick={startLogout}>Logout</button>
        {/* <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>  este voy a acceder desde un elem en particular*/}
        {/* <NavLink to="/help" activeClassName="is-active">Help</NavLink> */}
    </div>
)

const mapDispatchToProps = (dispatch)=>{
    return {
        startLogout: ()=> dispatch(startLogout())
    };
};

export default connect(undefined, mapDispatchToProps)(Header);