import { sanityClient } from 'sanity:client';
import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export async function getPosts(): Promise<Post[]> {
	return await sanityClient.fetch(groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`);
}

export async function getPost(slug: string): Promise<Post> {
	return await sanityClient.fetch(groq`*[_type == "post" && slug.current == $slug][0]`, {
		slug
	});
}

export async function getStartPage(): Promise<StartPage> {
	return await sanityClient.fetch(groq`*[_type == "startPage"][0]`);
}

export async function getSettings(): Promise<Settings> {
	return await sanityClient.fetch(groq`*[_type == "settings"][0]`);
}

export interface Post {
	_type: 'post';
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset & { alt?: string };
	body: PortableTextBlock[];
}

export interface Settings {
	_type: 'settings';
	_createdAt: string;
	pageTitle?: string;
	navLinks?: {
		text: string;
		link: string;
	}[];
	callToAction?: {
		text: string;
		link: string;
	};
}

export interface StartPage {
	_type: 'startPage';
	_createdAt: string;
	title?: string;
	subtitle?: string;
	heroSlider?: {
		images: ImageAsset[];
	};
	bodyArea: PortableTextBlock[];
	bodyArea2: PortableTextBlock[];
	heroImage?: ImageAsset & { alt?: string };
	features?: {
		title: string;
		description: PortableTextBlock[];
		icon: ImageAsset & { alt?: string };
	}[];
	blocks?: (TextBlock | ImageBlock | CenterTextBlock | PuffBlock | TextImageBlock)[];
	callToAction?: {
		text: string;
		link: string;
	};
}

export interface TextBlock {
	_type: 'textBlock';
	text?: PortableTextBlock[];
}

export interface ImageBlock {
	_type: 'imageBlock';
	heading?: string;
	image?: ImageAsset;
	noCrop?: boolean;
	maxHeight?: number;
	_key?: string;
}

export interface TextImageBlock {
	_type: 'textImageBlock';
	blockHeading?: string;
	image?: ImageAsset;
	heading?: string;
	text?: PortableTextBlock[];
	smallerHeading?: boolean;
	reverse?: boolean;
	noCrop?: boolean;
	maxHeight?: number;
	smallerMargin?: boolean;
}

export interface CenterTextBlock {
	_type: 'centerTextBlock';
	heading?: string;
	text?: string;
}

export interface PuffBlock {
	_type: 'puffBlock';
	heading?: string;
	items?: Array<PuffBlockItem>;
	centeredText?: boolean;
	_key?: string;
}

export interface PuffBlockItem {
	_type: 'puffBlockItem';
	image?: ImageAsset;
	heading?: string;
	information?: PortableTextBlock[];
	button?: {
		text?: string;
		link?: string;
		externalLink?: boolean;
	};
}
