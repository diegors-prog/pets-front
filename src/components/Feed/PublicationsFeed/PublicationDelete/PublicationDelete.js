import React from 'react';
import { PUBLICATION_DELETE } from '../../../../api';
import useFetch from '../../../../Hooks/useFetch';
import styles from './PublicationDelete.module.css';
import { ReactComponent as Delete } from '../../../../Assets/material-delete-forever-black.svg';

const PublicationDelete = ({ id }) => {
  const { loading, request } = useFetch();

  async function handleClick(event) {
    event.preventDefault();
    const confirm = window.confirm('Tem certeza que deseja deletar?');
    if (confirm) {
      const { url, options } = PUBLICATION_DELETE(id);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  }

  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          <Delete />
        </button>
      )}
    </>
  );
};

export default PublicationDelete;
