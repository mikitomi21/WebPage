import styles from './newPost.module.scss';
export default function CreatePost() {
	return (
		<section className={styles.create_post}>
			<h3>Co chodzi Ci po głowie?</h3>
			<form action=''>
				<div className={styles.input_container}>
					<label htmlFor='postTitle'>Tytuł:</label>
					<input
						type='text'
						name='postTitle'
						id='postTitle'
						autoComplete='off'
						required
					/>
				</div>
				<textarea
					className={styles.textarea}
					name='postText'
					id='postText'
					required
				></textarea>
				<button type='submit'>Stwórz nowy post</button>
			</form>
		</section>
	);
}
