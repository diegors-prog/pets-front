import React from 'react';
import styles from './CreatePublication.module.css';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../UserContext';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { PUBLICATION_POST, FILE_POST } from '../../api';
import Error from '../Errors/Error';

const CreatePublication = () => {
  const isMounted = React.useRef(true); // Criar uma ref para controlar a montagem do componente
  const title = useForm();
  const typeOfAnimal = useForm();
  const description = useForm();
  const [image, setImg] = React.useState({ preview: null, raw: null });
  const [formValid, setFormValid] = React.useState(false);
  const { data, error, loading, request, setError, setLoading } = useFetch();
  const { latitude, longitude } = React.useContext(UserContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    return () => {
      isMounted.current = false; // Atualizar o valor da ref para false quando o componente for desmontado
    };
  }, []);

  function validateForm() {
		if (title.validate() && typeOfAnimal.validate() && description.validate()) {
		  setFormValid(true);
		} else {
		  setFormValid(false);
		}
	}

  const handleSuccess = () => {
    toast.success('Publicação criada com sucesso', {
      duration: 3000,
      style: {
        background: 'green',
        color: '#fff',
        zIndex: 1000
      },
    });
  };

  const handleLoading = () => {
		toast.loading('Formulário inválido', {
		  duration: 3000,
		  style: {
			background: '#FED914',
			color: '#000000',
			zIndex: 1000
		  },
		});
	};

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      console.log(image);
      if (!formValid) return handleLoading();
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
      if (!url.response.ok) throw new Error(url.json.message);
      const create = PUBLICATION_POST({ title: title.value, typeOfAnimal: typeOfAnimal.value, description: description.value, image: url.json.data, latitude: latitude, longitude: longitude }, token);
      const newPublication = await request(create.url, create.options);

      if (isMounted.current) {
        setImg({ preview: null, raw: null });
      }
      handleSuccess();
      setTimeout(() => {
        navigate('/feed');
      }, 3000);
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
    validateForm();
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
          <Button disabled={!formValid}>Enviar</Button>
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
      <Toaster />
    </section>
  );
};

export default CreatePublication;
