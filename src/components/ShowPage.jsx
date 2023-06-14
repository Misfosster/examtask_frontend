import React, { useState, useEffect } from 'react';
import facade from '../apiFacade';

function ShowPage() {
    const [shows, setShows] = useState([]);
    const isAdmin = facade.loggedIn() && facade.readJwtToken(facade.getToken()).roles.includes('admin');
    const username = facade.readJwtToken(facade.getToken()).username;

    useEffect(() => {
        fetchShows();
    }, []);

    const fetchShows = async () => {
        try {
            const data = await facade.getAllShows();
            setShows(data);
        } catch (error) {
            console.log('Error fetching shows:', error);
        }
    };

    const handleRemoveShow = async (id) => {
        try {
            await facade.deleteShow(id);
        } catch (error) {
            console.log('Error removing show:', error);
        }
    };

    const handleSignup = async (showData) => {
        try {
            await facade.signUp(username, showData);

            // Handle the sign-up success here (e.g., show a success message, redirect to a new page)
            console.log('Sign-up for show successful');
        } catch (error) {
            // Handle the sign-up error here (e.g., show an error message)
            console.log('Error signing up for show:', error);
        }
    };


    if (isAdmin) {
        return (
            <div>
                <h1>Show Page</h1>
                {shows.map((show) => (
                    <div key={show.id}>
                        <h2>{show.name}</h2>
                        <p>Duration: {show.duration}</p>
                        <p>Start Date: {show.startDate}</p>
                        <p>Start Time: {show.startTime}</p>
                        <button onClick={() => handleRemoveShow(show.id)}>Remove</button>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div>
                <h1>Show Page</h1>
                {shows.map((show) => (
                    <div key={show.id}>
                        <h2>{show.name}</h2>
                        <p>Duration: {show.duration}</p>
                        <p>Start Date: {show.startDate}</p>
                        <p>Start Time: {show.startTime}</p>
                        <button onClick={() => handleSignup(show)}>
                            Sign Up
                        </button>
                    </div>
                ))}
            </div>
        );

    }
}

export default ShowPage;
