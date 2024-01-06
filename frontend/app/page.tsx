'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PostsList from './lib/components/posts/PostsList';
import { Post } from './lib/types/types';
import useFetch from './lib/hooks/useFetch';
import useLocalStorage from './lib/hooks/useLocalStorage';

export default function Home() {
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);
	const router = useRouter();
	const [tokenLS, setTokenLS] = useLocalStorage<string>('shareSpaceToken');

	if (!tokenLS) {
		router.push('/login');
	}

	useEffect(() => {
		const getPosts = async () => {
			const { response, status } = await useFetch('/posts/', 'GET', {
				Authorization: `Token ${tokenLS}`,
			});
			const res = response.json();
			res.then((postsFromDB) => setPosts(postsFromDB));
		};
		getPosts();
	});

	if (!posts)
		return (
			<div className='loader' style={{ color: 'white' }}>
				Ładowanie...
			</div>
		);

	return <PostsList posts={posts} />;
}
