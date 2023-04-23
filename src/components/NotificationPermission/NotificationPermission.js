import React from 'react';
import styles from './NotificationPermission.module.css';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '../Forms/Button';
import { ReactComponent as NotificationIlustration } from '../../Assets/undraw_happy_announcement_re_tsm0.svg';

const NotificationPermission = () => {
	const { login, latitude, longitude, notificationPermission, requestNotificationPermission } = React.useContext(UserContext);
	const navigate = useNavigate();
	console.log(notificationPermission);
    // React.useEffect(() => {

    // }, []);

    
      

	if (login && latitude && longitude && notificationPermission === 'granted'){
		navigate("/feed")
	}

	return (
		<section className={`${styles.notification} container animeLeft`}>
			<div className={`${styles.notificationContainer}`}>
				<h2 className='title2'>Notificação</h2>
				<p>As notificações são necessárias para fornecer recursos específicos.</p>
				<NotificationIlustration className={styles.imgNotification} />
				<p>Por favor, habilite as suas notificações nas configurações do seu navegador, e clique no botão abaixo.</p>
				{<Button onClick={requestNotificationPermission}>Habilitar Notificação</Button>}
			</div>
		</section>
	);
}

export default NotificationPermission;