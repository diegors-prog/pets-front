import React from 'react';
import styles from './PublicationsFeed.module.css';
import { ReactComponent as Views } from '../../../Assets/ionic-md-thumbs-up.svg';
import { ReactComponent as Comments } from '../../../Assets/awesome-comment-dots.svg';
import { UserContext } from '../../../UserContext';
import PublicationDelete from './PublicationDelete/PublicationDelete';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from '../../../Hooks/useFetch';
import { PUBLICATION_GET } from '../../../api';
import CommentPublication from '../CommentPublication/CommentPublication';

const PublicationsFeed = ({ publication }) => {
  const user = React.useContext(UserContext);
  const { data, error, loading, request } = useFetch();
  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
    window.location.reload(true);
  };
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    async function fetchPublication() {
      const { url, options } = PUBLICATION_GET(publication.id);
      const { response, json } = await request(url, options);
      console.log(json);
    }
    fetchPublication();
  }, [publication, request]);
  
  if (data)
    return (
      <div className={styles.publication}>
        <div className={styles.profile}>
          <div className={styles.profile2}>
            <div>
              <span>{publication.user.name.slice(0, 1).toUpperCase()}</span>
            </div>
            <p>{publication.user.name.split(' ')[0]}</p>
          </div>
          {user.data && user.data.name === data.user.name ? (
            <PublicationDelete id={data.id} />
          ) : (
            <p></p>
          )}
        </div>
        <div>
          <img src={data.image} className={styles.img} alt="imagem html" />
        </div>
        <div className={styles.description}>
          <div className={styles.viewComment}>
            <h2>{publication.title}</h2>
            <div className={styles.icons}>
              <button className={styles.statusButton}>
                <Views className={styles.svg} />
              </button>
              <Button
                className={styles.commentButton}
                variant="primary"
                onClick={handleShow}
              >
                <Comments className={styles.svg} />
              </Button>
              <Modal
                dialogClassName="fullscreen"
                show={show}
                onHide={handleClose}
              >
                <Modal.Header closeButton className={styles.modalHeader}>
                  <Modal.Title>Coment??rios</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                  {data && (
                    <CommentPublication
                      key={data.id}
                      id={publication.id}
                      commentss={data.comments}
                      username={user.data.name}
                    />
                  )}
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <span>{publication.typeOfAnimal}</span>
          <p>{publication.description}</p>
        </div>
      </div>
    );
  else return null;
};

export default PublicationsFeed;
