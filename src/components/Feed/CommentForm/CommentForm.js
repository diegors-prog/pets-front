import React from 'react';
import styles from './CommentForm.module.css';
import useFetch from '../../../Hooks/useFetch';
import { COMMENT_POST } from '../../../api';
import Error from '../../Errors/Error';
import Button from '../../Forms/Button';
import { Toaster, toast } from 'react-hot-toast';

const CommentForm = ({ id, setComments}) => {
  const [comment, setComment] = React.useState('');
  const [publicationId, setPublicatiuonId] = React.useState(null);
  const [formValid, setFormValid] = React.useState(false);
  const { request, error } = useFetch();

  const handleLoading = () => {
    toast.loading('Campo de comentário vazio', {
      duration: 3000,
      style: {
        background: '#FED914',
        color: '#000000',
        zIndex: 1000
      },
    });
  };

  function validateForm() {
		if (comment) {
		  setFormValid(true);
		} else {
		  setFormValid(false);
		}
	}

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formValid || comment === '') return handleLoading();

    const { url, options } = COMMENT_POST({ content: comment, publicationId: publicationId });
    const { response, json } = await request(url, options);
    console.log({ response: response, json: json.data});
    if (response.ok) {
      setComment('');
      console.log();
      setComments((comments) => [...comments, json.data]);
      setFormValid(false);
    }
  }

  return (
    <div className={styles.formBody}>
      <form className={styles.formComments} onSubmit={handleSubmit}>
        <textarea
          name="comment"
          id="comment"
          placeholder="Comente..."
          value={comment}
          onChange={({ target }) => {
            setComment(target.value);
            setPublicatiuonId(id);
            validateForm();
          }}
        />
        
        <Button disabled={!formValid}>Enviar</Button>
        <Error error={error} />
      </form>
      <Toaster />
    </div>
  );
};

export default CommentForm;
