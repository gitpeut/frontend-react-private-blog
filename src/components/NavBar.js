import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import LoginPage from "../pages/Login";

import Antoninus from '../assets/Antoninus-Pius.jpg';
import Marcus from '../assets/Marcus-Aurelius.jpg';
import Nerva from '../assets/Nerva.jpg';
import Trajanus from '../assets/Trajanus.jpg';

function NavBar({isAuthenticated, toggleIsAuthenticated, boxVisible, setBoxVisible, userDetails, setUserDetails}) {

    const avatars = {Antoninus: Antoninus, Marcus: Marcus, Nerva: Nerva, Trajanus: Trajanus};

    const history = useHistory();

    function logout() {
        setUserDetails({name: "", avatar: ""});
        toggleIsAuthenticated(false);
        history.push('/');
    }

    function login() {
        console.log("Display login...");
        setBoxVisible(true);
        console.log(userDetails);
        setUserDetails({name: "", avatar: ""});
        console.log(userDetails);
        <LoginPage
            isAuthenticated={isAuthenticated}
            toggleIsAuthenticated={toggleIsAuthenticated}
            boxVisible={boxVisible}
            setBoxVisible={setBoxVisible}
            setUserDetails={setUserDetails}
        />
    }

    return (
        <nav>

            {userDetails.avatar !== "" &&
            <img
                src={avatars[userDetails.avatar]}
                alt="Uw held"
                className="avatar"
                title={userDetails.avatar}
            />
            }

            {isAuthenticated &&
            <button onClick={(e) => logout(e)}>logout</button>
            }

            {!isAuthenticated && <button onClick={(e) => login(e)}>login</button>}


            <div className="nav-container">

                <h4>The Latin Blogs</h4>

                <ul>
                    <li>
                        <NavLink to="/" exact className="nav-link" activeClassName="active-link">Home</NavLink>
                    </li>

                    {isAuthenticated &&
                    <li>
                        <NavLink to="/posts" className="nav-link" activeClassName="active-link">Posts</NavLink>
                    </li>
                    }

                </ul>
            </div>
        </nav>
    );
}

export default NavBar;