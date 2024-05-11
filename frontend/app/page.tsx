'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import useTokenContext from './lib/hooks/useTokenContext';
import PostsList from './lib/components/posts/PostsList';
import { Post } from './lib/types/types';
import useFetch from './lib/hooks/useFetch';
import secureLocalStorage from 'react-secure-storage';
import { User } from './lib/types/types';
export default function Home() {
	const token = secureLocalStorage.getItem('shareSpaceToken');
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);
	const [userName, setUserName] = useState('');
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
		const getUserName = async () => {
			const { response, status } = await useFetch('/users/me/', 'GET', {
				Authorization: `Token ${token}`,
			});
			if (status == 200) {
				const userInfoResponse: User = await response.json();
				setUserName(userInfoResponse.username);
			}
		};
		getPosts();
		getUserName();
	}, []);

	if (!posts)
		return (
			<div className='loader' style={{ color: 'white' }}>
				Ładowanie...
			</div>
		);

	return (
		<>
			<PostsList posts={posts} userName={userName} />
		</>
	);
}
