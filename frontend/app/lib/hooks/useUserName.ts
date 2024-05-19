import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { Post, User } from '../types/types';
import useGlobalContext from './useGlobalContext';

type useUserNameProps = string;

export default function useUserName(token: useUserNameProps) {
	const { setUserName } = useGlobalContext();
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
}
