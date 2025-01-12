import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`);
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(groq`*[_type == "post" && slug.current == $slug][0]`, {
    slug,
  });
}

export async function getStartPage(): Promise<StartPage> {
  return await sanityClient.fetch(groq`*[_type == "startPage"][0]`);
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset & { alt?: string };
  body: PortableTextBlock[];
}

export interface StartPage {
  _type: "startPage";
  _createdAt: string;
  title?: string;
  subtitle?: string;
  heroImage?: ImageAsset & { alt?: string };
  callToAction?: {
    text: string;
    link: string;
  };
  features?: {
    title: string;
    description: string;
    icon: ImageAsset & { alt?: string };
  }[];
}
