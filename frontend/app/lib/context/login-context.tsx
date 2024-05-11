'use client';
import React, { createContext, useState } from 'react';
import { User } from '../types/types';

type LoginContextProviderProps = {
	children: React.ReactNode;
};

type LoginContextType = {
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginContext = createContext<LoginContextType | null>(null);

export default function UserContextProvider({
	children,
}: LoginContextProviderProps) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			{children}
		</LoginContext.Provider>
	);
}
