import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { Post } from '../types/types';

type usePostsReturn = {
	posts: Post[] | undefined;
	refreshPosts: () => void;
};

export default function usePosts(token: string): usePostsReturn {
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);
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
	console.log(posts);
	return {
		posts,
		refreshPosts,
	};
}
