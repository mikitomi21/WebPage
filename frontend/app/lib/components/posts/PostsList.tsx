import styles from './post.module.scss';
import { Post } from '../../types/types';
import SinglePost from './SinglePost';
type PostsListProps = {
	posts: Post[];
	userName: string;
	token: string;
	refreshPosts: () => void;
};
export default function PostsList({
	posts,
	userName,
	token,
	refreshPosts,
}: PostsListProps) {
	return (
		<div className={styles.posts}>
			{posts.map((post, index) => {
				return (
					<SinglePost
						post={post}
						key={index}
						userName={userName}
						token={token}
						refreshPosts={refreshPosts}
					/>
				);
			})}
		</div>
	);
}
