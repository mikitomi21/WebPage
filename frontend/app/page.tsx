'use client';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import useTokenContext from './lib/hooks/useTokenContext';
import PostsList from './lib/components/posts/PostsList';
import { Post } from './lib/types/types';
import useFetch from './lib/hooks/useFetch';
import secureLocalStorage from 'react-secure-storage';
import { User } from './lib/types/types';
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
	const { posts } = usePosts(token);
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
			<CreatePost />
			<PostsList posts={posts} userName={userName} />
		</main>
	);
}
