'use client';
import styles from './profile.module.scss';
import useLocalStorage from '../lib/hooks/useLocalStorage';
import { User } from '../lib/types/types';


export default function Profile() {
	const [userLS, setUserLS] = useLocalStorage<User>('shareSpaceUser');
	return (
		<div className={styles.profile}>
			<h3>Informacje o: {userLS.username}</h3>
		</div>
	);
}
