import React from 'react';
import styles from './NotificationPermission.module.css';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '../Forms/Button';
import { ReactComponent as NotificationIlustration } from '../../Assets/undraw_happy_announcement_re_tsm0.svg';

const NotificationPermission = () => {
	const isMounted = React.useRef(true);
	const { login, latitude, longitude, notificationPermission, setNotificationPermission } = React.useContext(UserContext);
	const navigate = useNavigate();
	console.log(notificationPermission);

	React.useEffect(() => {
		return () => {
		  isMounted.current = false; // Atualizar o valor da ref para false quando o componente for desmontado
		};
	  }, []);
    
	const requestNotificationPermission = async () => {
		// const permission = await Notification.requestPermission();
		// if (permission === 'granted') {
		//   setNotificationPermission(true)
		//   console.log('Permissão de notificação concedida');
		//   navigate("/feed");
		// } else {
		// 	setNotificationPermission(true)
		// 	navigate("/feed");
		//   	console.log('Permissão de notificação não concedida');jj
		// }
		navigate("/feed");
	}

	let platform = navigator?.userAgentData?.platform || navigator?.platform || 'unknown'

	// React.useEffect(() => {
	// 	if (login && latitude && longitude && notificationPermission) {
	// 	  const timeout = setTimeout(() => {
	// 		navigate("/feed");
	// 	  }, 500);
	
	// 	  return () => {
	// 		clearTimeout(timeout); // Limpar o timeout se o componente for desmontado antes de disparar
	// 	  };
	// 	}
	//   }, [login, latitude, longitude, notificationPermission, navigate]);
	return (
		<section className={`${styles.notification} container animeLeft`}>
			<div className={`${styles.notificationContainer}`}>
				<h2 className='title2'>Notificação</h2>
				<p>As notificações são necessárias para fornecer recursos específicos.</p>
				<NotificationIlustration className={styles.imgNotification} />
				<p>Por favor, habilite as suas notificações nas configurações do seu navegador, e clique no botão abaixo.</p>
				<p>{platform && platform}</p>
				<div>
					<Button onClick={requestNotificationPermission}>Habilitar Notificação</Button>
				</div>
			</div>
		</section>
	);
}

export default NotificationPermission;