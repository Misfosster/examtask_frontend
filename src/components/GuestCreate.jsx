import React, {useState, useEffect} from 'react';
import facade from "../apiFacade";

function GuestCreate() {
    const [guest, setGuest] = useState({user: {user_name: "", user_password: ""}, phone: "", email: "", status: ""});

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (name === "user_name" || name === "user_password") {
            setGuest({
                ...guest,
                user: {
                    ...guest.user,
                    [name]: value,
                },
            });
        } else {
            setGuest({
                ...guest,
                [name]: value,
            });
        }
    };



    const handleCreateGuest = (event) => {
        event.preventDefault();
        console.log(guest);
        facade.createGuest(guest);
    };

    return (
        <div>
            <h1>Create guest</h1>
            <form onSubmit={handleCreateGuest}>
                <label>
                    Username:
                    <input name="user_name" type="text" value={guest.user.user_name} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input name="user_password" type="password" value={guest.user.user_password} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Phone number:
                    <input name="phone" type="text" value={guest.phone} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Email:
                    <input name="email" type="text" value={guest.email} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Status:
                    <input name="status" type="text" value={guest.status} onChange={handleChange}/>
                </label>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default GuestCreate;
