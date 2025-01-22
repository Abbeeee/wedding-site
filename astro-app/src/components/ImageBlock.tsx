import React from 'react';
import { urlFor } from '../utils/image';
import type { ImageBlock } from '../utils/sanity';

type Props = {
	block: ImageBlock;
};

const ImageBlock = (props: Props) => {
	const image = props.block.image;

	return (
		<section className="mx-auto mb-10">
			{/* TODO: Remove */}
			<h1>ImageBlock</h1>
			<img
				className="h-[420px] object-cover"
				src={urlFor(image).width(1024).height(420).url()}
				alt={(image.alt as string) || ''}
			/>
		</section>
	);
};

export default ImageBlock;
