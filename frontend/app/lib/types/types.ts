export type Post = {
	author: {
		first_name: string;
		last_name: string;
	};
	title: string;
	text: string;
};

export type User = {
	id: number;
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
	friends: User[];
};
