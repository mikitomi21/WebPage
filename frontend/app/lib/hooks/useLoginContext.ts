import { useContext } from 'react';
import { LoginContext } from '../context/login-context';

export default function useLoginContext() {
	const context = useContext(LoginContext);
	if (!context) {
		throw new Error(
			'useLoginContext must be used within a LoginContext Provider'
		);
	}
	return context;
}
