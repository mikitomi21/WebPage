'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PostsList from './lib/components/posts/PostsList';
import { Post } from './lib/types/types';
import useFetch from './lib/hooks/useFetch';
import secureLocalStorage from 'react-secure-storage';

export default function Home() {
	const token = secureLocalStorage.getItem('shareSpaceToken');
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);

	const router = useRouter();

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
