import Link from 'next/link';
import styles from '../login/page.module.scss';

export default function Registration() {
	return (
		<section className={styles.container}>
			<h3>Zarejestruj się</h3>
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
				<div className={styles.form_field}>
					<label htmlFor='password'>Powtórz hasło</label>
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
				<button data-page='registration'></button>
				<div className={styles.swap_page}>
					<p>Masz już konto?</p>
					<Link href='/login'>Zaloguj się</Link>
				</div>
			</form>
		</section>
	);
}
