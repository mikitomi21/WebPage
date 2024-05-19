'use client';
import { Post } from '../../types/types';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { FaComments } from 'react-icons/fa';
import Comment from './Comment';
import styles from './post.module.scss';
import { useNewComment } from '../../hooks/useNewComment';
import useGlobalContext from '../../hooks/useGlobalContext';

type PostProps = {
	post: Post;
	refreshPosts: () => void;
};
export default function SinglePost({ post, refreshPosts }: PostProps) {
	const { message, handleSubmit } = useNewComment({ refreshPosts });
	const { userName, token } = useGlobalContext();
	return (
		<div className={styles.post}>
			<div className={styles.user}>
				<Image
					className={styles.user_avatar}
					src={post.author.avatar}
					alt='Awatar użytkownika'
					width={50}
					height={50}
				/>
				<h3 className={styles.user_name}>@{post.author.username}</h3>
			</div>
			<h2 className={styles.post_title}>{post.title}</h2>
			<p className={styles.post_text}>{post.text}</p>
			<div className={styles.post_stats}>
				<div className={styles.post_stats_likes}>
					{post.likes.length} <FaHeart />
				</div>
				<div className={styles.post_stats_comments}>
					{post.comments.length} <FaComments />
				</div>
			</div>
			<form onSubmit={handleSubmit} className={styles.post_create_comment}>
				<input type='hidden' name='token' value={token} />
				<input type='hidden' name='userName' value={userName} />
				<input type='hidden' name='newCommentId' value={post.id} />
				<div className={styles.textarea_container}>
					<textarea
						name={`newComment_${post.id}`}
						id={`newComment_${post.id}`}
					></textarea>
				</div>
				<button type='submit'>Skomentuj</button>
				<p className={styles.message}>{message}</p>
			</form>
			<div className={styles.post_comments}>
				{post.comments.map((comment, index) => {
					return <Comment comment={comment} key={index} />;
				})}
			</div>
		</div>
	);
}
