'use client';
import styles from '../lib/components/global/forms/forms.module.scss';
import { User } from '../lib/types/types';
import { FormEvent, useEffect, useState } from 'react';
import useFetch from '../lib/hooks/useFetch';
import { useRouter } from 'next/navigation';
import secureLocalStorage from 'react-secure-storage';

export default function Profile() {
	const router = useRouter();
	const token = secureLocalStorage.getItem('shareSpaceToken');

	if (!token) {
		router.push('/');
	}

	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchUserInfo = async () => {
			const { response, status } = await useFetch('/users/me/', 'GET', {
				Authorization: `Token ${token}`,
			});
			if (status == 200) {
				const userInfoResponse: User = await response.json();
				setEmail(userInfoResponse.email);
				setUserName(userInfoResponse.username);
				setFirstName(userInfoResponse.first_name);
				setLastName(userInfoResponse.last_name);
			}
		};
		fetchUserInfo();
	}, []);

	const updateUserInfo = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userCredentials = {
			email,
			first_name: firstName,
			last_name: lastName,
			username: userName,
		};

		const { response, status } = await useFetch(
			'/users/me/',
			'PATCH',
			{ 'Content-Type': 'application/json', Authorization: `Token ${token}` },
			userCredentials
		);

		if (status == 200) {
			setError('Dane zostały zaaktualizowane pomyślnie!');
		}
	};

	return (
		<div className={styles.container}>
			<h3>Twój profil</h3>
			<form className={styles.form} onSubmit={updateUserInfo}>
				<div className={styles.form_field}>
					<label htmlFor='firstName'>Imię</label>
					<div className={styles.input_container}>
						<input
							className={styles.input}
							type='text'
							name='firstName'
							id='firstName'
							autoComplete='off'
							defaultValue={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<div className={styles.input_focus}></div>
					</div>
				</div>
				<div className={styles.form_field}>
					<label htmlFor='lastName'>Nazwisko</label>
					<div className={styles.input_container}>
						<input
							className={styles.input}
							type='text'
							name='lastName'
							id='lastName'
							autoComplete='off'
							defaultValue={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
						<div className={styles.input_focus}></div>
					</div>
				</div>
				<div className={styles.form_field}>
					<label htmlFor='userName'>Nazwa użytkownika</label>
					<div className={styles.input_container}>
						<input
							className={styles.input}
							type='text'
							name='userName'
							id='userName'
							autoComplete='off'
							defaultValue={userName}
							minLength={4}
							required
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
							defaultValue={email}
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div className={styles.input_focus}></div>
					</div>
				</div>

				<button data-page='profile'></button>

				<p className={styles.error}>{error}</p>
			</form>
		</div>
	);
}
