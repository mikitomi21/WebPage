import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { Post } from '../types/types';
import useGlobalContext from './useGlobalContext';

type usePostsReturn = {
	refreshPosts: () => void;
};

export default function usePosts(token: string): usePostsReturn {
	const { setPosts } = useGlobalContext();
	const [refresh, setRefresh] = useState(false);

	const refreshPosts = () => {
		setRefresh((prev) => !prev);
	};

	useEffect(() => {
		const getPosts = async () => {
			const { response } = await useFetch('/posts/', 'GET', {
				Authorization: `Token ${token}`,
			});
			const res = response.json();
			res.then((postsFromDB) => {
				const sortedPosts = postsFromDB.sort((a: Post, b: Post) => b.id - a.id);
				setPosts(sortedPosts);
			});
		};

		getPosts();
	}, [token, refresh]);
	return {
		refreshPosts,
	};
}
