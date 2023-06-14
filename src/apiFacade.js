import {URL} from "./Setting.js";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({status: res.status, fullError: res.json()})
    }
    return res.json();
}

function apiFacade() {
    /* Insert utility-methods from a later step (d) here (REMEMBER to uncomment in the returned object when you do)*/

    const login = (user, password) => {
        // console.log("login");
        const options = makeOptions("POST", true, {username: user, password: password});
        console.log(user);
        return fetch(URL + "/api/login", options)
            .then(handleHttpErrors)
            .then(res => {
                setToken(res.token)
            })
    }

    const getShowsByGuest = (guestname) => {
        const options = makeOptions("GET", true);
        return fetch(URL + `/api/show/${guestname}`, options)
            .then(handleHttpErrors)
            .then((res) => res);
    };

    const fetchData = (ressource) => {
        const options = makeOptions("GET", true); //True adds the token
        return fetch(URL + ressource, options).then(handleHttpErrors);
    }


    const makeOptions = (method, addToken, body) => {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && loggedIn()) {
            opts.headers["x-access-token"] = getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
    const setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }
    const getToken = () => {
        return localStorage.getItem('jwtToken')
    }
    const loggedIn = () => {
        return getToken() != null;
    }
    const logout = () => {
        localStorage.removeItem("jwtToken");
    }


    const createShow = async (showData) => {
        try {
            const response = await fetch(URL+"/api/show/create", {
                method: "POST",
                headers: {
                    "x-access-token": getToken(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(showData),
            });
            if (!response.ok) {
                throw new Error("Failed to create show");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Error creating show:", error);
            throw error;
        }
    };

    const createFestival = async (festivalData) => {
        try {
            const response = await fetch(URL + "/api/festival/create", {
                method: "POST",
                headers: {
                    "x-access-token": getToken(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(festivalData),
            });
            if (!response.ok) {
                throw new Error("Failed to create festival");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Error creating festival:", error);
            throw error;
        }
    };
    const updateFestival = async (festivalData) => {
        try {
            const response = await fetch(URL + "/api/festival/update", {
                method: "PUT",
                headers: {
                    "x-access-token": getToken(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(festivalData),
            });
            if (!response.ok) {
                throw new Error("Failed to update festival");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Error updating festival:", error);
            throw error;
        }
    };



    const createGuest = async (guestData) => {
        try {
            const response = await fetch(URL + "/api/guest/create", {
                method: "POST",
                headers: {
                    "x-access-token": getToken(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(guestData),
            });
            if (!response.ok) {
                throw new Error("Failed to create guest");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Error creating guest:", error);
            throw error;
        }
    };

    const deleteShow = async (id) => {
        try {
            const response = await fetch(URL+'/api/show/delete/'+id, {
                method: "DELETE",
                headers: {
                    "x-access-token": getToken(),
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete show');
            }
            return null;
        } catch (error) {
            console.log('Error deleting show:', error);
            throw error;
        }
    };


    const getAllShows = async () => {
        try {
            const response = await fetch(URL + "/api/show", {
                method: "GET",
                headers: {
                    "x-access-token": getToken(),
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to get shows");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Error getting shows:", error);
            throw error;
        }
    };
    const signUp = async (username, showData) => {
        try {
            const response = await fetch(URL + `/api/guest/signup/${username}`, {
                method: "PUT",
                headers: {
                    "x-access-token": getToken(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(showData),
            });

            if (!response.ok) {
                throw new Error("Failed to sign up for show");
            }

            return null;
        } catch (error) {
            console.log("Error signing up for show:", error);
            throw error;
        }
    };







    function readJwtToken(token) {
        console.log('TOKEN: ', token);
        // console.log('TOKEN opened with atob: ',window.atob(token));
        var base64Url = token.split('.')[1];
        // console.log(base64Url);
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // console.log(base64);
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        console.log(jsonPayload);
        return JSON.parse(jsonPayload);
    }

    return {
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        fetchData,
        getShowsByGuest,
        createShow,
        readJwtToken,
        createGuest,
        getAllShows,
        deleteShow,
        createFestival,
        updateFestival,
        signUp
    }
}

const facade = apiFacade();
export default facade;
