import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Fade from 'react-reveal'
import Rotate from 'react-reveal'


import { ReactComponent as SunIcon } from './sunny-day.svg'

import './join.styles.scss';

function Join() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const storedDarkMode = localStorage.getItem("DARK_MODE");
    const [darkMode, setDarkMode] = useState(JSON.parse(storedDarkMode))
    const toggleDarkMode = () => setDarkMode(!darkMode);

    useEffect(() => {
        localStorage.setItem("DARK_MODE", darkMode);
    }, [darkMode]);




    return (
        <div className={`joinOuterContainer ${darkMode ? "dark" : "light"}`}>
            {
                darkMode ? (<SunIcon className="sun-icon" onClick={toggleDarkMode} />)
                    : (<i className="moon icon" onClick={toggleDarkMode} />)
            }

            <div className='joinInnerContainer'>
                <Rotate top right>
                    <h1 className="heading">Join a room to begin Chatting</h1>
                </Rotate>
                <Fade left>
                    <div>
                        <input
                            className="joinInput"
                            placeholder="Name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </Fade>

                <Fade right>

                    <div>
                        <input
                            className="joinInput mt-20 "
                            placeholder="Room"
                            type="text"
                            value={room}
                            onChange={e => setRoom(e.target.value)}
                        />
                    </div>
                </Fade>

                <Fade bottom>

                    <Link
                        onClick={e => (!name || !room ? e.preventDefault() : null)}
                        to={`/chat?name=${name}&room=${room}`}
                    >
                        <button className="button mt-20" type="submit">
                            Sign In
                    </button>
                    </Link>
                </Fade>

            </div>
        </div>
    );
}

export default Join;
