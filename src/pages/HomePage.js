import React from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import useForm from '../Hooks/useForm';
import useFetch from '../Hooks/useFetch';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import Input from '../components/Forms/Input';
import Button from '../components/Forms/Button';
import Error from '../components/Errors/Error';
import { CONTACT_MESSAGE } from '../api';
import { ReactComponent as HomeIlustration } from '../Assets/undraw_my_current_location_re_whmt.svg';
import { ReactComponent as HomeIlustration2 } from '../Assets/undraw_my_location_re_r52x.svg';
import { ReactComponent as HomeIlustration3 } from '../Assets/undraw_mobile_feed_re_72ta.svg';
import { ReactComponent as HomeIlustration4 } from '../Assets/undraw_message_sent_re_q2kl.svg';
import { ReactComponent as HomeIlustration5 } from '../Assets/undraw_mailbox_re_dvds.svg';
import { ReactComponent as HomeIlustration6 } from '../Assets/origamid-lobo.svg';
import balta from '../Assets/balta.png';
import desenvolvedorIO from '../Assets/desenvolvedor-io.jpg';
import linkedin from '../Assets/linkedin.png';
import { Toaster, toast } from 'react-hot-toast';



const HomePage = () => {
	const email = useForm('email');
  	const assunto = useForm();
	const [corpoEmail, setCorpoEmail] = React.useState('');
	const [formValid, setFormValid] = React.useState(false);
	const { data, request, error } = useFetch();

	const navigate = useNavigate();
	const { login, loading, latitude, longitude } = React.useContext(UserContext)

	function validateForm() {
		if (email.validate() && assunto.validate() && corpoEmail !== '') {
		  setFormValid(true);
		} else {
		  setFormValid(false);
		}
	}

	function editMessage(email, corpoEmail) {
		return `De: ${email.value}\n\n${corpoEmail}`;
	}

	const handleLoading = () => {
		toast.loading('Campo mensagem vazio', {
		  duration: 3000,
		  style: {
			background: '#FED914',
			color: '#000000',
			zIndex: 1000
		  },
		});
	};

	React.useEffect(() => {
		if (login && latitude && longitude) navigate('/feed');
		else if (login && !latitude && !longitude) navigate('/feed/location');
		else return null;
	  }, [login, navigate, latitude, longitude]);

	async function handleSubmit(event) {
		event.preventDefault();
		if (!formValid && corpoEmail === '') return handleLoading();
		
		const { url, options } = CONTACT_MESSAGE({ subject: assunto.value, emailBody: editMessage(email, corpoEmail) });
    	const { response, json } = await request(url, options);
		if (!response.ok) throw new Error(json.message);
		else {
			email.setValue('');
			assunto.setValue('');
			setCorpoEmail('');
			setFormValid(false);
		}
	}
	
	return (
		<div className={`${styles.homePage} container animeLeft`}>
			<section className={`${styles.homePageContainer}`}>
				<HomeIlustration3 className={`${styles.svg}`}/>
				<div className={styles.homeContent}>
					<h1 className='title'>Ache seu Pet com o PetFinder360!</h1>
					<p>Publique uma postagem sobre seu animal de estimação perdido para obter ajuda de outras pessoas na busca por ele</p>
					<Link className={styles.button} to="/login">
						Login / Criar
					</Link>
				</div>
			</section>
			<section className={`${styles.homePageContainer}`} id={`${styles.howItWork}`}>
				<div>
					<h2 className='title2'>Como funciona</h2>
					<p>Ao fazer login, você terá acesso a um feed personalizado com base em sua localização, filtrando automaticamente postagens de animais de estimação perdidos em um raio de 10 km. Caso seu pet se perca, você pode criar uma publicação que será exibida para todas as pessoas vinculadas à aplicação dentro desse raio, ampliando as chances de encontrar o seu animalzinho querido.</p>
				</div>
				<HomeIlustration className={`${styles.svg}`}/>
			</section>
			<section className={`${styles.homePageContainer}`} id={`${styles.howItWork}`}>
				<div className={styles.homeContent}>
					<h2 className='title2'>Contato</h2>
					<p>Envie-nos uma mensagem para sugestões, melhorias ou em caso de dúvidas.</p>
					<HomeIlustration4 className={`${styles.svg}`}/>
				</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Input label="Email" type="text" name="email" {...email} />
					<Input label="Assunto" type="text" name="assunto" {...assunto} />
					<div>
						<label className={styles.label}>Mensagem</label>
						<textarea
							name="corpoEmail"
							id="corpoEmail"
							value={corpoEmail}
							onChange={({ target }) => {
								setCorpoEmail(target.value);
								validateForm();
							}}
						/>
					</div>
					{loading ? (
					<Button disabled>Carregando...</Button>
					) : (
					<Button disabled={!formValid}>Enviar</Button>
					)}
					<p>{data && data}</p>
					<Error error={error && 'Dados incorretos.'} />
				</form>
			</section>
			<footer className={`${styles.homePageContainer}`} id={`${styles.howItWork}`}>
				<div>
					<h4>Agradecimentos</h4>
					<ul>
						<li><img className={`${styles.balta}`} src={linkedin} alt='imagem html' /><a href='https://www.linkedin.com/in/cassiocosta/' target='_blank' rel="noreferrer">Cássio Huggentobler de Costa</a></li>
						<li><img className={`${styles.balta}`} src={linkedin} alt='imagem html' /><a href='https://www.linkedin.com/in/vinimagnus/' target='_blank' rel="noreferrer">Vínicios Magnus</a></li>
						<li><img className={`${styles.balta}`} src={linkedin} alt='imagem html' /><a href='https://www.linkedin.com/in/ramonsl/' target='_blank' rel="noreferrer">Ramon Lummertz</a></li>
						<li><img className={`${styles.balta}`} src={linkedin} alt='imagem html' /><a href='https://www.linkedin.com/in/arthur-rocha-santos/' target='_blank' rel="noreferrer">Arthur Rocha</a></li>
						<li><img className={`${styles.balta}`} src={linkedin} alt='imagem html' /><a href='https://www.linkedin.com/in/mateusp23/' target='_blank' rel="noreferrer">Mateus Paulart</a></li>
						<li><img className={`${styles.balta}`} src={linkedin} alt='imagem html' /><a href='https://www.linkedin.com/in/douglas-serena-44ab721a0/' target='_blank' rel="noreferrer">Douglas Serena</a></li>
						<li><img className={`${styles.balta}`} src={linkedin} alt='imagem html' /><a href='https://www.linkedin.com/in/otavioborgsm/' target='_blank' rel="noreferrer">Otávio Borges</a></li>
						<li><img className={`${styles.balta}`} src={linkedin} alt='imagem html' /><a href='https://www.linkedin.com/in/gean-zanella-ab95561a3/' target='_blank' rel="noreferrer">Gean Zanella</a></li>
					</ul>
				</div>
				<div>
					<h4>Plataformas</h4>
					<ul>
						<li><HomeIlustration6 /><a href='https://www.origamid.com/' target='_blank' rel="noreferrer">Origamid</a></li>
						<li><img className={`${styles.balta}`} src={balta} alt='imagem html' /><a href='https://balta.io/' target='_blank' rel="noreferrer">Balta</a></li>
						<li><img className={`${styles.balta}`} src={desenvolvedorIO} alt='imagem html' /><a href='https://desenvolvedor.io/inicio' target='_blank' rel="noreferrer">Desenvolvedor IO</a></li>
						<li><a href='https://www.alura.com.br/?utm_source=bing&utm_medium=cpc&utm_campaign=institucional-brand&msclkid=73715e8cdfa11fe8e8ab3ab4120f9880' target='_blank' rel="noreferrer">Alura</a></li>
					</ul>
				</div>
			</footer>
			<Toaster />
		</div>
	);
}

export default HomePage;