import React from 'react';
import styles from './CreatePublication.module.css';
import { useNavigate } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { PUBLICATION_POST } from '../../api';
import Error from '../Errors/Error';

const CreatePublication = () => {
  const title = useForm();
  const typeOfAnimal = useForm();
  const description = useForm();
  const [image, setImg] = React.useState({ preview: null, raw: null });
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/');
  }, [data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('typeOfAnimal', typeOfAnimal.value);
    formData.append('description', description.value);
    formData.append('image', image.raw);
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    const token = window.localStorage.getItem('token');
    const { url, options } = PUBLICATION_POST(formData, token);
    request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.createPublication} animeLeft container`}>
      <form onSubmit={handleSubmit}>
        <h3 className="title">Poste a fuga de seu pet</h3>
        <Input label="Nome" type="text" name="title" {...title} />
        <Input label="Tipo" type="text" name="typeOfAnimal" {...typeOfAnimal} />
        <Input label="Decrição" type="text" name="description" {...description} />
        <input
          className={styles.file}
          type="file"
          name="image"
          id="image"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {image.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${image.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default CreatePublication;
