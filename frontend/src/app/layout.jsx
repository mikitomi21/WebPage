import { Inter } from 'next/font/google';
import './styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'ShareSpace',
	description: 'ShareSpace - nowoczesna platforma społecznościowa.',
};

export default function RootLayout({ children }) {
	return (
		<html lang='pl'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
