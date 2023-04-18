import React from 'react';
import styles from './PublicationsFeed.module.css';
import { ReactComponent as Views } from '../../../Assets/ionic-md-thumbs-up.svg';
import { ReactComponent as Comments } from '../../../Assets/awesome-comment-dots.svg';
import { UserContext } from '../../../UserContext';
import PublicationDelete from './PublicationDelete/PublicationDelete';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from '../../../Hooks/useFetch';
import { PUBLICATION_GET, COMMENTS_GET, PUBLICATION_VIEWS_POST } from '../../../api';
import CommentPublication from '../CommentPublication/CommentPublication';

const PublicationsFeed = ({ publication }) => {
  const user = React.useContext(UserContext);
  const { data, error, loading, request } = useFetch();
  const [comments, setComments] = React.useState(null);
  const [publicationViews, setPublicationsViews] = React.useState(null);
  const [objetoExiste, setObjetoExiste] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    async function fetchPublication() {
      const { url, options } = PUBLICATION_GET(publication.id);
      const { response, json } = await request(url, options);
      if (response.ok === false) throw new Error(json.message);
      setPublicationsViews(json.data.publicationsViews);
      const existe = json.data.publicationsViews.some(item => item.userId === user.data.id);
      setObjetoExiste(existe)
    }
    fetchPublication();

    async function fetchComments() {
      const { url, options } = COMMENTS_GET(publication.id);
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok === false) throw new Error(json.message);
      setComments(json.data)
    }
    fetchComments();
  }, [publication, request, user]);

  async function handlePublicationViews() {
    const wasViewed = publicationViews.find(item => item.userId === user.data.id);
    if (!wasViewed) {
      const { url, options } = PUBLICATION_VIEWS_POST({ publicationId: publication.id })
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok === false) throw new Error(json.message);
      setPublicationsViews([...publicationViews, json.data]);
      if (json.data)
        setObjetoExiste(true);
    }
  }

  if (data)
    return (
      <div className={styles.publication}>
        <div className={styles.profile}>
          <div className={styles.profile2}>
            <div>
              <span>{data.user.name.slice(0, 1).toUpperCase()}</span>
            </div>
            <p>{data.user.name.split(' ')[0]}</p>
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
            <h2>{data.title}</h2>
            <div className={styles.icons}>
              <Button
                className={styles.statusButton}
                id={objetoExiste ? `${styles.comBorda}` : ''}
                variant="primary"
                onClick={handlePublicationViews}
              >
                <Views className={styles.svg} />
              </Button>
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
                onExited={() => window.location.reload(true)}
              >
                <Modal.Header closeButton className={styles.modalHeader}>
                  <Modal.Title>Comentários</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                  {data && (
                    <CommentPublication
                      key={data.id}
                      id={publication.id}
                      commentss={comments}
                      username={user.data.name}
                    />
                  )}
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <span>{data.typeOfAnimal}</span>
          <p>{data.description}</p>
        </div>
      </div>
    );
  else return null;
};

export default PublicationsFeed;
