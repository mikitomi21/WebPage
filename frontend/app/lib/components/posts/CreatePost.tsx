'use client';
import { useFormState } from 'react-dom';
import styles from './newPost.module.scss';
import { createNewPost } from '../../actions/actions';
type CreatePostProps = {
	userName: string;
	token: string;
};
const initialState = { message: '' };
export default function CreatePost({ userName, token }: CreatePostProps) {
	const [state, dispatch] = useFormState(createNewPost, initialState);
	return (
		<section className={styles.create_post}>
			<h3>Co chodzi Ci po głowie?</h3>
			<form action={dispatch}>
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
				<p className={styles.message}>{state?.message}</p>
			</form>
		</section>
	);
}
