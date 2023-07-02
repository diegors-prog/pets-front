import React from 'react';
import styles from './Profile.module.css';
import { UserContext } from '../../UserContext';
import useFetch from '../../Hooks/useFetch';
import { ReactComponent as MyPublicationsIcon } from '../../Assets/Icon awesome-border-all.svg';
import { ReactComponent as MyPublicationsViewsIcon } from '../../Assets/Icon material-wallpaper.svg';
import { ReactComponent as NotFoundPublications } from '../../Assets/Group10.svg';
import { MY_PUBLICATIONS_GET,  PUBLICATIONS_PER_PUBLICATION_VIEWS_GET} from '../../api';
import PublicationDetails from '../PublicationDetails/PublicationDetails';
import TermsAndPolicy from '../TermsAndPolicy/TermsAndPolicy';
import Loading from '../Loading/Loading';

const Profile = () => {
  const isMountedRef = React.useRef(true);
  const user = React.useContext(UserContext);
  const { data, loading, error, request, setLoading } = useFetch();
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
          const { response, json } = await request(url, options);
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
          const { response, json } = await request(url, options);
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

  function removeItemInMyPublications(id) {
    console.log(myPublications);
    const updatedPublications = myPublications.filter((publication) => publication.id !== id);
    setMyPublications(updatedPublications);
    console.log(myPublications);
  }

  let activeList;
  if (activeTab === 0) {
    activeList = myPublications;
  } else if (activeTab === 1) {
    activeList = myPublicationsViews;
  }

  if (loading) return <Loading />;
  if (myPublications && myPublicationsViews)
    return (
      <section className={`${styles.profile} container animeLeft`}>
        <div className={styles.top}>
          <div className={styles.spanImage}>
            <span>{user.data.name.slice(0, 1).toUpperCase()}</span>
          </div>
        </div>
        <div className={styles.title}>
          <h3>Olá, {firstLetterUppercase(user.data.name)}</h3>
          <TermsAndPolicy />
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
        <div className={`${activeList.length > 0 ? styles.gridPosts : ''}`}>
          {activeList && activeList.length > 0 ? activeList.map((item, index) => (
            <PublicationDetails
              key={index}
              publication={item}
              removeItemInMyPublications={removeItemInMyPublications}
            />
          )) : <div className={`${styles.NotFound} ${styles.fadeIn}`}> <NotFoundPublications /> <p>Ainda não há nenhuma publicação</p> </div>}
        </div>
      </section>
    );
  else return null;
};

export default Profile;
