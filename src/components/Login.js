import {React} from 'react';
import {useForm} from "react-hook-form";
import users from '../data/users.json';
import Antoninus from '../assets/Antoninus-Pius.jpg';
import Marcus from '../assets/Marcus-Aurelius.jpg';
import Nerva from '../assets/Nerva.jpg';
import Trajanus from '../assets/Trajanus.jpg';


function LoginForm({isAuthenticated, toggleIsAuthenticated, boxVisible, setBoxVisible, setUserDetails}) {

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        mode: "onBlur",
        defaultValues: {
            'user': '',
            'password': '',
            'image': '',
        },
    });

    function formEnter(e){
        if(e.key === 'Enter'){
            handleSubmit(onFormSubmit)();
        }
    }

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
        const details = {};
        if (checkUserPassword(data.user, data.password)) {
            details.name = data.user;
            details.avatar = data.image;
            setUserDetails(details);

            toggleIsAuthenticated(true);
            setBoxVisible(false);
        } else {
            toggleIsAuthenticated(false);
            setUserDetails(details);
        }
    }

    function cancelForm(e) {
        setBoxVisible(false);
    }

    function radioClick(e) {
        setValue('image', e.target.value);
        setValue('user', e.target.value);
    }

    return (
        <div className={`login-div ${boxVisible ? "" : "hidden"}`}>

            <form
                 // Om onduidelijke redenen (mobile first?) submit enter het form niet,
                 // wat wel gebruikelijk is in standaard HTML.
                 // Een keyup event is toegevoegd om dit gedrag te herstellen
                onKeyUp={(e)=>formEnter(e)}
                onSubmit={handleSubmit(onFormSubmit)}>

                <fieldset>
                    <legend>Login</legend>

                    <div className="stretchdiv">Kies een gebruiker

                        <button
                            // button type cancel bestaat officieel niet, maar CSS
                            // verwerkt het goed. Voor de zekerheid een aparte class
                            // gemaakt
                            type="button"
                            className="cancel"
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