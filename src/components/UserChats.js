/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { deleteUserFromChat, getUserChats } from '../api/ChatCalls';
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

  const handleDeleteChat = (userId, chatId) => {
    const confirmed = window.confirm('Are you sure you want to delete this conversation?');
    if (confirmed) {
      deleteUserFromChat(userId, chatId);
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    }
  };

  return (
    <div>
      Chats:
      <div>
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleOpenChat(chat)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              border: '1px solid #ccc',
              marginBottom: '5px',
            }}
          >
            <span>{chat.name}</span>
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering handleOpenChat
                handleDeleteChat(user.id, chat.id);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'red',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              X
            </Button>
          </div>
        ))}
      </div>
      <ChatModal chat={openChat} show={showModal} onClose={handelCloseModal} />
    </div>
  );
}
