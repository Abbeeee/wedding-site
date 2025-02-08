import React, { useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import InputField from './Form/InputField';
import Button from './Button';
import CheckboxField from './Form/CheckboxField';

type FormData = {
	Email: string;
	Name: string;
	PartnerName?: string; // Add this for second person
	Phonenumber: string;
	Foodpreference: string;
	PartnerFoodpreference?: string; // Add this for second person
	Friday: boolean;
	FridayPartner?: boolean;
	Saturday: boolean;
	SaturdayPartner?: boolean;
};

const RsvpForm: React.FC = () => {
	const [isCoupleRsvp, setIsCoupleRsvp] = useState(false);
	const [serverResponse, setServerResponse] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
	const {
		handleSubmit,
		watch,
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
		<section id="rsvpForm" className="mx-auto max-w-container">
			<section className="mx-auto max-w-lg">
				<h2 className="mt-0 text-balance leading-tight sm:text-3xl md:text-5xl">OSA</h2>
				<p className="mb-4">
					OSA i formuläret nedan senast den 31 mars 2025. Om du har några frågor får du gärna höra av dig till våra
					<a className="ml-1" href="#96d2e804b618" aria-label="Gå till sektionen för toastmasters">
						toastmasters
					</a>
					.
				</p>
				{/* Add toggle at the top */}
				<div className="mb-6 flex items-center gap-4">
					<button
						type="button"
						className={`border px-4 py-2 ${!isCoupleRsvp ? 'bg-primary text-white' : 'border-primary'}`}
						onClick={() => setIsCoupleRsvp(false)}
					>
						1 person
					</button>
					<button
						type="button"
						className={`border px-4 py-2 ${isCoupleRsvp ? 'bg-primary text-white' : 'border-primary'}`}
						onClick={() => setIsCoupleRsvp(true)}
					>
						2 personer
					</button>
				</div>

				<form className="" onSubmit={handleSubmit(onSubmit)} noValidate>
					<InputField name="Name" label="Namn" type="text" required="Vi behöver ditt namn" />
					{isCoupleRsvp && (
						<InputField
							name="PartnerName"
							label="Din partners namn"
							type="text"
							required="Vi behöver din partners namn"
						/>
					)}
					<InputField
						name="Email"
						label="Email"
						type="email"
						required="Email krävs"
						pattern={{ value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ogiltig email adress' }}
					/>
					<InputField
						name="Phonenumber"
						label="Telefonnummer"
						type="phonenumber"
						required="Telefonnummer krävs"
						pattern={{ value: /^[0-9]{3}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/, message: 'Ogiltigt telefonnummer' }}
					/>
					<InputField name="Food" label={isCoupleRsvp ? 'Dina matpreferencer' : 'Matpreferencer'} type="text" />
					{isCoupleRsvp && <InputField name="PartnerFood" label="Din partners matpreferencer" type="text" />}
					<div className="space-y-2">
						<h3 className="font-medium">Fredag 6 juni</h3>
						<div className="space-y-2">
							<CheckboxField name="Friday" label={isCoupleRsvp ? 'Jag kommer' : 'Jag kommer på fredag'} />
							{isCoupleRsvp && <CheckboxField name="FridayPartner" label="Min partner kommer" />}
						</div>
					</div>

					<div className="mt-4 space-y-2">
						<h3 className="font-medium">Lördag 7 juni</h3>
						<div className="space-y-2">
							<CheckboxField name="Saturday" label={isCoupleRsvp ? 'Jag kommer' : 'Jag kommer på lördag'} />
							{isCoupleRsvp && <CheckboxField name="SaturdayPartner" label="Min partner kommer" />}
						</div>
					</div>
					<Button
						type="submit"
						variant="outline"
						isSubmitting={isSubmitting}
						isSubmitSuccessful={isSubmitSuccessful}
						disabled={isSubmitSuccessful}
						className="mt-8 max-xs:w-full"
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

export default RsvpForm;
