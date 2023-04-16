import React from 'react';
import styles from './CommentPublication.module.css';
import CommentForm from '../CommentForm/CommentForm';
import { style } from 'dom-helpers';

const CommentPublication = ({ id, commentss }) => {
  const [comments, setComments] = React.useState(() => commentss);
  /*const commentsSection = React.useRef(null);*/

  /*React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);*/
  return (
    <>
      {comments.length === 0 ? (
        <div>
          <p>Sem comentários</p>
        </div>
      ) : (
        <div /*ref={commentsSection}*/ className={`${styles.comments} animeLeft`}>
          {comments.map((item, index) => (
            <div className={styles.comment} key={index}>
              <div className={styles.profile}>
                <div className={styles.avatar}>
                  <span>{item.user.name.slice(0, 1).toUpperCase()}</span>
                </div>
                <b>{item.user.name.split(' ')[0]}</b>
              </div>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      )}
      <CommentForm id={id} setComments={setComments} commentss />
    </>
  );
};

export default CommentPublication;
