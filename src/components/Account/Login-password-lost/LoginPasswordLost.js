import React from 'react';
import useForm from '../../../Hooks/useForm';
import useFetch from '../../../Hooks/useFetch';
import Button from '../../Forms/Button';
import Input from '../../Forms/Input';
import { PASSWORD_LOST } from '../../../api';
import Error from '../../Errors/Error';
import { Toaster, toast } from 'react-hot-toast';

const LoginPasswordLost = () => {
  const login = useForm('email');
  const { data, loading, error, request } = useFetch();

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
    event.preventDefault();
    if (!login.validate()) return handleLoading();

    const { url, options } = PASSWORD_LOST({
      login: login.value,
      url: window.location.href.replace('lost', 'reset'),
    });
    const { json } = await request(url, options);
    console.log(json);
  }

  return (
    <section className='animeLeft'>
      <h1 className="title">Perdeu a senha?</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Email" type="text" name="login" {...login} />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar Email</Button>
        )}
      </form>
      <p>{data}</p>
      <Error error={error} />
      <Toaster />
    </section>
  );
};

export default LoginPasswordLost;
