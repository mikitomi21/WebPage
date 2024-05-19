import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import LoginContextProvider from './lib/context/login-context';
import GlobalContextProvider from './lib/context/global-context';
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
				<LoginContextProvider>
					<GlobalContextProvider>
						<Nav />
						<div className='content'>{children}</div>
						<Footer />
					</GlobalContextProvider>
				</LoginContextProvider>
			</body>
		</html>
	);
}
