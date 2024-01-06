import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import UserContextProvider from './lib/context/user-context';
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
				<UserContextProvider>{children}</UserContextProvider>
			</body>
		</html>
	);
}
