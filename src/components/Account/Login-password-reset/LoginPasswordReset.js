import React from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../../Hooks/useForm';
import useFetch from '../../../Hooks/useFetch';
import Button from '../../Forms/Button';
import Input from '../../Forms/Input';
import { PASSWORD_RESET } from '../../../api';
import Error from '../../Errors/Error';
import { Toaster, toast } from 'react-hot-toast';

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const password = useForm();
  const { loading, error, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    if (key) setKey(key);
  }, []);

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
    if (!password.validate()) return handleLoading();
      
    const { url, options } = PASSWORD_RESET({
      key,
      password: password.value,
    });
    const { response } = await request(url, options);
    if (response.ok) navigate('/login');
  }

  return (
    <section>
      <h1 className="title">Resete a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error} />
      <Toaster />
    </section>
  );
};

export default LoginPasswordReset;
