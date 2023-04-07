import React from 'react';
import styles from './GeoLocation.module.css';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

const GeoLocation = () => {
	const { latitude, longitude, errorLocation } = React.useContext(UserContext);
	const navigate = useNavigate();

	// React.useEffect(() => {
  //   UserLocation();
	// }, [UserLocation]);

	if (latitude && longitude){
		navigate("/")
	}
	return (
		<section className={`${styles.geo} container`}>
			<p>Por favor, nos forneça sua localização!</p>
		</section>
	);
}

export default GeoLocation;