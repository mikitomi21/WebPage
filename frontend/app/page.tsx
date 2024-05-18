'use client';
import { useRouter } from 'next/navigation';
import PostsList from './lib/components/posts/PostsList';
import secureLocalStorage from 'react-secure-storage';
import usePosts from './lib/hooks/usePosts';
import useUserName from './lib/hooks/useUserName';
import styles from './page.module.scss';
import CreatePost from './lib/components/posts/CreatePost';
export default function Home() {
	const token = secureLocalStorage.getItem('shareSpaceToken') as string;
	const router = useRouter();

	if (!token) {
		router.push('/login');
	}
	const { posts, refreshPosts } = usePosts(token);
	const { userName } = useUserName(token);
	if (!posts || !userName)
		return (
			<div className='loader' style={{ color: 'white' }}>
				Ładowanie...
			</div>
		);

	return (
		<main className={styles.main}>
			<h2 className={styles.main_hello}>Witaj, {userName}</h2>
			<CreatePost
				userName={userName}
				token={token}
				refreshPosts={refreshPosts}
			/>
			<PostsList posts={posts} userName={userName} />
		</main>
	);
}
