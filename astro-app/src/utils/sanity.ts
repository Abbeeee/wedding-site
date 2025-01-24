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

export interface Post {
	_type: 'post';
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset & { alt?: string };
	body: PortableTextBlock[];
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
}

export interface TextImageBlock {
	_type: 'textImageBlock';
	image?: ImageAsset;
	heading?: string;
	text?: PortableTextBlock[];
	reverse?: boolean;
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
