import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const allCategories = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/category/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const singleCategory = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/category/${id}`, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { allCategories, singleCategory };
