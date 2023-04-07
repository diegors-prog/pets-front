import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../../Hooks/useForm';
import Button from '../../Forms/Button';
import Input from '../../Forms/Input';
import { UserContext } from '../../../UserContext';
import Error from '../../Errors/Error';
import styles from './Login-form.module.css';
import stylesBtn from '../../Forms/Button.module.css';

const LoginForm = () => {
  const email = useForm('email');
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);
  async function handleSubmit(event) {
    event.preventDefault();

    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Email" type="text" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error && 'Dados incorretos.'} />
      </form>
      <Link className={styles.lost} to="/login/lost">
        Perdeu a Senha?
      </Link>
      <div className={styles.registration}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/login/create">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
