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
						/>
						<div className={styles.input_focus}></div>
					</div>
				</div>
				<button></button>
				<div className={styles.sign_up}>
					<p>Nie masz konta?</p>
					<Link href='/register'>Zarejestruj się</Link>
				</div>
			</form>
		</section>
	);
}
