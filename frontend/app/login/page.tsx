import styles from './page.module.scss';

export default function Login() {
	return (
		<section className={styles.login}>
			<h3>Zaloguj się</h3>
			<form className={styles.form}>
				<div className={styles.form_separator}>
					<label htmlFor='userName'>Nazwa użytkownika</label>
					<input type='text' name='userName' id='userName' />
				</div>
				<div className={styles.form_separator}>
					<label htmlFor='password'>Hasło</label>
					<input type='password' name='password' id='password' />
				</div>
				<button>Zaloguj</button>
			</form>
		</section>
	);
}
