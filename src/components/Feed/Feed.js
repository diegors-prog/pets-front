import React from 'react';
import styles from './Feed.module.css';
import { Link } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../UserContext';
import { PUBLICATIONS_GET } from '../../api';
import PublicationsFeed from './PublicationsFeed/PublicationsFeed';
import Error from '../Errors/Error';
import Loading from '../Loading/Loading';
import { ReactComponent as Illustration } from '../../Assets/Illustration.svg';

const Feed = () => {
  const { data, loading, error, request, setLoading } = useFetch();
  const { latitude, longitude } = React.useContext(UserContext);

  React.useEffect(() => {
    async function fetchPublications() {
      const { url, options } = PUBLICATIONS_GET(latitude, longitude);
      const { response, json } = await request(url, options);
      if (response.ok === false) throw new Error(json.message);
    }
    fetchPublications();
  }, [request, latitude, longitude]);

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
