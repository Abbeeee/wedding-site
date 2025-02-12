import React, { useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import InputField from './Form/InputField';
import Button from './Button';
import CheckboxField from './Form/CheckboxField';

type FormData = {
	Email: string;
	Phonenumber: string;
	Name: string;
};

const SpeechForm: React.FC = () => {
	const [serverResponse, setServerResponse] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
	const {
		handleSubmit,
		formState: { isSubmitting, isSubmitSuccessful, errors }
	} = useFormContext<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			const response = await fetch(
				'https://script.google.com/macros/s/AKfycbxN7Ds-bBqfMWZOMnZXga7hNsVJ-ucaVhn8FrMnWBdUjI3_7q6fR9fmwsUl01q7XLVb/exec',
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
		<section id="speechform" className="mx-auto max-w-container">
			<section className="mx-auto max-w-lg">
				<h2 className="mt-0 text-balance leading-tight sm:text-3xl md:text-5xl">Tal</h2>
				<p className="mb-4">
					Anmäl ifall du önskar hålla tal i formuläret nedan senast den 31 april 2025. Om du har några frågor får du
					gärna höra av dig till våra
					<a className="ml-1" href="#96d2e804b618" aria-label="Gå till sektionen för toastmasters">
						toastmasters
					</a>
					.
				</p>

				<form className="border border-solid border-gray-300 p-4" onSubmit={handleSubmit(onSubmit)} noValidate>
					{/* Common fields */}
					<div className="space-y-4">
						<InputField name="Namn" label="För- och Efternamn" type="text" required="Vi behöver ditt namn" />
						<InputField
							name="Email"
							label="Email"
							type="email"
							required="Email krävs"
							pattern={{ value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ogiltig email adress' }}
						/>
						<InputField
							name="Telefonnummer"
							label="Telefonnummer"
							type="phonenumber"
							required="Telefonnummer krävs"
							pattern={{ value: /^[0-9]{3}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/, message: 'Ogiltigt telefonnummer' }}
						/>
						<InputField
							name="Relation"
							label="Din relation till brudparet"
							type="text"
							required="Vi vill gärna att du fyller i något här"
						/>
						<InputField name="Song" label="Låt som önskas när du ska gå upp på scenen (valfritt)" type="text" />
					</div>

					<Button
						type="submit"
						variant="outline"
						isSubmitting={isSubmitting}
						isSubmitSuccessful={isSubmitSuccessful}
						disabled={isSubmitSuccessful}
						className="mt-8"
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
		</section>
	);
};

export default SpeechForm;
