import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { withRouter } from 'react-router-dom';

import queryString from 'query-string';

import './chat.styles.scss';

import InfoBar from '../infoBar/infobar.components';
import Input from '../Input/Input.components';
import Messages from '../messages/messages';
import TextContainer from '../text-container/text-container';

let socket;

function Chat({ location, history }) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, async error => {
            if (error) {
                await history.push('/');
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');

            socket.off(); // for unmounting
        };
    }, [ENDPOINT, location.search]);

    if(message){
        
    }

    // useEffect(() => {
    //     const messages = localStorage.getItem('messages');
    //     if (messages) {
    //         setMessages(JSON.parse(messages));
    //     }
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem('messages', JSON.stringify(messages));
    // });

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message]);
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });
    }, [messages]);

    // NEXT CREATE FUNCTION FOR SENDING MESSAGES

    const sendMessage = event => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    const clearMessages = () => {
        setMessages([])
    }



    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} clearMessages={clearMessages} />
                <Messages messages={messages} name={name} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
            <TextContainer users={users} />
        </div>
    );
}

export default withRouter(Chat);
