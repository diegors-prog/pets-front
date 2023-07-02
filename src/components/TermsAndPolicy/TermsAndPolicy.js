import React from 'react';
import styles from './TermsAndPolicy.module.css';
import Modal from 'react-bootstrap/Modal';

const TermsAndPolicy = () => {
	const isMounted = React.useRef(true);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    return () => {
      isMounted.current = false; // Atualizar o valor da ref para false quando o componente for desmontado
    };
  }, []);
  

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

	return (
		<>
      <button onClick={handleShow} className={styles.btnLine}>
        Termos e Política
      </button>
      <Modal
        dialogClassName="fullscreen"
        show={show}
        onHide={handleClose}
      >
      	<Modal.Header closeButton className={styles.modalHeader}>
        	<Modal.Title>Termos e Política</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <div className={`${styles.terms} animeLeft`}>
						<h6>Aceitação dos Termos</h6>
            <p style={{ whiteSpace: 'pre-line' }}>Ao utilizar a aplicação PetFinder360, você concorda em cumprir e ficar vinculado aos seguintes termos e condições de uso. Se você não concordar com algum desses termos, não poderá usar a aplicação.</p>
          </div>
					<div className={`${styles.terms} animeLeft`}>
						<h6>Uso da Aplicação</h6>
            <p style={{ whiteSpace: 'pre-line' }}>A aplicação PetFinder360 destina-se apenas ao uso pessoal e não comercial. Você concorda em utilizar a aplicação de acordo com todas as leis e regulamentos aplicáveis e em não violar os direitos de terceiros.</p>
          </div>
					<div className={`${styles.terms} animeLeft`}>
						<h6>Segurança da Conta</h6>
            <p style={{ whiteSpace: 'pre-line' }}>O usuário é responsável por manter a segurança de sua conta e senha na PetFinder360. É sua obrigação tomar todas as medidas necessárias para proteger suas informações de login. A PetFinder360 não se responsabiliza por qualquer perda ou dano resultante da falha do usuário em cumprir essa obrigação de segurança.</p>
          </div>
					<div className={`${styles.terms} animeLeft`}>
						<h6>Uso Adequado da Aplicação</h6>
            <p style={{ whiteSpace: 'pre-line' }}>O usuário concorda em utilizar as funcionalidades da aplicação PetFinder360 de maneira legal e autorizada. Fica estritamente proibido o uso da aplicação para atividades ilegais, fraudulentas ou prejudiciais a terceiros. Qualquer violação dessas diretrizes resultará na suspensão ou encerramento da conta do usuário.</p>
          </div>
					<div className={`${styles.terms} animeLeft`}>
						<h6>Responsabilidade por Conteúdo Gerado</h6>
            <p style={{ whiteSpace: 'pre-line' }}>Ao utilizar a aplicação PetFinder360, o usuário é exclusivamente responsável por qualquer conteúdo gerado, como publicações, comentários ou informações pessoais compartilhadas. O usuário garante que possui todos os direitos necessários para publicar esse conteúdo e concorda em isentar a PetFinder360 de qualquer responsabilidade relacionada a ele.</p>
          </div>
					<div className={`${styles.terms} animeLeft`}>
						<h6>Comunicação Respeitosa</h6>
            <p style={{ whiteSpace: 'pre-line' }}>O usuário compromete-se a manter uma comunicação respeitosa e cortês com outros usuários da PetFinder360. Comentários ofensivos, difamatórios, discriminatórios ou qualquer forma de assédio não serão tolerados. A PetFinder360 reserva-se o direito de remover qualquer conteúdo inadequado e tomar medidas adequadas contra usuários que violem essas diretrizes.</p>
          </div>
					<div className={`${styles.terms} animeLeft`}>
						<h6>Coleta de Informações</h6>
            <p style={{ whiteSpace: 'pre-line' }}>A PetFinder360 coleta informações pessoais, como nome, endereço de e-mail e localização, para fornecer serviços personalizados aos usuários. Essas informações são coletadas de forma voluntária e somente são utilizadas para os fins especificados nesta política.</p>
          </div>
					<div className={`${styles.terms} animeLeft`}>
						<h6>Uso das Informações</h6>
            <p style={{ whiteSpace: 'pre-line' }}>As informações coletadas são utilizadas para melhorar a experiência do usuário, fornecer serviços solicitados, enviar notificações relevantes e melhorar a funcionalidade da aplicação. As informações pessoais não são compartilhadas com terceiros, exceto quando exigido por lei ou com o consentimento do usuário.</p>
          </div>
					<div className={`${styles.terms} animeLeft`}>
						<h6>Segurança das Informações</h6>
            <p style={{ whiteSpace: 'pre-line' }}>A PetFinder360 adota medidas de segurança adequadas para proteger as informações pessoais dos usuários contra acesso não autorizado, alteração ou divulgação. No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é totalmente seguro, e a PetFinder360 não pode garantir a segurança absoluta das informações.</p>
          </div>
					<div className={`${styles.terms} animeLeft`}>
						<h6>Alterações nos Termos e Política</h6>
            <p style={{ whiteSpace: 'pre-line' }}>A PetFinder360 reserva-se o direito de modificar estes termos e esta política de privacidade a qualquer momento. As alterações serão comunicadas através da aplicação ou por outros meios adequados. É recomendável revisar regularmente a política de privacidade para se manter atualizado sobre as práticas.</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
	);
}

export default TermsAndPolicy;