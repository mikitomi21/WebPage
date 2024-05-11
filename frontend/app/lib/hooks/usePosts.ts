import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { Post, User } from '../types/types';

type usePostsProps = string;

type usePostsReturn = {
	posts: Post[] | undefined;
	userName: string | undefined;
};
export default function usePosts(token: usePostsProps): usePostsReturn {
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);
	const [userName, setUserName] = useState('');
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
	return {
		posts,
		userName,
	};
}
