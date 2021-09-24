import React from 'react';
import {useForm} from "react-hook-form";
//import {Redirect} from 'react-router-dom';
import Antoninus from '../assets/Antoninus-Pius.jpg';
import Marcus from '../assets/Marcus-Aurelius.jpg';
import Nerva from '../assets/Nerva.jpg';
import Trajanus from '../assets/Trajanus.jpg';

function LoginPage({show, isAuthenticated, toggleIsAuthenticated, boxVisible, setBoxVisible, setUserDetails}) {

  //  console.log("login visible " + boxVisible);

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        mode: "onBlur",
        defaultValues: {
            'user': 'Julius',
            'password': 'Caesar',
            'image': 'Trajanus',
        },
    });

    function onFormSubmit(data) {
//        console.log(data);
        const details = {};
        details.name = data.name;
        details.avatar = data.image;
        setUserDetails(details);
        toggleIsAuthenticated(true);
        setBoxVisible(false);
    }

    function radioClick(e) {
//        console.log('target value ' + e.target.value);
        setValue('image', e.target.value);
    }

    return (
        <div className={`login-div ${boxVisible ? "" : "hidden"}`}>

            <form onSubmit={handleSubmit(onFormSubmit)}>
                <fieldset>
                    <legend>Login</legend>

                    <label htmlFor="details-user">
                        User:
                        <input
                            type="text"

                            {...register("user",
                                {
                                    required: "User mag niet leeg zijn",
                                    validate: (n) => n === "Julius" || "U moet Julius heten",
                                },
                            )
                            }
                            id="details-user"
                        />
                    </label>
                    {errors.user && <p>{errors.user.message}</p>}

                    <label htmlFor="details-password">
                        Password:
                        <input
                            type="password"

                            {...register("password",
                                {
                                    required: "Password mag niet leeg zijn",
                                    validate: (n) => n === "Caesar" || "Uw password moet Caesar zijn",
                                },
                            )
                            }
                            id="details-password"
                        />
                    </label>
                    {errors.password && <p>{errors.password.message}</p>}

                    Kies een avatar
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

                    <input type="text"
                           className="hidden"
                           {...register("image",
                               {
                                   required: "Een avatar is verplicht",
                               },
                           )
                           }
                    />


                    <button type="submit">
                        Login
                    </button>

                </fieldset>

            </form>
        </div>
    );
}

export default LoginPage;