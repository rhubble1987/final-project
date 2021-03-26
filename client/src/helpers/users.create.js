const baseURL = 'http://localhost:3005/api';

// User eg
// {
//   email: '...',
//   password: '...',
//   firstName: '...',
//   lastName: '...',
// }

const createUser = (user) => {
  return fetch(`${baseURL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
};

export default createUser;