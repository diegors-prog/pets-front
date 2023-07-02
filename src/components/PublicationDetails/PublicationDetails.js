import React from 'react';
import styles from './PublicationDetails.module.css';
import { UserContext } from '../../UserContext';
import Modal from 'react-bootstrap/Modal';
import PublicationDetailsDelete from './PublicationDetailsDelete/PublicationDetailsDelete';
import { PUBLICATION_DETAILS_GET} from '../../api';
import { ReactComponent as Icon1 } from '../../Assets/plus.svg';
import { ReactComponent as Icon2 } from '../../Assets/Icon material-wallpaper.svg';
import { ReactComponent as Icon3 } from '../../Assets/Icon-awesome-question-circle.svg';
import { ReactComponent as Icon4 } from '../../Assets/Icon-ionic-md-thumbs-up.svg';
import { ReactComponent as Icon7 } from '../../Assets/Icon-ionic-md-thumbs-down.svg';
import { ReactComponent as Icon5 } from '../../Assets/Icon-ionic-ios-time.svg';
import { ReactComponent as Icon6 } from '../../Assets/Icon-awesome-user.svg';
import { ReactComponent as Icon8 } from '../../Assets/Icon-awesome-user-friends.svg';
import { ReactComponent as Icon9 } from '../../Assets/Icon-awesome-user-check.svg';

const PublicationDetails = ({ publication, removeItemInMyPublications }) => {
	const [isAccordionOpen, setIsAccordionOpen] = React.useState(false);
	const isMountedRef = React.useRef(true);
	const { data, user } = React.useContext(UserContext);
	const [show, setShow] = React.useState(false);
	const [publicationDetails, setPublicationDetails] = React.useState(null);
	const [showFullDescription, setShowFullDescription] = React.useState(true);

  const handleClose = () => {
    setShow(false);
  };
  
  const handleShow = () => {
    setShow(true);
  };

	const handleAccordionClick = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
	
	React.useEffect(() => {

    return () => {
      isMountedRef.current = false;
    };
  }, []);

	async function fetchMyPublications() {
		try {
			if (isMountedRef.current) {
				const { url, options } = PUBLICATION_DETAILS_GET(publication.id);
				const response = await fetch(url, options);
				const json = await response.json();
				console.log(json.data);
				if (response.ok === false) throw new Error(json.message);
				setPublicationDetails(json.data);
				handleShow();
			}
		} catch (error) {
			console.log(error);
		}
	}

	function petWasFound() {
		if (publicationDetails && publicationDetails.petWasFound === null)
			return (
				<li>
					<Icon3 className={`${styles.icon}`} />
					{publicationDetails.title} ainda não foi encontrado
				</li>
			);
		else if (publicationDetails && publicationDetails.petWasFound === true)
			return (
				<li>
					<Icon4 className={`${styles.icon}`} />
					{publicationDetails.title} já foi encontrado
				</li>
			);
		else if (publicationDetails && publicationDetails.petWasFound === false)
			return (
				<li>
					<Icon7 className={`${styles.icon}`} />
					{publicationDetails.title} não foi encontrado
				</li>
			);
	}

	function formatarData(data) {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear().toString();
    const horas = dataObj.getHours().toString().padStart(2, '0');
    const minutos = dataObj.getMinutes().toString().padStart(2, '0');
    
    return `${dia}/${mes}/${ano} as ${horas}h e ${minutos}min`;
  }

	function handleDescriptionPlus() {
    setShowFullDescription(!showFullDescription);
  }

	return (
		<>
			{publication &&
			<div className={styles.publicationDetails}>
				<button onClick={fetchMyPublications} className={styles.buttonDetails}>
								<figure className={`${styles.imgItem} ${styles.fadeIn}`}>
									<img className={`${styles.image}`} src={publication.image} alt='imagem html' />
								</figure>
				</button>
				<Modal
					dialogClassName="fullscreen"
					show={show}
					onHide={handleClose}
					>
					<Modal.Header closeButton>
						<div className={styles.modalHeader}>
							<Modal.Title>Detalhes</Modal.Title>
							{data && data.name === publicationDetails?.user?.name ? (
								<PublicationDetailsDelete publicationId={publication.id} handleCloseDetails={handleClose} removeItemInMyPublications={removeItemInMyPublications} />
							) : (
								<p></p>
							)}
						</div>
					</Modal.Header>
					<Modal.Body className={styles.modalBody}>
									<div className={styles.cardDetail}>
										<figure className={`${styles.imgItem} ${styles.fadeIn}`}>
											<img className={`${styles.image}`} src={publicationDetails && publicationDetails.image} alt='imagem html' />
										</figure>
										<div className={`${styles.information}`}>
											<div onClick={handleAccordionClick} className={`${styles.informationHeader}`}>
												<Icon1 className={`${styles.iconPlus}`} />
												<h3>{publicationDetails && publicationDetails.title}</h3>
											</div>
											<div className={`${styles.informationContent} ${isAccordionOpen ? styles.open : ''}`}>
												<div className={`${styles.description}`}>
													<ul className={`${styles.list}`}>
														{petWasFound()}
														<li><Icon5 className={`${styles.icon}`} /> {publicationDetails && `Postado: ${formatarData(publicationDetails.creationDate)}`}</li>
														<li className={`${styles.itemList}`}><Icon6 className={`${styles.icon}`} /> {publicationDetails && `Por: ${publicationDetails.user.name.split(' ')[0]}`}</li>
														<li><Icon8 className={`${styles.icon}`} /> Views: {publicationDetails && publicationDetails.publicationsViews.length}</li>
														{publicationDetails &&
															publicationDetails.publicationsViews.slice(0, showFullDescription ? undefined : 2).map((publication) => {
																return <li className={`${styles.publicationsViews}`}><Icon9 className={`${styles.icon}`} /> {publication.user.name.split(' ')[0]}</li>;
														})}
													</ul>
													{publicationDetails && publicationDetails.publicationsViews.length > 2 && (
														<button onClick={handleDescriptionPlus} className={styles.mais}>
															{!showFullDescription ? 'mais' : 'menos'}
														</button>
													)}		
													<span>{publicationDetails && publicationDetails.typeOfAnimal}</span>				
													<p>{publicationDetails &&  publicationDetails.description}</p>
												</div>
											</div>
										</div>
									</div>
					</Modal.Body>
				</Modal>
			</div>
			}
    </>
	);
}

export default PublicationDetails;