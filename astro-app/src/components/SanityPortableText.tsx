import { PortableText } from '@portabletext/react';

const portableTextComponents = {
	marks: {
		link: ({ value, children }: any) => {
			const target = value?.href?.startsWith('http') ? '_blank' : undefined;
			return (
				<a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
					{children}
				</a>
			);
		},
		email: ({ value, children }: any) => {
			return <a href={`mailto:${value.email}`}>{value.children}</a>;
		},
		phone: ({ value, children }: any) => {
			return <a href={`tel:${value.phone}`}>{value.children}</a>;
		}
	}
};

const SanityPortableText = ({ content }: { content: any }) => {
	return <PortableText value={content} components={portableTextComponents} />;
};

export default SanityPortableText;
