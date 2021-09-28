import {useForm} from "react-hook-form";
import users from '../data/users.json';
import GetImage from "./GetImage";

function LoginForm({isAuthenticated, toggleIsAuthenticated, boxVisible, setBoxVisible, setUserDetails}) {


    const {register, handleSubmit, watch, formState: {errors}} = useForm({
        mode: "onBlur",
        defaultValues: {
            'user': 'Antoninus',
            'password': '',
            'avatar': 'Antoninus',
        },
    });

    // watch the radio buttons and copy the value into
    // chosenUser when selected.
    // watch doesn't seem to work if the buttons are in their
    // own component.

    const chosenUser = watch('avatar');

    function checkUserPassword(name, password) {
        // find the chosen user in the user array.
        const filteredUsers = users.filter((user) => name === user.account);
        if (!filteredUsers.length) {
            // user does not exist.
            return false;
        }

        const foundUser = filteredUsers[0];
        if (password !== foundUser.password) {
            // password is wrong
            return false;
        }
        const details = {};
        details.name = foundUser.account;//data.user;
        details.bio = foundUser.bio;

        setUserDetails(details);

        return true;
    }


    function onFormSubmit(data) {

        if (checkUserPassword(chosenUser, data.password)) {
            toggleIsAuthenticated(true);
            setBoxVisible(false);
        } else {
            toggleIsAuthenticated(false);
            setUserDetails({});
        }
    }

    function cancelForm() {
        // User doesn't swant to login
        setBoxVisible(false);
    }

    return (
        <div className={`login-div ${boxVisible ? "" : "hidden"}`}>

            <form onSubmit={handleSubmit(onFormSubmit)}>

                <fieldset>
                    <legend>Login</legend>

                    <div className="stretchdiv">Kies je favoriete keizer om in te loggen

                        {/*// button type cancel bestaat officieel niet, maar CSS*/}
                        {/*// verwerkt het goed. Voor de zekerheid een aparte class*/}
                        {/*// gemaakt*/}

                        <button
                            type="button"
                            className="cancel"
                            title="Sluit login formulier"
                            onClick={() => cancelForm()}
                        >{String.fromCodePoint(0x274C)}
                        </button>

                    </div>

                    <span className="radiobox">
                            {/*watch doesn't seem to see input fields in a component, so*/}
                            {/*no separate component*/}

                            {users.map((user, index) =>
                                <label key={'user-radio-' + index}>
                                    <input type="radio" name="avatar" value={user.account}
                                           {...register("avatar")}/>

                                    <img src={GetImage(user.account)}
                                         alt={user.account}
                                         title={user.bio}
                                         className="avatar"
                                    />
                                </label>
                            )}


                    </span>

                    <label htmlFor="details-password">
                        Wachtwoord:
                        <input
                            type="password"
                            {...register("password",
                                {
                                    required: "Password moet Caesar zijn",
                                    validate: (n) => n === "Caesar" || "Password is Caesar",
                                },
                            )
                            }
                            id="details-password"
                            autoComplete="current-password"
                            placeholder="Wat komt er na Julius"

                        />

                    </label>

                    {errors.password && <p>{errors.password.message}</p>}
                    {!isAuthenticated && <div>Kies een keizer en een geldig wachtwoord</div>}

                    <button type="submit">
                        Login
                    </button>

                </fieldset>

            </form>
        </div>
    );
}

export default LoginForm;