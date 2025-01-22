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
	blocks?: (TextBlock | ImageBlock | CenterTextBlock | PuffBlock)[];
	callToAction?: {
		text: string;
		link: string;
	};
}

// Define the types for the blocks
export interface TextBlock {
	_type: 'textBlock';
	text: PortableTextBlock[];
}

export interface ImageBlock {
	_type: 'imageBlock';
	image: ImageAsset;
}

export interface CenterTextBlock {
	_type: 'centerTextBlock';
	heading: string;
	text: string;
}

export interface PuffBlock {
	_type: 'puffBlock';
	items: Array<PuffBlockItem>;
}

export interface PuffBlockItem {
	_type: 'puffBlockItem';
	heading: string;
	information: PortableTextBlock[];
}
