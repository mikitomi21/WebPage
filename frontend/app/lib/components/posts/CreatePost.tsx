'use client';

import styles from './newPost.module.scss';
import { useNewPost } from '../../hooks/useNewPost';
import useGlobalContext from '../../hooks/useGlobalContext';

type CreatePostProps = {
	refreshPosts: () => void;
};

export default function CreatePost({
	refreshPosts,
}: CreatePostProps) {
	const { message, handleSubmit } = useNewPost({ refreshPosts });
	const {userName, token} = useGlobalContext()

	return (
		<section className={styles.create_post}>
			<h3>Co chodzi Ci po głowie?</h3>
			<form onSubmit={handleSubmit}>
				<input type='hidden' name='token' value={token} />
				<input type='hidden' name='userName' value={userName} />
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
				<p className={styles.message}>{message}</p>
			</form>
		</section>
	);
}
