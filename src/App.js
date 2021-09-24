import React, {useState} from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';

import './App.css';
import LoginPage from './pages/Login';
import PostsPage from "./pages/Posts";
import BlogPage from "./pages/Blog";
import NavBar from "./components/NavBar";
import HomePage from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    // We houden in de state bij of iemand is "ingelogd" (simpele versie)
    const [isAuthenticated, toggleIsAuthenticated] = useState(false);
    const [boxVisible, setBoxVisible] = useState(false);
    const [userDetails, setUserDetails] = useState({name: "Blurb", avatar: ""});

    return (

        <main>
            <NavBar isAuthenticated={isAuthenticated} toggleIsAuthenticated={toggleIsAuthenticated}
                    boxVisible={boxVisible}
                    setBoxVisible={setBoxVisible} userDetails={{...userDetails}} setUserDetails={setUserDetails}/>
            <LoginPage isAuthenticated={isAuthenticated} toggleIsAuthenticated={toggleIsAuthenticated}
                       boxVisible={boxVisible}
                       setBoxVisible={setBoxVisible} userDetails={{...userDetails}} setUserDetails={setUserDetails}/>
            <Switch>

                    <PrivateRoute path='/posts' isAuthenticated={isAuthenticated}>
                        <PostsPage/>
                    </PrivateRoute>

                    <PrivateRoute path='/blog/:id' isAuthenticated={isAuthenticated}>
                        <BlogPage/>
                    </PrivateRoute>

                    <Route path='/login' >
                        <LoginPage show={true} isAuthenticated={isAuthenticated} toggleIsAuthenticated={toggleIsAuthenticated}
                               boxVisible={boxVisible}
                               setBoxVisible={setBoxVisible} userDetails={{...userDetails}} setUserDetails={setUserDetails}/>
                    </Route>
                    {/*Use the root ('/' as fallback for all unknown paths*/}
                    <Route>
                        <HomePage/>
                    </Route>
            </Switch>
        </main>
    );
}

export default App;
