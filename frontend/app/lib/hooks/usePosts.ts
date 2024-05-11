import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { Post, User } from '../types/types';

type usePostsProps = string;

type usePostsReturn = {
	posts: Post[] | undefined;
};
export default function usePosts(token: usePostsProps): usePostsReturn {
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);
	useEffect(() => {
		const getPosts = async () => {
			const { response, status } = await useFetch('/posts/', 'GET', {
				Authorization: `Token ${token}`,
			});
			const res = response.json();
			res.then((postsFromDB) => setPosts(postsFromDB));
		};

		getPosts();
	}, [posts]);
	return {
		posts,
	};
}
