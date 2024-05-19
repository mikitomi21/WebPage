import { FormEvent, useState } from 'react';
import { createNewComment } from '../actions/actions';

type UseNewCommentProps = {
	refreshPosts: () => void;
};
type UseNewCommentReturn = {
	message: string | null;
	handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> | null;
};

export function useNewComment({
	refreshPosts,
}: UseNewCommentProps): UseNewCommentReturn {
	const [message, setMessage] = useState<string | null>(null);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const result = await createNewComment({ message }, formData);
		setMessage(result.message);
		if (result.message === 'Komentarz został dodany!') {
			refreshPosts();
		}
	};

	return {
		message,
		handleSubmit,
	};
}
