import React from 'react';
import { urlFor } from '../utils/image';
import type { ImageBlock } from '../utils/sanity';

type Props = {
	block: ImageBlock;
};

const ImageBlock = (props: Props) => {
	const image = props.block.image;
	const blockId = props.block._key;

	return (
		<section id={blockId} className="imageblock mx-auto max-w-container">
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
		</section>
	);
};

export default ImageBlock;
