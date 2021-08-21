import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import './UserList.css';

const UserList = ({ users }) => (
  <div className='textContainer'>
    <div>
      <h1>
        Realtime Chat Application{' '}
        <span role='img' aria-label='emoji'>
          💬
        </span>
      </h1>
      <h2>
        Build with React, Express, and Socket.IO{' '}
        <span role='img' aria-label='emoji'>
          🔨
        </span>
      </h2>
      <h2>
        Try it out!{' '}
        <span role='img' aria-label='emoji'>
          ➡️
        </span>
      </h2>
    </div>

    {users && (
      <div>
        <h1>People currently chatting:</h1>
        <div className='activeContainer'>
          <h2>
            {users.map(({ name }) => (
              <div key={name} className='activeItem'>
                <img alt='Online Icon' src={onlineIcon} className='pr-10' />
                {name}
              </div>
            ))}
          </h2>
        </div>
      </div>
    )}
  </div>
);

export default UserList;
