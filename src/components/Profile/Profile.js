import React, { useContext } from 'react';
import styles from './Profile.module.css';
import { UserContext } from '../../UserContext';
import { ReactComponent as MyPublicationsIcon } from '../../Assets/Icon awesome-border-all.svg';
import { ReactComponent as MyPublicationsViewsIcon } from '../../Assets/Icon material-wallpaper.svg';
import { MY_PUBLICATIONS_GET,  PUBLICATIONS_PER_PUBLICATION_VIEWS_GET} from '../../api';
import PublicationDetails from '../PublicationDetails/PublicationDetails';

const Profile = () => {
  const isMountedRef = React.useRef(true);
  const { data } = React.useContext(UserContext);
  const [activeTab, setActiveTab] = React.useState(0);
  const [myPublications, setMyPublications] = React.useState(null);
  const [myPublicationsViews, setMyPublicationsViews] = React.useState(null);
  // const [publicationDetailsId, setPublicationDetailsId] = React.useState(null);
  // const [show, setShow] = React.useState(false);
  // const handleClose = () => {
  //   setShow(false);
  // };
  
  // const handleShow = (publicationId) => {
  //   // Lógica para mostrar o modal e fazer qualquer outra operação necessária
  //   setShow(true);
  //   setPublicationDetailsId(publicationId);
  // };

  React.useEffect(() => {
    async function fetchMyPublications() {
      try {
        if (isMountedRef.current) {
          const { url, options } = MY_PUBLICATIONS_GET();
          const response = await fetch(url, options);
          const json = await response.json();
          console.log(json.data);
          if (response.ok === false) throw new Error(json.message);
          setMyPublications(json.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchMyPublications();

    async function fetchPerPublicationsViews() {
      try {
        if (isMountedRef.current) {
          const { url, options } = PUBLICATIONS_PER_PUBLICATION_VIEWS_GET();
          const response = await fetch(url, options);
          const json = await response.json();
          console.log(json.data);
          if (response.ok === false) throw new Error(json.message);
          setMyPublicationsViews(json.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPerPublicationsViews();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  function firstLetterUppercase(changeLetter) {
    let letter = changeLetter.slice(0, 1).toUpperCase();
    let restOfTheWord = changeLetter.slice(1);
    return letter + restOfTheWord;
  }

  let activeList;
  if (activeTab === 0) {
    activeList = myPublications;
  } else if (activeTab === 1) {
    activeList = myPublicationsViews;
  }

  if (myPublications && myPublicationsViews)
    return (
      <section className={`${styles.profile} container animeLeft`}>
        <div className={styles.top}>
          <div className={styles.spanImage}>
            <span>{data.name.slice(0, 1).toUpperCase()}</span>
          </div>
        </div>
        <div className={styles.title}>
          <h3>Olá, {firstLetterUppercase(data.name)}</h3>
        </div>
        <div className={`${styles.tabs}`}>
          <button
            type='button'
            className={activeTab === 0 ? `${styles.active}` : ''}
            onClick={() => handleTabClick(0)}
          >
            <MyPublicationsIcon />
          </button>
          <button
            type='button'
            className={activeTab === 1 ? `${styles.active}` : ''}
            onClick={() => handleTabClick(1)}
          >
            <MyPublicationsViewsIcon />
          </button>
        </div>
        <div className={`${styles.gridPosts}`}>
        {activeList && activeList.map((item) => (
          <PublicationDetails
            key={item.id}
            publication={item}
          />
          // <div key={item.id}>
          //   <button onClick={() => handleShow(item.id)} className={styles.buttonDetails}>
          //     <figure key={item.id} className={`${styles.imgItem} ${styles.fadeIn}`}>
          //       <img className={`${styles.image}`} src={item.image} alt='imagem html' />
          //     </figure>
          //   </button>
          //   <Modal
          //     dialogClassName={`${styles.customModal}`}
          //     show={show}
          //     onHide={handleClose}
          //   >
          //     <Modal.Header closeButton className={styles.modalHeader}>
          //       <Modal.Title>Detalhes do item {publicationDetailsId}</Modal.Title>
          //     </Modal.Header>
          //     <Modal.Body className={styles.modalBody}>
          //       {myPublications && myPublicationsViews && (
          //         <PublicationDetails
          //           key={index}
          //           publicationId={publicationDetailsId}
          //         />
          //       )}
          //     </Modal.Body>
          //   </Modal>
          // </div>
        ))}
        </div>
      </section>
    );
    else return null;
};

export default Profile;
