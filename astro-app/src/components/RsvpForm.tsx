import React, { useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import InputField from './Form/InputField';
import Button from './Button';

type FormData = {
	Email: string;
	Name: string;
	Allergies: string;
};

const RsvpForm: React.FC = () => {
	const [serverResponse, setServerResponse] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
	const {
		handleSubmit,
		formState: { isSubmitting, isSubmitSuccessful, errors }
	} = useFormContext<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			const response = await fetch(
				'https://script.google.com/macros/s/AKfycbydLowU70XdoxUXH39yvVAozoQoVFgeH1cDJ-90tGFu88WXEUdOUxuYKLi8f8eKNp5lfg/exec',
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

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<InputField
					name="Email"
					label="Email"
					type="email"
					required="Email is required"
					pattern={{ value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }}
				/>
				<InputField name="Name" label="Name" type="text" required="Name is required" />
				<InputField name="Allergies" label="Allergies" type="text" />

				<Button
					type="submit"
					className="rounded-sm bg-primary px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-600"
					isSubmitting={isSubmitting}
					isSubmitSuccessful={isSubmitSuccessful}
					disabled={isSubmitSuccessful}
				>
					Submit
				</Button>
			</form>
			{serverResponse && (
				<p
					style={{
						color: serverResponse.type === 'success' ? 'green' : 'text-red-800'
					}}
				>
					{serverResponse.message}
				</p>
			)}
		</>
	);
};

export default RsvpForm;
