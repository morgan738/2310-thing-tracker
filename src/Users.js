import React from "react";

const Users = ({users}) => {
    return(
        <div>
            <h3>Users - {users.length}</h3>
            <ul>
                {
                    users.map((user) => {
                        return(
                            <li key={user.id}>
                                {user.name}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Users