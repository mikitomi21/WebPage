import Image from 'next/image';
import { Comment } from '../../types/types';
import { FaHeart } from 'react-icons/fa';
import styles from './comment.module.scss';
type CommentProps = {
	comment: Comment;
};
export default function Comment({ comment }: CommentProps) {
	return (
		<div className={styles.comment}>
			<div className={styles.comment_user}>
				<Image
					className={styles.comment_avatar}
					src={comment.author.avatar}
					alt='Awatar użytkownika komentującego'
					width={30}
					height={30}
				/>
				<div className={styles.comment_username}>@{comment.author.username}</div>
			</div>
			<div className={styles.comment_text}>{comment.text}</div>
			<div className={styles.comment_likes}>
				{comment.likes.length} <FaHeart />
			</div>
		</div>
	);
}
