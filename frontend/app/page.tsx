'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useTokenContext from './lib/hooks/useTokenContext';

type Post = {
	author: {
		first_name: string;
		last_name: string;
	};
	title: string;
	text: string;
};

export default function Home() {
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);
	const router = useRouter();
	const { token, setToken } = useTokenContext();
	if (!token) {
		router.push('/login');
	}
	useEffect(() => {
		fetch('http://localhost:8000/api/posts/', {
			headers: { Authorization: `Token ${token}` },
		})
			.then((res) => res.json())
			.then((res) => {
				setPosts(res);
			});
	}, []);
	if (!posts)
		return (
			<div className='loader' style={{ color: 'white' }}>
				Ładowanie...
			</div>
		);

	return (
		<div className={styles.posts}>
			{posts.map((post, index) => {
				return (
					<div className={styles.post} key={index}>
						<div className={styles.user}>
							<div className={styles.user_avatar}></div>
							<h3 className={styles.user_name}>
								{post.author.first_name} {post.author.last_name}
							</h3>
						</div>
						<h2 className={styles.post_title}>"{post.title}"</h2>
						<p className={styles.post_text}>{post.text}</p>
					</div>
				);
			})}
		</div>
	);
}
