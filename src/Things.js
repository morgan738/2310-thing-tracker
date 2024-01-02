import React from "react";

const Things = ({things, users}) => {
    return(
        <div>
            <h3>Things - {things.length}</h3>
            <ul>
                {
                    things.map((thing) => {
                        return (
                            <li key={thing.id}>
                                {thing.name}
                                <ul>
                                    {
                                        users.map((user) => {
                                            return(
                                                <li key={user.id} className={thing.user_id === user.id ? 'owner': ''}>
                                                    {user.name}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )

}

export default Things