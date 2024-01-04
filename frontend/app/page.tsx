'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useTokenContext from './lib/hooks/useTokenContext';
import PostsList from './lib/components/posts/PostsList';
import { Post } from './lib/types/types';


export default function Home() {
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);
	const router = useRouter();
	const { token, setToken } = useTokenContext();
	if (!token) {
		router.push('/login');
	}
	useEffect(() => {
		fetch('http://localhost:8000/api/posts/', {
			headers: { Authorization: `Token ${token}` },
		})
			.then((res) => res.json())
			.then((res) => {
				setPosts(res);
			});
	}, []);
	if (!posts)
		return (
			<div className='loader' style={{ color: 'white' }}>
				Ładowanie...
			</div>
		);

	return <PostsList posts={posts} />;
}
