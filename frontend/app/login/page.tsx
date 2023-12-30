import Link from 'next/link';
import styles from './page.module.scss';
import signIn from '../lib/actions';

export default function Login() {
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
