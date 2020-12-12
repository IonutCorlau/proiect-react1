import React from 'react';
import UserItem from './UserItem';

function UserList(props) {
    const { users } = props;
    return (
        <div className="userList">
            <h2>Lista utilizatorilor:</h2>
            { users.map((user, index) => {
                return <UserItem
                    id={ user.id }
                    name={ user.name }
                    email={ user.email }
                    salary = { user.salary }
                    imageLink = { user.imageLink }
                    isGoldClient={ user.isGoldClient }
                    key={ index } 
                    deleteUser = { props.deleteUser }
                />
                
            })}
        </div>
    );
}

export default UserList;