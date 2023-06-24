import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import styles from './PublicationDetailsDelete.module.css';
import { UserContext } from '../../../UserContext';
import { PUBLICATION_DETAILS_DELETE } from '../../../api';
import useFetch from '../../../Hooks/useFetch';
import { ReactComponent as Delete } from '../../../Assets/material-delete-forever-black.svg';
import Button from '../../Forms/Button';
import Modal from 'react-bootstrap/Modal';

const PublicationDetailsDelete = ({ publicationId, handleCloseDetails, removeItemInMyPublications }) => {
	const isMounted = React.useRef(true);
  const { loading, request } = useFetch();
  const [show, setShow] = React.useState(false);
  const [option, setOption] = React.useState(true);
	console.log();

  React.useEffect(() => {
    return () => {
      isMounted.current = false; // Atualizar o valor da ref para false quando o componente for desmontado
    };
  }, []);

  const handleSuccess = () => {
    toast.success('Publicação excluida com sucesso', {
      duration: 3000,
      style: {
        background: 'green',
        color: '#fff',
        zIndex: 1000
      },
    });
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  async function handleClick(event) {
    event.preventDefault();
    // const confirm = window.confirm('Tem certeza que deseja deletar?');
    // if (confirm) {
    const { url, options } = PUBLICATION_DETAILS_DELETE(publicationId);
    const { response } = await request(url, options);
		console.log(response);
    if (response.ok) {
      handleSuccess();
      handleClose();
			handleCloseDetails();
			removeItemInMyPublications(publicationId);
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
              <Modal.Title>Excluir Publicação</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
              <div className={`${styles.deleteBody} animeLeft`}>
                <p style={{ whiteSpace: 'pre-line' }}>Você realmente deseja excluir sua publicação ?{"\n"}A publicação será excluída permanentemente.</p>
                <div className={`${styles.buttons}`}>
                  <Button variant="primary" onClick={handleClick}>Excluir</Button>
                  <Button onClick={handleClose}>Cancelar</Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <Toaster />
        </div>
      )}
    </>
	);
}

export default PublicationDetailsDelete;