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
				className={`border border-gray-300 px-3 py-1 ${error ? 'border-red-800' : ''}`}
				type={type || 'text'}
				{...register(name, { required: required, pattern: pattern })}
				{...rest}
			/>

			{typeof error === 'string' && (
				<p className="mt-1 flex items-center text-sm text-red-800">
					{/* <svg className="mr-1" width="14" height="14" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
						/>
					</svg> */}
					{error}
				</p>
			)}
		</div>
	);
}
