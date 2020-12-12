import React from 'react';
import './UserItem.css'

function UserItem(props) {
    const {name, email, isGoldClient, salary, imageLink, deleteUser, id} = props;
    return (
        <div className="userItem">
            <div className="userItem__data">
                <h3>{ name }</h3>
                <p>Email: { email }</p>
                { isGoldClient
                    ? <h3>Client GOLD</h3>
                    : null
                }
                <p>Salary: { salary }</p>
                <button className="deleteButton" onClick={() => {deleteUser(id)}}>Stergere</button>
            </div>
            
            <div className="userItem__image">
                <img src={ imageLink } alt="no-image"/>
            </div>
            
        </div>
    );
}

export default UserItem;