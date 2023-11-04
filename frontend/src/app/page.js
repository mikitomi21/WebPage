'use client';
import Image from 'next/image';
import styles from './styles/page.module.scss';
import { useEffect, useState } from 'react';
import useSWR from 'swr'

const fetcher = (url, auth) => {
	console.log(auth)
	fetch(url, {headers:{'Authorization' : `Token ${auth}`}}).then(res => res.json())}

export default function Home() {
	
	
	const [posts, setPosts] = useState([
		{
			user: 'Marcin Stenka',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum egestas risus nec tortor ornare lacinia. Etiam ut aliquet urna. Praesent tristique molestie nunc, vestibulum laoreet magna dictum eget. Donec ornare, odio id dignissim egestas, sapien orci auctor libero, nec consequat sem massa id diam. Phasellus facilisis',
		},
		{
			user: 'Krzysztof Pecyna',
			description:
				'Morbi justo leo, dictum sit amet molestie ac, molestie elementum justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae eleifend risus. Phasellus sed magna eget sapien cursus aliquam. Donec accumsan tortor dolor, non hendrerit arcu eleifend in. ',
		},
		{
			user: 'Jakub Stachowicz',
			description:
				'In semper cursus leo, ut facilisis urna rutrum quis. Vestibulum feugiat laoreet arcu, non suscipit quam mattis et. Nulla aliquet semper risus, non congue nunc posuere id. Fusce ultrices, lorem quis viverra pulvinar, odio ex volutpat elit, non iaculis arcu magna id augue. Curabitur cursus ipsum nisl. ',
		},
	]);
	
	
	const [auth, setAuth] = useState('')
	

	useEffect(()=>{
		const getAuthToken = async () => {
			let user = {
				"password": "password",
				"email": "admin@example.com"
			}
			
			const response = await fetch('http://localhost:8000/api/auth/token/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				  },
				body: JSON.stringify(user),
			});
			const data = await response.json();
			setAuth(data.auth_token);
		}
		getAuthToken();

	}, [])
	
	const { data, error } = useSWR('http://localhost:8000/api/posts', () =>fetcher('http://localhost:8000/api/posts', auth))
		
	if (error) return <div style={{color:"white"}}>Failed to load</div>
	if (!data) return <div style={{color:"white"}}>Loading...</div>
	console.log(data)
	return (
		<>
			<div className={styles.posts}>
				{posts.map(post => {
					return (
						<div className={styles.post} key={post.user}>
							<div className={styles.user}>
								<div className={styles.user_avatar}></div>
								<h3 className={styles.user_name}>{post.user}</h3>
							</div>
							<p className={styles.description}>{post.description}</p>
						</div>
					);
				})}
			</div>
		</>
	);
}
