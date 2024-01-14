export type Post = {
	author: Author;
	id: number;
	likes: number[];
	comments: Comment[];
	title: string;
	text: string;
};
export type Author = {
	username: string;
	avatar: string;
};
export type Comment = {
	author: Author;
	id: number;
	likes: number[];
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
