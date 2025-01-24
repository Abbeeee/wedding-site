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
	variant?: 'primary' | 'secondary' | 'outline';
	size?: 'sm' | 'md' | 'lg';
	iconStart?: React.ReactNode;
	iconEnd?: React.ReactNode;
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
	const baseStyles = 'rounded-md font-medium transition-all duration-200 flex items-center justify-center';

	const variantStyles = {
		primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500',
		secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500',
		outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-2 focus:ring-primary-500'
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
				'Skickat!'
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
