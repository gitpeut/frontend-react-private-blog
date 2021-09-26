import React from 'react';
import {useForm} from "react-hook-form";
import users from '../data/users.json';
import Antoninus from '../assets/Antoninus-Pius.jpg';
import Marcus from '../assets/Marcus-Aurelius.jpg';
import Nerva from '../assets/Nerva.jpg';
import Trajanus from '../assets/Trajanus.jpg';


function LoginForm({isAuthenticated, toggleIsAuthenticated, boxVisible, setBoxVisible, setUserDetails}) {

    //  console.log("login visible " + boxVisible);
    //  let currentUser = { account : "invalid" };

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        mode: "onBlur",
        defaultValues: {
            'user': '',
            'password': '',
            'image': '',
        },
    });

    function checkUserPassword(name, password) {
        const filteredUsers = users.filter((user) => name === user.account);
        if (!filteredUsers.length) {
//                console.log( "user " + name + "not found");
            return false;
        }

        const foundUser = filteredUsers[0];
        //console.log ( "Found user " + name );
        if (password !== foundUser.password) {
//                console.log("password " + password + " is not equal to " + foundUser.password);
            return false;
        }
//            console.log ( "Found password " + foundUser.password + " this is equal to " + password );
        setValue('image', foundUser.avatar);
        return true;
    }


    function onFormSubmit(data) {
        //console.log(data);
        const details = {};
        if (checkUserPassword(data.user, data.password)) {
            details.name = data.user;
            details.avatar = data.image;
            setUserDetails(details);

            toggleIsAuthenticated(true);
            setBoxVisible(false);
        } else {
            toggleIsAuthenticated(false);
            details.name = '';
            details.avatar = '';
            setUserDetails(details);
        }
    }

    function cancelForm(e) {
        setBoxVisible(false);
        e.preventDefault();
    }

    function radioClick(e) {
//        console.log('target value ' + e.target.value);
        setValue('image', e.target.value);
        setValue('user', e.target.value);
    }

    return (
        <div className={`login-div ${boxVisible ? "" : "hidden"}`}>

            <form onSubmit={handleSubmit(onFormSubmit)}>

                <fieldset>
                    <legend>Login</legend>

                    <div className="stretchdiv">Kies een gebruiker

                        <button
                            type="cancel"
                            title="Sluit login formulier"
                            onClick={(e) => cancelForm(e)}
                        >{String.fromCodePoint("0x274C")}
                        </button>
                    </div>

                    <span className="radiobox">

                        <label>
                            <input type="radio" name="avatar" value="Antoninus" defaultChecked
                                   onClick={(e) => radioClick(e)}/>
                                <img src={Antoninus}
                                     alt="Antoninus-Pius"
                                     title="Antoninus-Pius"
                                     className="avatar"
                                />
                        </label>
                        <label>
                            <input type="radio" name="avatar" value="Marcus"
                                   onClick={(e) => radioClick(e)}/>
                                <img src={Marcus}
                                     alt="Marcus-Aurelius"
                                     title="Marcus-Aurelius"
                                     className="avatar"
                                />
                        </label>
                        <label>
                            <input type="radio" name="avatar" value="Nerva"
                                   onClick={(e) => radioClick(e)}/>

                            <img src={Nerva} alt="Nerva"
                                 title="Nerva"
                                 className="avatar"
                            />
                        </label>

                        <label>
                            <input type="radio" name="avatar" value="Trajanus"
                                   onClick={(e) => radioClick(e)}/>

                            <img src={Trajanus}
                                 alt="Trajanus"
                                 title="Trajanus"
                                 className="avatar"
                            />
                        </label>
                    </span>

                    <label htmlFor="details-user" className="notdisplayed">
                        Gebruikersnaam:
                        <input
                            type="text"

                            {...register("user")}
                            id="details-user"
                        />
                    </label>
                    {errors.user && <p>{errors.user.message}</p>}

                    <label htmlFor="details-password">
                        Wachtwoord:
                        <input
                            type="password"

                            {...register("password",
                                {
                                    required: "Password moet Caesar zijn",
                                },
                            )
                            }
                            id="details-password"
                        />
                    </label>
                    {errors.password && <p>{errors.password.message}</p>}


                    <input type="text"
                           className="notdisplayed"
                           {...register("image",
                               {
                                   required: "Een avatar is verplicht",
                               },
                           )
                           }
                    />

                    {!isAuthenticated && <div>Kies een gebruiker en een geldig wachtwoord</div>}

                    <button type="submit">
                        Login
                    </button>

                </fieldset>

            </form>
        </div>
    );
}

export default LoginForm;