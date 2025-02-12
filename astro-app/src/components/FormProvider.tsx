import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import RsvpForm from './RsvpForm';
import SpeechForm from './SpeechForm';

export default function MyForm() {
	const rsvpMethods = useForm();
	const speechMethods = useForm();

	return (
		<>
			<FormProvider {...rsvpMethods}>{<RsvpForm />}</FormProvider>
			<FormProvider {...speechMethods}>
				<SpeechForm />
			</FormProvider>
		</>
	);
}
