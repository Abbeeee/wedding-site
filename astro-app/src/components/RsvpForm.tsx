import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

type FormData = {
	Email: string;
	Name: string;
	Allergies: string;
};

const RsvpForm: React.FC = () => {
	const [serverResponse, setServerResponse] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
	const {
		register,
		handleSubmit,
		watch,
		formState: { isSubmitting, errors, isSubmitSuccessful }
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			const response = await fetch(
				'https://script.google.com/macros/s/AKfycbxvnIli_zeXqJ3iqI_zxFQu7gIfTI4-9acCKWIR1QI60gf0TW28Qkg2hJW4BDWiABeLhw/exec',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'text/plain;charset=utf-8'
					},
					body: JSON.stringify(data)
				}
			);

			if (!response.ok) {
				console.log(response);
				throw new Error('Failed to submit form');
			}

			setServerResponse({ type: 'success', message: 'Form submitted successfully!' });
		} catch (error) {
			setServerResponse({ type: 'error', message: (error as Error).message });
		}
	};

	// console.log(watch('Email')); // watch input value by passing the name of it

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				method="post"
				action="https://script.google.com/macros/s/AKfycbw0WWm1Qjy8eWI3_x9glOvfKnJ0ZXXW94mRMuzD4gIk_MbYw93pKqXfK7_KDFuwRJoo8g/exec"
				id="my-form"
			>
				<div>
					<label htmlFor="Email">Email:</label>
					<input
						id="email"
						type="email"
						{...register('Email', {
							required: 'Email is required',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Invalid email address'
							}
						})}
					/>
					{errors.Email && typeof errors.Email.message === 'string' && <p>{errors.Email.message}</p>}
				</div>

				<div>
					<label htmlFor="Name">Name:</label>
					<input id="name" {...register('Name', { required: 'Name is required' })} />
					{errors.Name && typeof errors.Name.message === 'string' && <p>{errors.Name.message}</p>}
				</div>

				<div>
					<label htmlFor="Allergies">Allergies:</label>
					<input id="allergies" {...register('Allergies')} />
					{errors.Allergies && typeof errors.Allergies.message === 'string' && <p>{errors.Allergies.message}</p>}
				</div>

				<button type="submit">Submit</button>
				{isSubmitting && <p>Submitting...</p>}
				{isSubmitSuccessful && <p>Skickat!</p>}
			</form>
			{serverResponse && (
				<p
					style={{
						color: serverResponse.type === 'success' ? 'green' : 'red'
					}}
				>
					{serverResponse.message}
				</p>
			)}
		</>
	);
};

export default RsvpForm;
