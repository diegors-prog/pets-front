import React from 'react';
import styles from './PublicationsFeed.module.css';
import { ReactComponent as Views } from '../../../Assets/Icon-open-eye.svg';
import { ReactComponent as Comments } from '../../../Assets/awesome-comment-dots.svg';
import { UserContext } from '../../../UserContext';
import PublicationDelete from './PublicationDelete/PublicationDelete';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from '../../../Hooks/useFetch';
import { PUBLICATION_GET, COMMENTS_GET, PUBLICATION_VIEWS_POST } from '../../../api';
import CommentPublication from '../CommentPublication/CommentPublication';

const PublicationsFeed = ({ publication }) => {
  const isMountedRef = React.useRef(true);
  const user = React.useContext(UserContext);
  const { data, error, loading, request } = useFetch();
  const [comments, setComments] = React.useState(null);
  const [publicationViews, setPublicationsViews] = React.useState(null);
  const [showFullDescription, setShowFullDescription] = React.useState(true);
  const [objetoExiste, setObjetoExiste] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  async function handleNewComment(comments) {
    setComments(comments);
  }

  React.useEffect(() => {

    async function fetchPublication() {
      try {
        if (isMountedRef.current) {
          const { url, options } = PUBLICATION_GET(publication.id);
          const { response, json } = await request(url, options);
          if (response.ok === false) throw new Error(json.message);
          setPublicationsViews(json.data.publicationsViews);
          const existe = json.data.publicationsViews.some(
            (item) => item.userId === user.data.id
          );
          setObjetoExiste(existe);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPublication();

    async function fetchComments() {
      try {
        if (isMountedRef.current) {
          const { url, options } = COMMENTS_GET(publication.id);
          const response = await fetch(url, options);
          const json = await response.json();
          if (response.ok === false) throw new Error(json.message);
          setComments(json.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchComments();

    return () => {
      isMountedRef.current = false;
    };
  }, [publication, request, user]);

  // React.useEffect(() => {
  //   async function fetchPublication() {
  //     const { url, options } = PUBLICATION_GET(publication.id);
  //     const { response, json } = await request(url, options);
  //     if (response.ok === false) throw new Error(json.message);
  //     setPublicationsViews(json.data.publicationsViews);
  //     const existe = json.data.publicationsViews.some(item => item.userId === user.data.id);
  //     setObjetoExiste(existe);
  //   }
  //   fetchPublication();

  //   async function fetchComments() {
  //     const { url, options } = COMMENTS_GET(publication.id);
  //     const response = await fetch(url, options);
  //     const json = await response.json();
  //     if (response.ok === false) throw new Error(json.message);
  //     setComments(json.data);
  //   }
  //   fetchComments();
  // }, [publication, request, user]);

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

  function formatarData(data) {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear().toString();
    const horas = dataObj.getHours().toString().padStart(2, '0');
    const minutos = dataObj.getMinutes().toString().padStart(2, '0');
    
    return `${dia}/${mes}/${ano} as ${horas}h${minutos}`;
  }

  function handleDescriptionPlus() {
    setShowFullDescription(!showFullDescription);
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
            <span className={styles.creationDate}>{formatarData(data.creationDate)}</span>
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
        <div className={styles.descriptionCard}>
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
                      onNewComment={handleNewComment}
                    />
                  )}
                </Modal.Body>
              </Modal>
            </div>
          </div>        
          <span>{data.typeOfAnimal}</span>
          <p className={styles.description}>
            {!showFullDescription || data.description.length < 79 ? data.description : data.description.substring(0, 79) + '...'}
          </p>
          {data.description.length >= 79 && <button onClick={handleDescriptionPlus} className={styles.mais}>{!showFullDescription ? 'menos' : 'mais'}</button>}
        </div>
      </div>
    );
  else return null;
};

export default PublicationsFeed;
