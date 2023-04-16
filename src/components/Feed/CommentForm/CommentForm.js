import React from 'react';
import styles from './CommentForm.module.css';
import useFetch from '../../../Hooks/useFetch';
import { COMMENT_POST } from '../../../api';
import Error from '../../Errors/Error';

const CommentForm = ({ id, setComments }) => {
  const [comment, setComment] = React.useState('');
  const [publicationId, setPublicatiuonId] = React.useState(null);
  const { request, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(publicationId);
    const { url, options } = COMMENT_POST({ content: comment, publicationId: publicationId });
    const { response, json } = await request(url, options);
    console.log({ response: response, json: json.data});
    if (response.ok) {
      setComment('');
      console.log();
      setComments((comments) => [...comments, json.data]);
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
          }}
        />
        <button>Enviar</button>
        <Error error={error} />
      </form>
    </div>
  );
};

export default CommentForm;
