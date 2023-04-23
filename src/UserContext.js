import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [errorLocation, setErrorLocation] = React.useState(null);
  const [notificationPermission, setNotificationPermission] = React.useState(null);
  //const [errorNotificacionPermission, setErrorNotificacionPermission] = React.useState(null);
  const navigate = useNavigate();

  const handleWaitingForNotificationLoad = (message, background, color) => {
    if (message === 'Notificações não suportadas pelo seu navegador') {
      toast.error(message, {
        duration: 3000,
        style: {
          background: background,
          color: color,
          zIndex: 1000
        },
      });
    } else {
      toast.loading(message, {
        duration: 3000,
        style: {
          background: background,
          color: color,
          zIndex: 1000
        },
      });
    }
  };

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
        navigate('/feed');
      else
      navigate('/feed/location');
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
          if (!response.ok) throw new Error('Token inválido');
          const { data } = await response.json();
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
    console.log("porra");
  }
  getUserLocation();

  const useNotificationPermission = () => {
  
    React.useEffect(() => {
  
      if (!('Notification' in window)) {
        handleWaitingForNotificationLoad('Notificações não suportadas pelo seu navegador', '#F21204', '#FFFFFF');
        setNotificationPermission('unsupported');
        return;
      }
  
      if (Notification.permission === 'granted') {
        console.log('Permissão de notificação já concedida.');
        setNotificationPermission(Notification.permission);
        return;
      }
  
      if (Notification.permission === 'denied') {
        setNotificationPermission(Notification.permission);
        handleWaitingForNotificationLoad('Permissão de notificação foi bloqueada.', '#FED914', '#000000');
        return;
      }
  
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    }, []);
  };
  useNotificationPermission();

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setNotificationPermission(permission)
      console.log('Permissão de notificação concedida');
    }
}

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, getUserLocation, requestNotificationPermission, data, error, loading, login, latitude, longitude, errorLocation, notificationPermission }}
    >
      {children}
    </UserContext.Provider>
  );
};
