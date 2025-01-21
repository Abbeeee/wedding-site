import { useFormContext } from 'react-hook-form';

interface InputFieldProps {
	name: string;
	label: string;
	type?: string;
	required?: boolean | string;
	pattern?: { value: RegExp; message: string };
	rest?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function InputField({
	name,
	label,
	type = 'text',
	required = false,
	pattern,
	...rest
}: InputFieldProps) {
	const {
		register,
		formState: { errors }
	} = useFormContext();
	const error = errors[name]?.message;
	return (
		<div className="relative mb-4 flex flex-col">
			<label htmlFor={name}>
				{label}
				{required && <span className="text-red-800">*</span>}
			</label>
			<input
				className="rounded-lg border border-gray-300 px-4 py-2"
				type={type || 'text'}
				{...register(name, { required: required, pattern: pattern })}
				{...rest}
			/>

			{typeof error === 'string' && <p className="text-red-800">{error}</p>}
		</div>
	);
}
