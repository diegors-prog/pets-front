import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [errorLocation, setErrorLocation] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      setLatitude(null);
      setLongitude(null);
      setErrorLocation(null);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate],
  );

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const { data } = await response.json();
    setData(data);
    setLogin(true);
  }

  async function userLogin(email, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ email, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { data } = await tokenRes.json();
      console.log("Token: " + data.token);
      window.localStorage.setItem('token', data.token);
      await getUser(data.token);
      console.log(latitude, longitude);
      if (latitude && longitude)
        navigate('/');
      else
      navigate('/location');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          console.log(response);
          if (!response.ok) throw new Error('Token inválido');
          const { data } = await response.json();
          console.log(data);
          await getUser(data.token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  const getUserLocation = () => {

    const onSuccess = (location) => {
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    }

    const onError = error => {
      setErrorLocation(error);
    }

    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: 'Geolocalização não suportada.',
      })
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  getUserLocation();

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login, latitude, longitude, errorLocation }}
    >
      {children}
    </UserContext.Provider>
  );
};
