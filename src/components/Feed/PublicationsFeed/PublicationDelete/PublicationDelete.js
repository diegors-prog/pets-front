import React from 'react';
import { PUBLICATION_DELETE } from '../../../../api';
import useFetch from '../../../../Hooks/useFetch';
import styles from './PublicationDelete.module.css';
import Modal from 'react-bootstrap/Modal';
import { ReactComponent as Delete } from '../../../../Assets/material-delete-forever-black.svg';

const PublicationDelete = ({ id }) => {
  const { loading, request } = useFetch();
  const [show, setShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  async function handleClick(event) {
    event.preventDefault();
    const confirm = window.confirm('Tem certeza que deseja deletar?');
    if (confirm) {
      const { url, options } = PUBLICATION_DELETE(id);
      const { response } = await request(url, options);
      handleClose();
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
        <div>
          <button onClick={handleShow} className={styles.delete}>
          <Delete />
          </button>
          <Modal
            dialogClassName={`${styles.customModal}`}
            show={show}
            onHide={handleClose}
          >
            <Modal.Header closeButton className={styles.modalHeader}>
              <Modal.Title>Deletar Publicação</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
              <div className={`${styles.deleteBody} animeLeft`}>
                    
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
};

export default PublicationDelete;
