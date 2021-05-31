import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => (
    <div>
        <h1>expensify</h1>
        <NavLink exact={true} to="/" activeClassName="is-active">Dashboard</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
        {/* <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>  este voy a acceder desde un elem en particular*/}
        {/* <NavLink to="/help" activeClassName="is-active">Help</NavLink> */}
    </div>
)

export default Header;