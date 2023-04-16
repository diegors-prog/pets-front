import React from 'react';
import styles from './GeoLocation.module.css';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '../Forms/Button';
import { ReactComponent as GeoIlustration6 } from '../../Assets/undraw_navigation_re_wxx4.svg';

const GeoLocation = () => {
	const { login, latitude, longitude, errorLocation, getUserLocation } = React.useContext(UserContext);
	const navigate = useNavigate();

	// const handleMostrarLocalizacao = () => {
	// 	console.log("porra");
	// 	getUserLocation();
	// };

	if (login && latitude && longitude){
		navigate("/feed")
	}

	return (
		<section className={`${styles.geo} container`}>
			<div className={`${styles.geoContainer}`}>
				<h2 className='title2'>Geolocalização</h2>
				<p>A localização é necessária para fornecer recursos específicos.</p>
				<GeoIlustration6 className={styles.imgGeo} />
				<p>Sua localização não será compartilhada com outros usuários. Por favor, habilite a localização nas configurações do seu navegador.</p>
				{/* <Button onClick={handleMostrarLocalizacao}>Habilitar Localização</Button> */}
			</div>
		</section>
	);
}

export default GeoLocation;