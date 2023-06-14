import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import "../styles/ProfilePage.css";
import facade from "../apiFacade";

function ProfilePage({user}) {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        if (user.roles.includes("user")) {
            fetchShowsByGuest(user.username);
        }
    }, [user]);

    const fetchShowsByGuest = (guestname) => {
        facade.getShowsByGuest(guestname)
            .then((res) => {
                setShows(res);
            })
            .catch((error) => {
                console.log("Error fetching shows:", error);
            });
    };

    return (
        <div>

                <div>
                    <h1>Shows:</h1>
                    {shows.map((show) => (
                        <div key={show.id}>
                            <h3>{show.name}</h3>
                            <p>{show.duration}</p>
                            <p>{show.startDate}</p>
                            <p>{show.startTime}</p>
                        </div>
                    ))}
                </div>

        </div>
    );
}

export default ProfilePage;
