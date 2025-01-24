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

	console.log({ serverResponse });

	return (
		<section className="mx-auto max-w-lg">
			<form className="" onSubmit={handleSubmit(onSubmit)} noValidate>
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
					variant="outline"
					isSubmitting={isSubmitting}
					isSubmitSuccessful={isSubmitSuccessful}
					disabled={isSubmitSuccessful}
				>
					{isSubmitting ? 'Skickar...' : 'Skicka'}
				</Button>
			</form>
			{serverResponse && serverResponse.message == 'error' && (
				<div className="my-4 flex items-center border-red-800 bg-red-100 p-2 text-red-800">
					<svg
						className="mr-4 inline size-8 min-w-8"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill="currentColor"
							d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
						/>
					</svg>
					<div>
						<p className="text-pretty">
							Något gick fel! Ditt svar har inte skickats. Försök igen eller kontakta [någon kontakt här kanske?]
						</p>
					</div>
				</div>
			)}
		</section>
	);
};

export default RsvpForm;
