import { FormEvent, useState } from 'react';
import { createNewPost } from '../actions/actions';

type UseNewPostProps = {
	refreshPosts: () => void;
};
type UseNewPostReturn = {
	message: string | null;
	handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> | null;
};

export function useNewPost({
	refreshPosts,
}: UseNewPostProps): UseNewPostReturn {
	const [message, setMessage] = useState<string | null>(null);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const result = await createNewPost({ message }, formData);
		setMessage(result.message);
		if (result.message === 'Post został dodany!') {
			refreshPosts();
		}
	};

	return {
		message,
		handleSubmit,
	};
}
