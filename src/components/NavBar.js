import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import LoginForm from "../components/Login";

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
        setBoxVisible( false );
        history.push('/');
    }

    function login() {
 //       console.log("Display login...");
        setBoxVisible( true );
 //       console.log(userDetails);
        setUserDetails({name: "", avatar: ""});
 //       console.log(userDetails);
    }

    return (

    <>
    <nav>

            { isAuthenticated &&
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

            {/*{isAuthenticated &&  setBoxVisible(false)}*/}

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
        <LoginForm isAuthenticated={isAuthenticated} toggleIsAuthenticated={toggleIsAuthenticated}
                   boxVisible={boxVisible}
                   setBoxVisible={setBoxVisible} userDetails={{...userDetails}} setUserDetails={setUserDetails}/>

    </>
);
}

export default NavBar;