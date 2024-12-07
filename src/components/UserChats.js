/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getUserChats } from '../api/ChatCalls';
import ChatModal from './ChatModal';

export default function UserChats() {
  const [chats, setChats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [openChat, setOpenChat] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getUserChats(user.id).then(setChats);
  }, [user]);

  const handleOpenChat = (chat) => {
    setShowModal(true);
    setOpenChat(chat);
  };

  const handelCloseModal = () => {
    setShowModal(false);
    setOpenChat({});
  };

  return (
    <div>
      Conversations:
      <div>
        {chats.map((chat) => (
          <div key={chat.id} onClick={() => handleOpenChat(chat)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc', marginBottom: '5px' }}>
            <span>{chat.name}</span>
          </div>
        ))}
      </div>
      <ChatModal chat={openChat} show={showModal} onClose={handelCloseModal} />
    </div>
  );
}
