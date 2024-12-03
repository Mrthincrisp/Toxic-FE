import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const userLogin = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/user/login/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const checkUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/user/check/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(async (res) => {
        let data;
        console.log('status:', res);
        if (res.status === 204) {
          resolve({});
        } else {
          data = await res.json();
          // console.log('data:', data);
          resolve(data);
        }
      })
      .catch(reject);
  });

const registerUser = (userInfo) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/create/`, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => resolve(resp.json()))
      .catch(reject);
  });

export { userLogin, registerUser, checkUser };
