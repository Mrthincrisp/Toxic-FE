import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getUserChats } from '../api/ChatCalls';

export default function UserChats() {
  const [chats, setChats] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getUserChats(user.id).then(setChats);
  }, [user]);

  return (
    <div>
      Conversations:
      <div>
        {chats.map((chat) => (
          <div
            key={chat.id}
            // onClick = {() => getSingleChat(chat.id)}
            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc', marginBottom: '5px' }}
          >
            <span>{chat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
