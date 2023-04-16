import React from 'react';
import useForm from '../../../Hooks/useForm';
import useFetch from '../../../Hooks/useFetch';
import Button from '../../Forms/Button';
import Input from '../../Forms/Input';
import { PASSWORD_LOST } from '../../../api';
import Error from '../../Errors/Error';

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    if (login.validate) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('lost', 'reset'),
      });
      const { json } = await request(url, options);
      console.log(json);
    }
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
    </section>
  );
};

export default LoginPasswordLost;
