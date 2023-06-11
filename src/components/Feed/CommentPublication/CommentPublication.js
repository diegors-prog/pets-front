import React from 'react';
import styles from './CommentPublication.module.css';
import CommentForm from '../CommentForm/CommentForm';
import { style } from 'dom-helpers';

const CommentPublication = ({ id, commentss, onNewComment }) => {
  const [comments, setComments] = React.useState(() => commentss);
  const commentsContainerRef = React.useRef(null);
  console.log(id);

  /*React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);*/

  React.useEffect(() => {
    addScrollToLastComment();
    onNewComment(comments); // Atualiza o estado comments com o valor de commentss sempre que ele mudar
  }, [comments, onNewComment]);

  React.useEffect(() => {
    addScrollToLastComment();
  }, []);

  function addScrollToLastComment() {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    }
  }

  function formatarData(data) {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear().toString();
    const horas = dataObj.getHours().toString().padStart(2, '0');
    const minutos = dataObj.getMinutes().toString().padStart(2, '0');
    
    return `${dia}/${mes}/${ano} as ${horas}h${minutos}`;
  }

  // function addScrollToLastComment() {
  //   const elementosDiv = document.querySelectorAll('#comment');
  //   console.log(elementosDiv);
  //   if (elementosDiv.length > 0) {
  //     const lastIndex = elementosDiv.length - 1;
  //     const lastElement = elementosDiv[lastIndex];
  //     lastElement.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }

  return (
    <>
      {comments.length === 0 ? (
        <div>
          <p>Sem comentários</p>
        </div>
      ) : (
        <div ref={commentsContainerRef} className={`${styles.comments} animeLeft`}>
          {comments.map((item, index) => (
            <div className={styles.comment} id='comment' key={index}>
              <div className={styles.profile}>
                <div className={styles.avatar}>
                  <span>{item.user.name.slice(0, 1).toUpperCase()}</span>
                </div>
                <b>{item.user.name.split(' ')[0]}</b>
                <span className={styles.creationDate}>{formatarData(item.creationDate)}</span>
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
