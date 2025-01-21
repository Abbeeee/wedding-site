import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import RsvpForm from './RsvpForm';

export default function MyForm() {
	const methods = useForm();
	return (
		<FormProvider {...methods}>
			<RsvpForm />
		</FormProvider>
	);
}
