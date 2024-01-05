import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import TokenContextProvider from './lib/context/token-context';
import Footer from './lib/components/global/Footer';
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
				<TokenContextProvider>{children}</TokenContextProvider>
				<Footer />
			</body>
		</html>
	);
}
