import React, { useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import InputField from './Form/InputField';
import Button from './Button';
import CheckboxField from './Form/CheckboxField';

type FormData = {
	Email: string;
	Name: string;
	PartnerName?: string;
	Phonenumber: string;
	Foodpreference: string;
	PartnerFoodpreference?: string;
	Friday: boolean;
	FridayPartner?: boolean;
	Saturday: boolean;
	SaturdayPartner?: boolean;
	BothDays?: boolean;
	BothDaysPartner?: boolean;
	Breakfast?: boolean;
	BreakfastPartner?: boolean;
};

const RsvpForm: React.FC = () => {
	const [isCoupleRsvp, setIsCoupleRsvp] = useState(false);
	const [serverResponse, setServerResponse] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
	const {
		handleSubmit,
		watch,
		formState: { isSubmitting, isSubmitSuccessful, errors }
	} = useFormContext<FormData>();

	const fridayAttending = watch('Friday');
	const fridayPartnerAttending = watch('FridayPartner');
	const saturdayAttending = watch('Saturday');
	const saturdayPartnerAttending = watch('SaturdayPartner');
	const bothDaysAttending = watch('BothDays');
	const bothDaysPartnerAttending = watch('BothDaysPartner');
	const breakfastAttending = watch('Breakfast');
	const breakfastPartnerAttending = watch('BreakfastPartner');
	const showSaturdayExtras = saturdayAttending || (isCoupleRsvp && saturdayPartnerAttending);

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			const response = await fetch(
				'https://script.google.com/macros/s/AKfycbwbZEkMMac9cdsTPdlH5zBwMbN9H2p4npc4-7m106iq7L4p-xpS7SXGIXgN1iXiM3HATw/exec',
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
				<p className="mb-4 text-pretty">
					OSA i formuläret nedan senast den 31 mars 2025. Ange nedan ifall du vill OSA för en eller två personer.
					Anmälan utav tal görs i{' '}
					<a href="#speechform" aria-label="Gå till formuläret för att anmäla tal">
						formuläret
					</a>{' '}
					nedan. Om du har några frågor får du gärna höra av dig till våra
					<a className="ml-1" href="#96d2e804b618" aria-label="Gå till sektionen för toastmasters">
						toastmasters
					</a>
					.
				</p>
				{/* Add toggle at the top */}
				<div className="mb-6 flex items-center gap-4">
					<button
						type="button"
						className={`border border-primary px-4 py-2 ${!isCoupleRsvp ? 'bg-primary text-white' : ''}`}
						onClick={() => setIsCoupleRsvp(false)}
					>
						1 person
					</button>
					<button
						type="button"
						className={`border border-primary px-4 py-2 ${isCoupleRsvp ? 'bg-primary text-white' : ''}`}
						onClick={() => setIsCoupleRsvp(true)}
					>
						2 personer
					</button>
				</div>

				<form className="border border-solid border-gray-300 p-4" onSubmit={handleSubmit(onSubmit)} noValidate>
					{/* Common fields */}
					<div className="space-y-4">
						<h3 className="mt-0 font-bold">Kontaktuppgifter</h3>
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
							pattern={{
								value: /^(\+46|0)[0-9]{2}[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
								message: 'Ogiltigt telefonnummer'
							}}
						/>
					</div>
					{/* Person 1 Section */}
					<div className="mt-8 space-y-4 border border-solid border-gray-300 p-4">
						<h3 className="mt-0 font-bold">Person 1</h3>
						<div className="space-y-4">
							<InputField name="Namn" label="För- och Efternamn" type="text" required="Vi behöver ditt namn" />
							<div className="space-y-2">
								<h4 className="text-sm font-medium">Närvaro</h4>
								<div>
									<CheckboxField name="Friday" label="Kommer på minglet (6 juni)" />
									<CheckboxField name="Saturday" label="Kommer på brölloppet (7 juni)" />
									<CheckboxField name="BothDays" label="Kommer båda dagarna" />
									<CheckboxField name="Breakfast" label="Kommer inte bo över men kommer gärna på frukost" />
								</div>
							</div>
							{(fridayAttending || saturdayAttending || bothDaysAttending || breakfastAttending) && (
								<>
									<InputField name="Allergier/specialkost" label="Eventuella allergier eller specialkost" type="text" />
									<InputField name="Relation" label="Relation till brudparet" type="text" />
								</>
							)}
						</div>
					</div>
					{/* Person 2 Section - Conditional */}
					{isCoupleRsvp && (
						<div className="mt-8 space-y-4 border border-solid border-gray-300 p-4">
							<h3 className="mt-0 font-bold">Person 2</h3>
							<div className="space-y-4">
								<InputField
									name="NamnPartner"
									label="För- och Efternamn"
									type="text"
									required="Vi behöver namnet för person 2"
								/>
								<div className="space-y-2">
									<h4 className="text-sm font-medium">Närvaro</h4>
									<div>
										<CheckboxField name="FridayPartner" label="Kommer på minglet (6 juni)" />
										<CheckboxField name="SaturdayPartner" label="Kommer på brölloppet (7 juni)" />
										<CheckboxField name="BothDaysPartner" label="Kommer båda dagarna" />
										<CheckboxField name="BreakfastPartner" label="Kommer inte bo över men kommer gärna på frukost" />
									</div>
								</div>
							</div>
							{(fridayPartnerAttending ||
								saturdayPartnerAttending ||
								bothDaysPartnerAttending ||
								breakfastAttending) && (
								<>
									<InputField
										name="Allergier/specialkost (+1)"
										label="Eventuella allergier eller specialkost"
										type="text"
									/>
									<InputField name="Relation (+1)" label="Relation till brudparet" type="text" />
								</>
							)}
						</div>
					)}

					{showSaturdayExtras && (
						<div className="mt-8 space-y-4 border border-solid border-gray-300 p-4">
							<h3 className="mt-0 font-bold">Övrigt</h3>
							<div className="space-y-4">
								{(saturdayAttending || saturdayPartnerAttending) && (
									<>
										<InputField
											name="SongRequest"
											label={`Den här låten får upp ${isCoupleRsvp && saturdayPartnerAttending ? 'oss' : 'mig'} på dansgolvet`}
											type="text"
										/>
									</>
								)}
							</div>
						</div>
					)}
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

export default RsvpForm;
