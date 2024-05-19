'use server';

import useFetch from '../hooks/useFetch';
import { revalidatePath } from 'next/cache';

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

	if (status === 201) {
		revalidatePath('/');
		return {
			message: 'Post został dodany!',
		};
	} else {
		return {
			message: 'Wystąpił błąd podczas dodawania postu.',
		};
	}
}

export async function createNewComment(prevState: State, formData: FormData) {
	const newCommentId = formData.get('newCommentId')?.toString();
	const newCommentText = formData
		.get(`newComment_${newCommentId}`)
		?.toString();
	const newCommentUserName = formData.get('userName')?.toString();
	const token = formData.get('token')?.toString();
	const comment = {
		author: {
			username: newCommentUserName,
		},
		post: newCommentId,
		text: newCommentText,
		likes: [1],
	};
	console.log(comment);
	const { response: newCommentResponse, status } = await useFetch(
		`/comments/`,
		'POST',
		{
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		comment
	);
	console.log(newCommentResponse);
	if (status === 201) {
		revalidatePath('/');
		return {
			message: 'Komentarz został dodany!',
		};
	} else {
		return {
			message: 'Wystąpił błąd podczas dodawania komentarza.',
		};
	}
}
