import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

// components
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import UserList from '../UserList/UserList';

// styles
import './Chat.css';

let socket;

const Chat = () => {
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const { name, room } = queryString.parse(useLocation().search);
  const SERVER = 'http://localhost:5000';

  useEffect(() => {
    socket = io(SERVER);
    socket.emit('join', { name, room }, error => console.log(error));

    // cleanup
    return () => socket.disconnect();
  }, [SERVER, name, room]);

  useEffect(() => {
    socket.on('message', message => setMessages(m => [...m, message]));
    socket.on('room-data', data => setUsers(data.users));

    // cleanup
    return () => {
      socket.off('message');
      socket.off('room-data');
    };
  }, []);

  const sendMessage = e => {
    e.preventDefault();
    if (message) socket.emit('send-message', message, () => setMessage(''));
  };

  return (
    <div className='outerContainer'>
      <UserList users={users} />
      <div className='container'>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
