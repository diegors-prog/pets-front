import React from 'react';
import styles from './Feed.module.css';
import { Link } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { PUBLICATIONS_GET } from '../../api';
import PublicationsFeed from './PublicationsFeed/PublicationsFeed';
import Error from '../Errors/Error';
import Loading from '../Loading/Loading';
import { ReactComponent as Illustration } from '../../Assets/Illustration.svg';

const Feed = () => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPublications() {
      const { url, options } = PUBLICATIONS_GET();
      const { response, json } = await request(url, options);
      console.log(json);
    }
    fetchPublications();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading && data == null) return <Loading />;
  if (data)
    return (
      <section className={`${styles.feed} container`}>
        {data.map((publication) => (
          <PublicationsFeed key={publication.id} publication={publication} />
        ))}
      </section>
    );
  else
    return (
      <section className={`${styles.notFound} container`}>
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
};

export default Feed;
