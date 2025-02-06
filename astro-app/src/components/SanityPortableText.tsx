import { PortableText } from '@portabletext/react';
import type { PortableTextComponents, PortableTextProps } from '@portabletext/react';

const portableTextComponents: PortableTextComponents = {
	block: {
		normal: ({ children }) => <p>{children}</p>,
		smallCaps: ({ children }) => <p className="smallCaps">{children}</p>
	},
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

const SanityPortableText = ({ content }: { content: PortableTextProps['value'] }) => {
	return <PortableText value={content} components={portableTextComponents} />;
};

export default SanityPortableText;
