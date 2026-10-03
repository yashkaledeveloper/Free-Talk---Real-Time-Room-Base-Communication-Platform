import React, { useEffect, useState } from 'react'
import api from '../services/api'

const Friends = () => {

    const [friends, setFriends] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get("/users/allusers")
                setFriends(data.users);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [friends])

    const handleFollow = async (userId) => {
        try {
            const { data } = await api.post(`/users/${userId}/follow`)
            console.log(data)

        }catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <ul className='grid flex-2 gap-2'>
                {
                    friends.map(item => <li key={item._id}>
                        <div className='flex gap-3 m-4'>
                            <div className="w-20 h-20 flex justify-center align-center bg-blue-400"></div>
                            <div><b>{item.name}</b><br />{item.username}</div>
                            <button className='bg-blue-100 w-20 h-12' onClick={() => handleFollow(item._id)}>Follow</button>
                        </div>
                    </li>
                    )
                }
            </ul>
        </div>
    )
}

export default Friends