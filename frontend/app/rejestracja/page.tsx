'use client';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import styles from '../lib/components/global/forms/forms.module.scss';
import useFetch from '../lib/hooks/useFetch';
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/navigation';
import useRegistration from '../lib/hooks/useRegistration';
import useLogin from '../lib/hooks/useLogin';
import useLoginContext from '../lib/hooks/useLoginContext';
export default function Registration() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [userName, setUserName] = useState('');
	const [message, setMessage] = useState('');
	const { isLoggedIn, setIsLoggedIn } = useLoginContext();
	const token = secureLocalStorage.getItem('shareSpaceToken');

	const register = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!(password === confirmPassword)) {
			setMessage('Podane hasła różnią się od siebie!');
			return;
		}
		const userCredentials = {
			email,
			username: userName,
			password,
		};
		const { signedUp, registrationError } = await useRegistration(
			userCredentials
		);
		if (signedUp) {
			setMessage(registrationError);
			const { loggedIn, loginError } = await useLogin({ email, password });
			if (loggedIn) {
				setIsLoggedIn(true);
				router.push('/');
			} else {
				setMessage(loginError);
			}
		} else {
			setMessage(registrationError);
		}
	};

	if (token) {
		router.push('/');
	}

	return (
		<section className={styles.container}>
			<h3>Zarejestruj się</h3>
			<form className={styles.form} onSubmit={register}>
				<div className={styles.form_field}>
					<label htmlFor='userName'>Nazwa użytkownika</label>
					<div className={styles.input_container}>
						<input
							className={styles.input}
							type='text'
							name='userName'
							id='userName'
							autoComplete='off'
							minLength={4}
							required
							autoFocus
							onChange={(e) => setUserName(e.target.value)}
						/>
						<div className={styles.input_focus}></div>
					</div>
				</div>
				<div className={styles.form_field}>
					<label htmlFor='email'>Email</label>
					<div className={styles.input_container}>
						<input
							className={styles.input}
							type='email'
							name='email'
							id='email'
							autoComplete='off'
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div className={styles.input_focus}></div>
					</div>
				</div>
				<div className={styles.form_field}>
					<label htmlFor='password'>Hasło</label>
					<div className={styles.input_container}>
						<input
							className={styles.input}
							type='password'
							name='password'
							id='password'
							minLength={10}
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div className={styles.input_focus}></div>
					</div>
				</div>
				<div className={styles.form_field}>
					<label htmlFor='password'>Powtórz hasło</label>
					<div className={styles.input_container}>
						<input
							className={styles.input}
							type='password'
							name='password'
							id='password'
							minLength={10}
							required
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<div className={styles.input_focus}></div>
					</div>
				</div>
				<button data-page='registration'></button>
				<div className={styles.swap_page}>
					<p>Masz już konto?</p>
					<Link href='/login'>Zaloguj się</Link>
				</div>
				<p className={styles.error}>{message}</p>
			</form>
		</section>
	);
}
