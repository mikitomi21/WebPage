'use server';

import useFetch from '../hooks/useFetch';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type State = {
	message?: string | null;
};

export async function createNewPost(prevState: State, formData: FormData) {
	const newPostTitle = formData.get('postTitle')?.toString();
	const newPostText = formData.get('postText')?.toString();
	const newPostUserName = formData.get('userName')?.toString();
	const token = formData.get('token')?.toString();
	const post = {
		author: {
			username: newPostUserName,
		},
		title: newPostTitle,
		text: newPostText,
		likes: [1],
	};
	const { response: newPostResponse, status } = await useFetch(
		`/posts/`,
		'POST',
		{
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		post
	);
	revalidatePath('/');
	return {
		message: 'Post został dodany!',
	};
}
