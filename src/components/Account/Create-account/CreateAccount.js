import React from 'react';
import { USER_POST } from '../../../api';
import useFetch from '../../../Hooks/useFetch';
import Error from '../../Errors/Error';
import useForm from '../../../Hooks/useForm';
import { UserContext } from '../../../UserContext';
import Button from '../../Forms/Button';
import Input from '../../Forms/Input';

const CreateAccount = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm();

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      email: email.value,
      password: password.value,
      name: username.value,
    });
    const { response } = await request(url, options);
    if (response.ok) userLogin(email.value, password.value);
  }

  return (
    <section style={{ marginTop: '2rem' }} className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default CreateAccount;
