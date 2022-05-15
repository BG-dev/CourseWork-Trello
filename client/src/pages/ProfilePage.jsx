import React from "react";
import { useSelector } from 'react-redux';

function ProfilePage(){

    const user = useSelector(state => state.userReducer.user)

    return(
        <>
            <h1>Your Profile</h1>
            <div className="row">
                <i className="col large material-icons">account_circle</i>
                <h4 className="col">{user.login}</h4>
            </div>
            
        </>
    )
}

export default ProfilePage