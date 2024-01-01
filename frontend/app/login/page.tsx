'use client';
import Link from 'next/link';
import styles from './page.module.scss';
// import signIn from '../lib/actions';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const signIn = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userCredentials = { email, password };

		const authFetch = await fetch(
			'http://localhost:8000/api/auth/token/login',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userCredentials),
			}
		);

		if (authFetch.status === 200) {
			router.push('/');
		} else {
			setError('Zostały wprowadzone złe dane!');
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
