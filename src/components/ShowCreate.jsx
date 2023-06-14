import React, { useState, useEffect } from 'react';
import facade from "../apiFacade";

function ShowCreate() {
    const [show, setShow] = useState({ name: "", duration: "", startDate: "", startTime: "" });

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setShow({ ...show, [name]: value });
    };

    const handleCreateShow = (event) => {
        event.preventDefault();
        console.log(show);
        facade.createShow(show);
    };

    return (
        <div>
            <h1>Create Show</h1>
            <form onSubmit={handleCreateShow}>
                <label>
                    Name:
                    <input name="name" type="text" value={show.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Duration:
                    <input name="duration" type="number" value={show.duration} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Start date:
                    <input name="startDate" type="text" value={show.startDate} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Start time:
                    <input name="startTime" type="text" value={show.startTime} onChange={handleChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default ShowCreate;
