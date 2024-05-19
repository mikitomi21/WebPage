'use client';
import React, { createContext, useState } from 'react';
import { Post } from '../types/types';

type GlobalContextProviderProps = {
	children: React.ReactNode;
};

type GlobalContextType = {
	token: string;
	posts: Post[] | null;
	userName: string;
	setToken: React.Dispatch<React.SetStateAction<string>>;
	setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>;
	setUserName: React.Dispatch<React.SetStateAction<string>>;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export default function GlobalContextProvider({ children }: GlobalContextProviderProps) {
	const [token, setToken] = useState<string>('');
	const [posts, setPosts] = useState<Post[] | null>(null);
	const [userName, setUserName] = useState<string>('');

	return (
		<GlobalContext.Provider
			value={{ token, setToken, posts, setPosts, userName, setUserName }}
		>
			{children}
		</GlobalContext.Provider>
	);
}
