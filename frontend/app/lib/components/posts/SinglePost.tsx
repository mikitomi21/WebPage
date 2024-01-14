import { Post } from '../../types/types';
import styles from './post.module.scss';
type PostProps = {
	post: Post;
};
export default function SinglePost({ post }: PostProps) {
	return (
		<div className={styles.post}>
			<div className={styles.user}>
				<div className={styles.user_avatar}></div>
				<h3 className={styles.user_name}>
					{post.author.first_name} {post.author.last_name}
				</h3>
			</div>
			<h2 className={styles.post_title}>"{post.title}"</h2>
			<p className={styles.post_text}>{post.text}</p>
		</div>
	);
}
