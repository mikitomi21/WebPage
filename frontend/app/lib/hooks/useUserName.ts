import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { Post, User } from '../types/types';

type useUserNameProps = string;
type useUserNameReturn = {
	userName: string | undefined;
};
export default function useUserName(
	token: useUserNameProps
): useUserNameReturn {
	const [userName, setUserName] = useState('');
	useEffect(() => {
		const getUserName = async () => {
			const { response, status } = await useFetch('/users/me/', 'GET', {
				Authorization: `Token ${token}`,
			});
			if (status == 200) {
				const userInfoResponse: User = await response.json();
				setUserName(userInfoResponse.username);
			}
		};
		getUserName();
	}, []);
	return {
		userName,
	};
}
