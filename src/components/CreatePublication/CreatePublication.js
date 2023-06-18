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
import { storage } from '../../firebaseinit'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

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

  function uploadImage(image) {
    return new Promise((resolve, reject) => {
      const path = `${v4() + image.name}`;
      const imageRef = ref(storage, `images/${path}`);
      const uploadTask = uploadBytesResumable(imageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progresso = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progresso);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(url => {
              console.log("URL atual:" + url);
              resolve(url);
            })
            .catch(error => {
              console.log(error);
              reject(error);
            });
        }
      );
    });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      if (!formValid) return handleLoading();

      const token = window.localStorage.getItem('token');
      const uploadedUrl = await uploadImage(image.raw);
      console.log(uploadedUrl);
      if (uploadedUrl) {
        const create = PUBLICATION_POST({ title: title.value, typeOfAnimal: typeOfAnimal.value, description: description.value, image: uploadedUrl, latitude: latitude, longitude: longitude }, token);
        const newPublication = await request(create.url, create.options);
      }

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
