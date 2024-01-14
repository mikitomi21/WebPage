import secureLocalStorage from 'react-secure-storage';
import useFetch from './useFetch';

type LoginProps = {
	email: string;
	password: string;
};
type LoginResult = {
	loggedIn: boolean;
	loginError: string;
};

export default async function useLogin(
	userCredentials: LoginProps
): Promise<LoginResult> {
	const { response, status } = await useFetch(
		'/auth/token/login',
		'POST',
		{ 'Content-Type': 'application/json' },
		userCredentials
	);
	if (status === 200) {
		const tokenResponse = await response.json();
		secureLocalStorage.setItem('shareSpaceToken', tokenResponse.auth_token);
		return { loggedIn: true, loginError: '' };
	} else {
		return { loggedIn: false, loginError: 'Zostały wprowadzone złe dane!' };
	}
}
