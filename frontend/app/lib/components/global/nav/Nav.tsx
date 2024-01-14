'use client';
import Link from 'next/link';
import styles from './nav.module.scss';
import { CgProfile } from 'react-icons/cg';
import { CiLogout, CiLogin } from 'react-icons/ci';
import { IoPersonAddOutline } from 'react-icons/io5';
import secureLocalStorage from 'react-secure-storage';
import { useEffect } from 'react';
import useLoginContext from '@/app/lib/hooks/useLoginContext';

export default function Nav() {
	const { isLoggedIn, setIsLoggedIn } = useLoginContext();

	const logOut = () => {
		setIsLoggedIn(false);
		secureLocalStorage.removeItem('shareSpaceToken');
	};
	useEffect(() => {
		secureLocalStorage.getItem('shareSpaceToken')
			? setIsLoggedIn(true)
			: setIsLoggedIn(false);
	}, []);
	return (
		<nav className={styles.nav}>
			<Link href='/' className={styles.logo}></Link>
			<section className={styles.icons}>
				{isLoggedIn ? (
					<div>
						<Link
							href='/profil'
							className={styles.icon}
							title='Wejdź na swój profil!'
						>
							<CgProfile />
						</Link>
						<Link
							href='/login'
							onClick={logOut}
							className={styles.icon}
							title='Wyloguj!'
						>
							<CiLogout />
						</Link>
					</div>
				) : (
					<div>
						<Link href='/login' className={styles.icon} title='Zaloguj się!'>
							<CiLogin />
						</Link>
						<Link
							href='/rejestracja'
							className={styles.icon}
							title='Zarejestruj się!'
						>
							<IoPersonAddOutline />
						</Link>
					</div>
				)}
			</section>
		</nav>
	);
}
