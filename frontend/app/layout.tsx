import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import UserContextProvider from './lib/context/user-context';
import Footer from './lib/components/global/footer/Footer';
import Nav from './lib/components/global/nav/Nav';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'ShareSpace',
	description: 'Your new go-to social media platform',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='pl'>
			<body className={inter.className}>
				<UserContextProvider>
					<Nav />
					<div className='content'>{children}</div>
					<Footer />
				</UserContextProvider>
			</body>
		</html>
	);
}
