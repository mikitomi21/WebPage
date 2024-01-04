'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useTokenContext from './lib/hooks/useTokenContext';
import PostsList from './lib/components/posts/PostsList';
import { Post } from './lib/types/types';
import useFetch from './lib/hooks/useFetch';

export default function Home() {
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);
	const router = useRouter();
	const { token, setToken } = useTokenContext();
	if (!token) {
		router.push('/login');
	}
	useEffect(() => {
		const getPosts = async () => {
			const { response, status } = await useFetch('/posts/', 'GET', {
				Authorization: `Token ${token}`,
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
