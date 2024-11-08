import type { Icon } from 'lucide-svelte';

export type NavMenuItem = {
	id: PageType;
	title: string;
	url: string;
	icon: typeof Icon;
};

export const PageTypes = {
	Home: 'home',
	People: 'people'
} as const;

// Convert object key in a type
export type PageType = (typeof PageTypes)[keyof typeof PageTypes];
