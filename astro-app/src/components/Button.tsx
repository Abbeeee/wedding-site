import React from 'react';

interface ButtonProps {
	onClick?: () => void;
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	className?: string;
	isSubmitting?: boolean;
	isSubmitSuccessful?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	children,
	type = 'button',
	disabled = false,
	className = '',
	isSubmitting = false,
	isSubmitSuccessful = false
}) => {
	return (
		<button type={type} onClick={onClick} disabled={disabled} className={`${className}`}>
			{isSubmitting ? (
				<>
					{children}
					<div
						className="text-surface ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
						role="status"
					></div>
				</>
			) : isSubmitSuccessful ? (
				'Skickat!'
			) : (
				children
			)}
		</button>
	);
};

export default Button;
