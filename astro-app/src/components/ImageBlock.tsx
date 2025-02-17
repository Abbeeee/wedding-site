import React from 'react';
import { urlFor } from '../utils/image';
import type { ImageBlock } from '../utils/sanity';

type Props = {
	block: ImageBlock;
};

const ImageBlock = (props: Props) => {
	const image = props.block.image;
	const noCrop = props.block.noCrop;
	const maxHeightValue = props.block.maxHeight ? props.block.maxHeight : 200;
	const blockId = props.block._key;

	return (
		<section id={blockId} className="imageblock mx-auto max-w-container">
			{props.block.heading && (
				<h2 className="mx-auto mt-0 w-fit text-balance text-4xl md:text-5xl">{props.block.heading}</h2>
			)}
			{image && noCrop ? (
				<img
					className="mx-auto"
					src={urlFor(image).height(maxHeightValue).fit('min').auto('format').url()}
					alt={(image.alt as string) || ''}
				/>
			) : (
				image && (
					<img
						className="w-full object-cover"
						src={urlFor(image).width(1240).height(500).auto('format').url()}
						alt={(image.alt as string) || ''}
					/>
				)
			)}
		</section>
	);
};

export default ImageBlock;
