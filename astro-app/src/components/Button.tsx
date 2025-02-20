import React from 'react';

type ButtonOrAnchorProps = {
	as?: 'button' | 'a';
	href?: string;
	target?: string;
	rel?: string;
	class?: string;
	className?: string;
	iconEnd?: JSX.Element | string;
} & ButtonProps;

interface ButtonProps {
	onClick?: () => void;
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	isSubmitting?: boolean;
	isSubmitSuccessful?: boolean;
	variant?: 'primary' | 'accent' | 'outline';
	size?: 'sm' | 'md' | 'lg';
	iconStart?: JSX.Element | string;
	fullWidth?: boolean;
	error?: boolean;
}

const Button: React.FC<ButtonOrAnchorProps> = ({
	as = 'button',
	href,
	target,
	rel,
	onClick,
	children,
	type = 'button',
	disabled = false,
	class: className1 = '',
	className: className2 = '',
	isSubmitting = false,
	isSubmitSuccessful = false,
	variant = 'primary',
	size = 'md',
	iconStart,
	iconEnd,
	fullWidth = false,
	error
}) => {
	const combinedClassName = `${className1} ${className2}`.trim();

	const renderIcon = (icon?: JSX.Element | string) => {
		if (typeof icon === 'string') {
			return <span dangerouslySetInnerHTML={{ __html: icon }} />;
		}
		return icon;
	};

	const baseStyles =
		'btn min-w-[125px] font-normal transition-all duration-200 flex items-center justify-center font-mrs-eaves leading-none';

	const variantStyles = {
		primary:
			'bg-primary text-white hover:bg-accent focus:ring-2 focus:ring-primary [&:not([disabled])]:hover:bg-accent',
		accent: 'bg-accent text-white hover:bg-primary focus:ring-2 focus:ring-accent [&:not([disabled])]:hover:bg-primary',
		outline:
			'border-2 border-primary text-primary [&:not([disabled])]:hover:bg-primary [&:not([disabled])]:hover:text-white [&:not([disabled])]:focus:text-white [&:not([disabled])]:focus:bg-primary'
	};

	const sizeStyles = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	};

	const classes = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${combinedClassName}
  `.trim();

	const content = (
		<div className="flex items-center justify-center gap-2">
			{iconStart && <span className="inline-flex">{renderIcon(iconStart)}</span>}
			{isSubmitting ? (
				<div className="flex items-center justify-center gap-2">
					{children}
					<div
						className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em]"
						role="status"
					/>
				</div>
			) : isSubmitSuccessful && !error ? (
				<>
					Skickat!{' '}
					<svg className="size-4" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M20 6L9 17l-5-5"
						/>
					</svg>
				</>
			) : error ? (
				<>
					Något gick fel!{' '}
					<svg width="20" height="20" viewBox="0 0 24 24">
						<g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
							<path d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06" />
							<path d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0" />
						</g>
					</svg>
				</>
			) : (
				<>
					{children}
					{iconEnd && <span className="inline-flex">{renderIcon(iconEnd)}</span>}
				</>
			)}
		</div>
	);

	if (as === 'a') {
		return (
			<a href={href} target={target} rel={rel} onClick={onClick} className={classes}>
				{content}
			</a>
		);
	}

	return (
		<button type={type} onClick={onClick} disabled={disabled} className={classes}>
			{content}
		</button>
	);
};

export default Button;
