import React from 'react';

type ButtonOrAnchorProps = {
	as?: 'button' | 'a';
	href?: string;
	target?: string;
	rel?: string;
} & ButtonProps;

interface ButtonProps {
	onClick?: () => void;
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	className?: string;
	isSubmitting?: boolean;
	isSubmitSuccessful?: boolean;
	variant?: 'primary' | 'accent' | 'outline';
	size?: 'sm' | 'md' | 'lg';
	iconStart?: React.ReactNode;
	iconEnd?: JSX.Element | string;
	fullWidth?: boolean;
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
	className = '',
	isSubmitting = false,
	isSubmitSuccessful = false,
	variant = 'primary',
	size = 'md',
	iconStart,
	iconEnd,
	fullWidth = false
}) => {
	const baseStyles = 'min-w-[125px] font-medium transition-all duration-200 flex items-center justify-center ';

	const variantStyles = {
		primary: 'bg-primary text-white enabled:hover:bg-accent focus:ring-2 focus:ring-primary-500',
		accent: 'bg-accent text-white enabled:hover:bg-primary focus:ring-2 focus:ring-gray-500',
		outline:
			'border-2 border-primary text-primary enabled:hover:bg-primary enabled:hover:text-white focus:ring-2 focus:ring-primary-500'
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
    ${className}
  `.trim();

	const content = (
		<div className="flex items-center justify-center gap-2">
			{iconStart && <span className="inline-flex">{iconStart}</span>}
			{isSubmitting ? (
				<div className="flex items-center justify-center gap-2">
					{children}
					<div
						className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em]"
						role="status"
					/>
				</div>
			) : isSubmitSuccessful ? (
				<>
					Skickat!{' '}
					<svg className="size-5" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path fill="currentColor" d="m9 19.414l-6.707-6.707l1.414-1.414L9 16.586L20.293 5.293l1.414 1.414z" />
					</svg>
				</>
			) : (
				children
			)}
			{iconEnd && <span className="inline-flex">{iconEnd}</span>}
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
