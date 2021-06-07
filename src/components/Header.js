import React from "react";
import {Link} from "react-router-dom";
import {startLogout} from "../actions/auth";
import {connect} from "react-redux";

export const Header = ({startLogout}) => (
    <div className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard" ><h1>expensify</h1></Link>
                <button className="btn btn--link" onClick={startLogout}>Logout</button>
            </div>
        </div>
        {/* <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink> esto va a ser un boton en main */}
    </div>
)

const mapDispatchToProps = (dispatch)=>{
    return {
        startLogout: ()=> dispatch(startLogout())
    };
};

export default connect(undefined, mapDispatchToProps)(Header);