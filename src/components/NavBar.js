import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import LoginForm from "../components/Login";
import GetImage from "./GetImage";


function NavBar({isAuthenticated, toggleIsAuthenticated, boxVisible, setBoxVisible, userDetails, setUserDetails}) {

    const history = useHistory();

    function logout() {
        setUserDetails({name: ""});
        toggleIsAuthenticated(false);
        setBoxVisible(false);
        history.push('/');
    }

    function login() {
        setBoxVisible(true);
        setUserDetails({});
    }


    return (

        <>
            <nav>

                {isAuthenticated &&
                <img
                    src={GetImage(userDetails.name)}
                    alt={userDetails.name}
                    className="avatar"
                    title={userDetails.bio}
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
            <LoginForm isAuthenticated={isAuthenticated} toggleIsAuthenticated={toggleIsAuthenticated}
                       boxVisible={boxVisible}
                       setBoxVisible={setBoxVisible} userDetails={{...userDetails}} setUserDetails={setUserDetails}/>

        </>
    );
}

export default NavBar;