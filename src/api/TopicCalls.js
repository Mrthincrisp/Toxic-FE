import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCategoryTopics = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/topic/category/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((d) => resolve(d))
      .catch(reject);
  });

const getSingleTopic = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/topic/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((d) => resolve(d))
      .catch(reject);
  });

export { getCategoryTopics, getSingleTopic };
