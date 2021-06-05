import React from "react";
import {connect} from "react-redux";
import {startLogin} from "../actions/auth";


export const LoginPage = ({startLogin})=>{
    return(
        <div>
            <button onClick={startLogin}>Login</button> 
        </div>
    );
};

//no necesito nada del state pero necesito que el componente tenga acceso a dispatch, por eso lo conecto
const mapDispatchToProps = (dispatch) =>{
    return {
        startLogin:()=>dispatch(startLogin())
    }
};

export default connect(undefined, mapDispatchToProps)(LoginPage);