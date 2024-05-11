'use client';
import Link from 'next/link';
import styles from '../lib/components/global/forms/forms.module.scss';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import useLoginContext from '../lib/hooks/useLoginContext';
import secureLocalStorage from 'react-secure-storage';
import useLogin from '../lib/hooks/useLogin';

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const { isLoggedIn, setIsLoggedIn } = useLoginContext();
	const token = secureLocalStorage.getItem('shareSpaceToken');

	const signIn = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userCredentials = { email, password };
		const { loggedIn, loginError } = await useLogin(userCredentials);
		if (loggedIn) {
			setIsLoggedIn(true);
			router.push('/');
		} else {
			setMessage(loginError);
		}
	};

	if (token) {
		router.push('/');
	}
	return (
		<section className={styles.container}>
			<h3>Zaloguj się</h3>
			<form className={styles.form} onSubmit={signIn}>
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
							autoFocus
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
							minLength={6}
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div className={styles.input_focus}></div>
					</div>
				</div>
				<button data-page='login'></button>
				<div className={styles.swap_page}>
					<p>Nie masz konta?</p>
					<Link href='/rejestracja'>Zarejestruj się</Link>
				</div>
				<p className={styles.error}>{message}</p>
			</form>
		</section>
	);
}
