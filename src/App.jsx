import React, {useState} from "react"
import facade from "./apiFacade";
import LogIn from "./components/LoginForm";
import LoggedIn from "./components/LoggedIn";
import {NavLink, Route, Routes} from "react-router-dom";
import CreatePage from "./components/CreatePage.jsx";
import ShowPage from "./components/ShowPage.jsx";


function App() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('setLoggedIn') || false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {username: '', roles: ''});


    const logout = () => {
        facade.logout();
        setUser({username: "", roles: ""});
        setLoggedIn(false);
        localStorage.removeItem('setLoggedIn');
        localStorage.removeItem('user');
        window.location.replace('/examtask/');

    };

    function isAdmin() {
        return user.roles.includes("admin");
    }

    const login = (user, pass) => {
        facade.login(user, pass).then(() => {
            const token = facade.readJwtToken(facade.getToken());
            setUser({username: token.username, roles: token.roles});
            setLoggedIn(true);
            localStorage.setItem('setLoggedIn', true);
            localStorage.setItem('user', JSON.stringify({username: token.username, roles: token.roles}));
        });
    }

    const Header = () => {
        const handleLogout = () => {
            logout();
        };

        return (
            <div>
                <ul className="header">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    {loggedIn && (
                        <>
                            
                            <li>
                                <NavLink to="/profilepage">Profile</NavLink>
                            </li>

                            {isAdmin() && (
                            <li>
                                <NavLink to="/createpage">Create</NavLink>
                            </li>)}
                            <li>
                                <NavLink to="/logout" onClick={handleLogout}>
                                    Logout
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
                <br/>
            </div>
        );
    };
    

    const Home = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h2>Home</h2>
                        {!loggedIn ? (
                            <LogIn login={login}/>
                        ) : (
                            <div>
                                <h3>Welcome back {user.username}</h3>
                                <ShowPage/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    const Logout = () => {
        return (
            <div>
                <h2>Logout</h2>
                <div>
                    <LoggedIn LoggedIn user={user} logout={logout} loggedIn={loggedIn}/>
                    <button onClick={logout}>Logout</button>x
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                
                <Route path="/profilepage"
                       element={<LoggedIn user={user} logout={logout} loggedIn={loggedIn}/>}></Route>
                <Route path="/createpage" element={<CreatePage/>}></Route>

            </Routes>
        </div>
    )
}

export default App
