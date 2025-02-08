import { useFormContext } from 'react-hook-form';

interface CheckboxFieldProps {
	name: string;
	label: string;
	required?: boolean | string;
	rest?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function CheckboxField({ name, label, required = false, ...rest }: CheckboxFieldProps) {
	const {
		register,
		formState: { errors }
	} = useFormContext();
	const error = errors[name]?.message;

	return (
		<div className="relative mb-4">
			<div className="flex items-center">
				<div className="relative flex items-center">
					<input
						type="checkbox"
						className="peer h-6 w-6 cursor-pointer appearance-none border border-gray-300 bg-[#fff] checked:border-primary checked:bg-primary"
						{...register(name, { required })}
						{...rest}
					/>
					<svg
						className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100"
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						strokeWidth="4"
						strokeLinecap="square"
						strokeLinejoin="round"
					>
						<polyline points="20 6 9 17 4 12"></polyline>
					</svg>
				</div>
				<label htmlFor={name} className="ml-2 block">
					{label}
					{required && <span className="text-red-800">*</span>}
				</label>
			</div>
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
