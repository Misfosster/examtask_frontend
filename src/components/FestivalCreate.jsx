import React, { useState } from 'react';
import facade from "../apiFacade";

function FestivalCreate() {
    const [festival, setFestival] = useState({
        name: "",
        city: "",
        startDate: "",
        duration: 0
    });

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        setFestival({
            ...festival,
            [name]: value,
        });
    };

    const handleCreateFestival = (event) => {
        event.preventDefault();
        console.log(festival);
        facade.createFestival(festival);
    };

    return (
        <div>
            <h1>Create Festival</h1>
            <form onSubmit={handleCreateFestival}>
                <label>
                    Name:
                    <input name="name" type="text" value={festival.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    City:
                    <input name="city" type="text" value={festival.city} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Start Date:
                    <input name="startDate" type="text" value={festival.startDate} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Duration:
                    <input name="duration" type="number" value={festival.duration} onChange={handleChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default FestivalCreate;
