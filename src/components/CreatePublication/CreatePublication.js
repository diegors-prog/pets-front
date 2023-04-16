import React from 'react';
import styles from './CreatePublication.module.css';
import { useNavigate } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../UserContext';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { PUBLICATION_POST, FILE_POST } from '../../api';
import Error from '../Errors/Error';

const CreatePublication = () => {
  const title = useForm();
  const typeOfAnimal = useForm();
  const description = useForm();
  const [image, setImg] = React.useState({ preview: null, raw: null });
  const { data, error, loading, request, setError, setLoading } = useFetch();
  const { latitude, longitude } = React.useContext(UserContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/feed');
  }, [data, navigate]);

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const formData = new FormData();
      // formData.append('title', title.value);
      // formData.append('typeOfAnimal', typeOfAnimal.value);
      // formData.append('description', description.value);
      formData.append('image', image.raw);
      // formData.append('latitude', new Blob([latitude]));
      // formData.append('longitude', new Blob([longitude]));

      for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
      }

      const token = window.localStorage.getItem('token');
      const file = FILE_POST(formData, token);
      const url = await request(file.url, file.options);
      console.log(url);
      if (!url.response.ok) throw new Error(url.json.message);
      else {
        const create = PUBLICATION_POST({ title: title.value, typeOfAnimal: typeOfAnimal.value, description: description.value, image: url.json.data, latitude: latitude, longitude: longitude }, token);
        const newPublication = await request(create.url, create.options);
        navigate('/feed')
      }
    }
    catch (err) {
      setError('O tipo do arquivo deve ser um dos seguintes: image/jpeg, image/png, image/gif.');
    } finally {
      setLoading(false);
    }
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
