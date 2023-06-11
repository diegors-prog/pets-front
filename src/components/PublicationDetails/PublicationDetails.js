import React from 'react';
import styles from './PublicationDetails.module.css';
import { UserContext } from '../../UserContext';
import Modal from 'react-bootstrap/Modal';
import { PUBLICATION_DETAILS_GET} from '../../api';

const PublicationDetails = ({ publication }) => {
  const isMountedRef = React.useRef(true);
  const { data } = React.useContext(UserContext);
	const [show, setShow] = React.useState(false);
	const [publicationDetails, setPublicationDetails] = React.useState(null);
  const handleClose = () => {
    setShow(false);
  };
  
  const handleShow = () => {
    setShow(true);
  };
	
	React.useEffect(() => {
    async function fetchMyPublications() {
      try {
        if (isMountedRef.current) {
          const { url, options } = PUBLICATION_DETAILS_GET(publication.id);
          const response = await fetch(url, options);
          const json = await response.json();
          console.log(json.data);
          if (response.ok === false) throw new Error(json.message);
          setPublicationDetails(json.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchMyPublications();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

	return (
		<>
      {publicationDetails &&
        <div className={styles.publicationDetails}>
          <button onClick={handleShow} className={styles.buttonDetails}>
						<figure className={`${styles.imgItem} ${styles.fadeIn}`}>
							<img className={`${styles.image}`} src={publication.image} alt='imagem html' />
						</figure>
          </button>
          <Modal
              dialogClassName={`${styles.customModal}`}
              show={show}
              onHide={handleClose}
            >
              <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title>Detalhes do item {publication.id}</Modal.Title>
              </Modal.Header>
              <Modal.Body className={styles.modalBody}>
                {publicationDetails.image}
								{publicationDetails.user.name}
              </Modal.Body>
            </Modal>
        </div>
      }
    </>
	);
}

export default PublicationDetails;