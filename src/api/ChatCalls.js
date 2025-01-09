import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUserChats = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/chat/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSingleChat = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/chat/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createNewChat = (payload, id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/chat/new/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteUserFromChat = (userId, chatId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/userchat/user/${userId}/chat/${chatId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getSingleChat, getUserChats, createNewChat, deleteUserFromChat };
