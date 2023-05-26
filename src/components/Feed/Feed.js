import React from 'react';
import styles from './Feed.module.css';
import { Link } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../UserContext';
import { PUBLICATIONS_GET, SUB_DATA_USER_PATCH } from '../../api';
import PublicationsFeed from './PublicationsFeed/PublicationsFeed';
import Error from '../Errors/Error';
import Loading from '../Loading/Loading';
import { ReactComponent as Illustration } from '../../Assets/Illustration.svg';

const Feed = () => {
  const { data, loading, error, request, setLoading } = useFetch();
  const { latitude, longitude, deviceTokenFound, getDeviceToken, getUserLocation } = React.useContext(UserContext);

  const [mounted, setMounted] = React.useState(true);

  React.useEffect(() => {
    async function fetchPublications() {
      const { url, options } = PUBLICATIONS_GET(latitude, longitude);
      const { response, json } = await request(url, options);
      if (response.ok === false) throw new Error(json.message);
      if (mounted) setLoading(false);
    }
    fetchPublications();

    async function fetchSubDataUser() {
      if (!latitude && !longitude)
        getUserLocation();

      const deviceToken = await getDeviceToken();
      console.log({ deviceToken: deviceToken });
      if (deviceToken && latitude && longitude) {
        const { url, options } = SUB_DATA_USER_PATCH({ latitude: latitude, longitude: longitude, deviceToken: deviceToken });
        const patchRes = await fetch(url, options);
        if (!patchRes.ok) throw new Error(`Error: ${patchRes.statusText}`);
      }
    }
    fetchSubDataUser();

    return () => {
      setMounted(false);
    };
  }, [request, latitude, longitude, mounted, setLoading, getDeviceToken, getUserLocation]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data && data.length > 0) {
    return (
      <section className={`${styles.feed} container animeLeft`}>
        {data.map((publication) => (
          <PublicationsFeed key={publication.id} publication={publication} />
        ))}
      </section>
    );
  } else {
    return (
      <section className={`${styles.notFound} container animeLeft`}>
        <div className={styles.illustration}>
          <Illustration />
        </div>
        <span>Ufa!! Nenhum pet perdido!</span>
        <p>Alerte as pessoas ao redor caso seu pet tenha fugido</p>
        <Link className={styles.button} to="/create-publication">
          Alertar Fuga
        </Link>
      </section>
    );
  }
};

export default Feed;
