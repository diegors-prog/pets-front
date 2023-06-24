const API_URL = 'https://petfinder360-api-production.up.railway.app/api';

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

export function PUBLICATION_POST(body, token) {
  return {
    url: API_URL + '/Publication',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function FILE_POST(formData, token) {
  return {
    url: API_URL + '/Publication/uploadFile',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    },
  };
}

export function PUBLICATION_DELETE(id, wasFound) {
  return {
    url: `${API_URL}/Publication/${id}/${wasFound}`,
    options: {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    },
  };
}

export function PUBLICATIONS_GET(latitude, longitude) {
  return {
    url: `${API_URL}/Publication/${latitude}/${longitude}`,
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

export function COMMENTS_GET(publicationId) {
  return {
    url: `${API_URL}/comment/${publicationId}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    },
  };
}

export function PUBLICATION_VIEWS_POST(body) {
  return {
    url: `${API_URL}/PublicationViews`,
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
    url: API_URL + '/User/sendEmail',
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
    url: API_URL + '/User/resetPassword',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function CONTACT_MESSAGE(body) {
  return {
    url: API_URL + '/User/sendEmailContact',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function SUB_DATA_USER_PATCH(body) {
  return {
    url: `${API_URL}/User/updateSubDataUser`,
    options: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
    },
  };
}

export function MY_PUBLICATIONS_GET() {
  return {
    url: `${API_URL}/Publication/GetAllPerUser`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    },
  };
}

export function PUBLICATIONS_PER_PUBLICATION_VIEWS_GET() {
  return {
    url: `${API_URL}/Publication/GetAllPerPublicationViews`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    },
  };
}

export function PUBLICATION_DETAILS_GET(id) {
  return {
    url: `${API_URL}/Publication/publicationDetails/${id}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    },
  };
}

export function PUBLICATION_DETAILS_DELETE(id) {
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