import Link from 'next/link';
import styles from './page.module.scss';

export default function Login() {
	return (
		<section className={styles.container}>
			<h3>Zaloguj się</h3>
			<form className={styles.form}>
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
						/>
						<div className={styles.input_focus}></div>
					</div>
				</div>
				<button data-page='login'></button>
				<div className={styles.swap_page}>
					<p>Nie masz konta?</p>
					<Link href='/rejestracja'>Zarejestruj się</Link>
				</div>
			</form>
		</section>
	);
}
