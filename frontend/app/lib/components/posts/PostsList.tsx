import styles from './post.module.scss';
import { Post } from '../../types/types';
import SinglePost from './SinglePost';
type PostsListProps = {
	posts: Post[];
	refreshPosts: () => void;
};
export default function PostsList({
	posts,
	refreshPosts,
}: PostsListProps) {
	return (
		<div className={styles.posts}>
			{posts.map((post, index) => {
				return (
					<SinglePost
						post={post}
						key={index}
						refreshPosts= {refreshPosts}
					/>
				);
			})}
		</div>
	);
}
