'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import useTokenContext from './lib/hooks/useTokenContext';
import PostsList from './lib/components/posts/PostsList';
import { Post } from './lib/types/types';
import useFetch from './lib/hooks/useFetch';
import useLocalStorage from './lib/hooks/useLocalStorage';

export default function Home() {
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);
	const [tokenLS, setTokenLS, removeTokenLS] = useLocalStorage<string>(
		'shareSpaceToken',
		''
	);
	const router = useRouter();
	// const { token, setToken } = useTokenContext();
	const [value, setValue] = useLocalStorage('shareSpaceToken', '');

	if (!value) {
		router.push('/login');
	}

	useEffect(() => {
		const getPosts = async () => {
			const { response, status } = await useFetch('/posts/', 'GET', {
				Authorization: `Token ${value}`,
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
