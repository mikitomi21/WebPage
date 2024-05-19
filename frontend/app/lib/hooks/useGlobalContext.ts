import { useContext } from 'react';
import { GlobalContext } from '../context/global-context';

export default function useGlobalContext() {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error(
			'useGlobalContext must be used within a GlobalContext Provider'
		);
	}
	return context;
}
