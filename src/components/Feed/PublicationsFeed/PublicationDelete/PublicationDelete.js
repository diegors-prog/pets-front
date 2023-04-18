import React from 'react';
import { PUBLICATION_DELETE } from '../../../../api';
import useFetch from '../../../../Hooks/useFetch';
import styles from './PublicationDelete.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from '../../../Forms/Button';
import { ReactComponent as Delete } from '../../../../Assets/material-delete-forever-black.svg';

const PublicationDelete = ({ id }) => {
  const { loading, request } = useFetch();
  const [show, setShow] = React.useState(false);
  const [option, setOption] = React.useState(true);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  async function handleClick(event) {
    event.preventDefault();
    // const confirm = window.confirm('Tem certeza que deseja deletar?');
    // if (confirm) {
    const { url, options } = PUBLICATION_DELETE(id, option);
    const { response } = await request(url, options);
    if (response.ok) {
      handleClose();
      window.location.reload();
    }
    //}
  }

  const handleOptionChange = (e) => {
    const value = e.target.value === 'true'; // Converte o valor do radio button para booleano
    setOption(value); // Atualiza o estado com o novo valor
  };

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
                <p>O que aconteceu com o pet ?</p>
                <label>
                  <input
                    type="radio"
                    value="true"
                    checked={option === true} // Define o radio button como selecionado se o estado for true
                    onChange={handleOptionChange} // Função de callback para lidar com a mudança de valor
                  />
                  Foi Encontrado
                </label>
                <label>
                  <input
                    type="radio"
                    value="false"
                    checked={option === false} // Define o radio button como selecionado se o estado for false
                    onChange={handleOptionChange} // Função de callback para lidar com a mudança de valor
                  />
                  Não Foi Encontrado
                </label>
                <div className={`${styles.buttons}`}>
                  <Button variant="primary" onClick={handleClick}>Deletar</Button>
                  <Button onClick={handleClose}>Cancelar</Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
};

export default PublicationDelete;
