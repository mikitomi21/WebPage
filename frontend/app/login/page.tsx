'use client';
import Link from 'next/link';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import useUserContext from '../lib/hooks/useUserContext';
import useFetch from '../lib/hooks/useFetch';
import useLocalStorage from '../lib/hooks/useLocalStorage';

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { user, setUser } = useUserContext();
	const [value, setValue] = useLocalStorage('shareSpaceToken', '');

	const signIn = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userCredentials = { email, password };

		const { response, status } = await useFetch(
			'/auth/token/login',
			'POST',
			{ 'Content-Type': 'application/json' },
			userCredentials
		);

		if (status === 200) {
			const tokenResponse = await response.json();
			setUserInfo();
			setValue(tokenResponse.auth_token);
			router.push('/');
		} else {
			setError('Zostały wprowadzone złe dane!');
		}
	};

	const setUserInfo = async () => {
		const { response, status } = await useFetch('/users/me/', 'GET', {
			Authorization: `Token ${value}`,
		});
		if (status == 200) {
			const userInfoResponse = await response.json();
			console.log(userInfoResponse);
			setUser(userInfoResponse);
		}
	};

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
				<p className={styles.error}>{error}</p>
			</form>
		</section>
	);
}
