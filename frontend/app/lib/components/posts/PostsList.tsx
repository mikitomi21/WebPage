import styles from './post.module.scss';
import { Post } from '../../types/types';
import SinglePost from './SinglePost';
type PostsListProps = {
	posts: Post[];
	userName: string;
};
export default function PostsList({ posts, userName }: PostsListProps) {
	return (
		<div className={styles.posts}>
			{posts.map((post, index) => {
				return <SinglePost post={post} key={index} />;
			})}
		</div>
	);
}
