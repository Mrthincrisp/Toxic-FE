import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getChatMessages = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/message/${id}/chat`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createNewMessage = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/message/new`, {
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

export { getChatMessages, createNewMessage };
