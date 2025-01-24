import React from 'react';
import { urlFor } from '../utils/image';
import type { ImageBlock } from '../utils/sanity';

type Props = {
	block: ImageBlock;
};

const ImageBlock = (props: Props) => {
	const image = props.block.image;

	return (
		<section className="imageblock bg-white py-8 md:py-12">
			<div className="mx-auto max-w-container">
				{props.block.heading && (
					<h2 className="mx-auto mt-0 w-fit text-balance text-4xl md:text-5xl">{props.block.heading}</h2>
				)}
				{image && (
					<img
						className="w-full object-cover"
						src={urlFor(image).width(1024).height(420).url()}
						alt={(image.alt as string) || ''}
					/>
				)}
			</div>
		</section>
	);
};

export default ImageBlock;
