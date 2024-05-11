import secureLocalStorage from 'react-secure-storage';
import useFetch from './useFetch';

type RegistrationProps = {
	email: string;
	username: string;
	password: string;
};
type RegistrationResult = {
	signedUp: boolean;
	registrationError: string;
};

export default async function useRegistration(
	userCredentials: RegistrationProps
): Promise<RegistrationResult> {
	const { response, status } = await useFetch(
		'/users/',
		'POST',
		{ 'Content-Type': 'application/json' },
		userCredentials
	);

	if (status === 201) {
		return { signedUp: true, registrationError: 'Zarejestrowano pomyślnie!' };
	} else if (response.status == 400) {
		const registerError = await response.json();
		if (registerError.email & registerError.usernmae)
			return {
				signedUp: false,
				registrationError: 'Konto z takimi danymi już istnieje!',
			};
		else if (registerError.email)
			//todo: obsługa gdy mail nie ma odpowiedniej struktury: np bez kropki
			return {
				signedUp: false,
				registrationError: 'Podany adres email jest zajęty!',
			};
		else if (registerError.username)
			return {
				signedUp: false,
				registrationError: 'Podana nazwa użytkownika jest zajęta!',
			};
		else if (registerError.password)
			return {
				signedUp: false,
				registrationError:
					'Podana hasło jest zbyt proste! Użyj kombinacji z przynajmniej 10 liter, cyfr i znaków specjalnych.',
			};
		else {
			return {
				signedUp: false,
				registrationError: 'Wystąpił nieoczekiwany bład!',
			};
		}
	} else {
		return {
			signedUp: false,
			registrationError: 'Wystąpił nieoczekiwany bład!',
		};
	}
}
