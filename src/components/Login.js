import {React} from 'react';
import {useForm} from "react-hook-form";
import users from '../data/users.json';
import Antoninus from '../assets/Antoninus-Pius.jpg';
import Marcus from '../assets/Marcus-Aurelius.jpg';
import Nerva from '../assets/Nerva.jpg';
import Trajanus from '../assets/Trajanus.jpg';


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

    const chosenUser = watch('avatar');

    function checkUserPassword(name, password) {
        const filteredUsers = users.filter((user) => name === user.account);
        if (!filteredUsers.length) {
//                console.log( "user " + name + "not found");
            return false;
        }

        const foundUser = filteredUsers[0];
//                  console.log ( "Found user " + name );
        if (password !== foundUser.password) {
//                  console.log("password " + password + " is not equal to " + foundUser.password);
            return false;
        }
//                  console.log ( "Found password " + foundUser.password + " this is equal to " + password );
        return true;
    }


    function onFormSubmit(data) {
        const details = {};
        // console.log('SUBMIT');
        // console.log( data );
        if (checkUserPassword( chosenUser, data.password)) {
            details.name   = chosenUser;//data.user;
            details.avatar = chosenUser;
            setUserDetails(details);

            toggleIsAuthenticated(true);
            setBoxVisible(false);
        } else {
            toggleIsAuthenticated(false);
            setUserDetails(details);
        }
    }

    function cancelForm() {
        setBoxVisible(false);
    }

    return (
        <div className={`login-div ${boxVisible ? "" : "hidden"}`}>

            <form onSubmit={handleSubmit(onFormSubmit)} >

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

                        <label>
                            <input type="radio" name="avatar"  value="Antoninus"
                                   defaultChecked
                                   {...register("avatar")}/>

                                <img src={Antoninus}
                                     alt="Antoninus-Pius"
                                     title="Antoninus Pius (Lanuvium, 19 september 86 - 7 maart 161) was keizer van Rome van 138 tot 161 en lid van de invloedrijke Gens Aurelia.

Hij was een van de bekwaamste keizers uit de geschiedenis van het Romeinse rijk en had eerbied voor andermans rechten. Bij rampen betaalde hij uit zijn eigen vermogen. Hij is de enige keizer die zich inzette voor de verbetering van de positie van de slaven. Zijn lange regeringsperiode van ruim 22 jaar valt in de periode van de adoptiefkeizers. Het was een tijd van vrede en welvaart en het keizerrijk kwam tot grote bloei. "
                                     className="avatar"
                                />
                        </label>
                        <label>
                            <input type="radio" name="avatar" value="Marcus"
                                {...register("avatar")}/>

                                <img src={Marcus}
                                     alt="Marcus-Aurelius"
                                     title="Marcus Aurelius (Latijn: Marcus Aurelius Antoninus Augustus) (Rome, 26 april 121 – Vindobona of Sirmium, 17 maart 180) regeerde van 161 tot 180 over het Romeinse rijk. Marcus Aurelius behoorde tot het geslacht der Antonini. Meteen na zijn aantreden stelde hij Lucius Verus (161-169) als medekeizer aan. Marcus Aurelius was de laatste van de Vijf Goede Keizers."
                                     className="avatar"
                                />
                        </label>
                        <label>
                            <input type="radio" name="avatar" value="Nerva"
                                   {...register("avatar")}/>

                            <img src={Nerva} alt="Nerva"
                                 title="Nerva (Latijn: Marcus Cocceius Nerva Caesar Augustus; 8 november 30 - 27 januari 98), was een Romeinse keizer van 96 tot 98. Nerva werd keizer op een leeftijd van vijfenzestig jaar, na een levenslange keizerlijke dienst onder Nero en de keizers van de Flavische dynastie. Onder Nero was hij een lid van het keizerlijke gevolg en speelde een belangrijke rol in het blootleggen van de Pisonische samenzwering van 65. Later, als een loyalist aan de Flaviërs, verkreeg hij de functie van consul in 71 en 90 tijdens de heerschappijen van respectievelijk Vespasianus en Domitianus."
                                 className="avatar"
                            />
                        </label>

                        <label>
                            <input type="radio" name="avatar" value="Trajanus"
                                   {...register("avatar")}/>

                            <img src={Trajanus}
                                 alt="Trajanus"
                                 title="Trajanus (Latijn: Marcus Ulpius Nerva Traianus Augustus; (Itálica, 18 september 53 – Selinus (Cilicië), 8 augustus 117), was Romeins keizer van 98 tot 117. Trajanus werd geboren in een niet-patricische familie in de provincie Hispania Baetica, in Spanje. De bekendheid van Trajanus nam toe tijdens de heerschappij van keizer Domitianus. Trajanus diende als een legatus legionis in Hispania Tarraconensis, in Spanje, en in 89 steunde hij de keizer tegen een opstand aan de Rijn onder leiding van Antonius Saturninus. In september 96 werd Domitianus opgevolgd door Marcus Cocceius Nerva, een oude en kinderloze senator die niet populair bleek te zijn bij het leger. Na een kort en turbulent regeringsjaar, dwong een opstand door leden van de pretoriaanse garde hem de populairdere Trajanus te adopteren als zijn erfgenaam en opvolger. Nerva stierf op 27 januari 98, en werd zonder incident opgevolgd door zijn geadopteerde zoon."
                                 className="avatar"
                            />
                        </label>
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

                    {!isAuthenticated && <div>Kies een gebruiker en een geldig wachtwoord</div>}
                    <input type="text" name="username" className="notdisplayed" />
                    <button type="submit">
                        Login
                    </button>

                </fieldset>

            </form>
        </div>
    );
}

export default LoginForm;