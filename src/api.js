export const API_URL = 'https://localhost:44330/api';

export function TOKEN_POST(body) {
  return {
    url: API_URL + '/User/customer/authenticate',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE_POST(token) {
  console.log("token da api: "+token);
  return {
    url: API_URL + '/User/validate-token',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_GET(token) {
  return {
    url: API_URL + '/User',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_POST(body) {
  return {
    url: API_URL + '/User/account',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function PUBLICATION_POST(formData, token) {
  return {
    url: API_URL + '/Publication',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    },
  };
}

export function PUBLICATION_DELETE(id) {
  return {
    url: `${API_URL}/Publication/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    },
  };
}

export function PUBLICATIONS_GET() {
  return {
    url: API_URL + '/Publication',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    },
  };
}

export function PUBLICATION_GET(id) {
  return {
    url: `${API_URL}/Publication/${id}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    },
  };
}

export function COMMENT_POST(body) {
  return {
    url: `${API_URL}/Comment`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_LOST(body) {
  return {
    url: API_URL + '/api/password/lost',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_RESET(body) {
  return {
    url: API_URL + '/api/password/reset',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}
