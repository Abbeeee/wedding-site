import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import RsvpForm from './RsvpForm';
import SpeechForm from './SpeechForm';
import type { FormBlock } from '../utils/sanity';

type Props = {
	block: FormBlock;
};

const FormBlock = (props: Props) => {
	const { heading, text, selectedForm } = props.block;
	const rsvpMethods = useForm();
	const speechMethods = useForm();

	return (
		<>
			{selectedForm === 'rsvp' && (
				<FormProvider {...rsvpMethods}>{<RsvpForm heading={heading} text={text} />}</FormProvider>
			)}
			{selectedForm === 'speech' && (
				<FormProvider {...speechMethods}>
					<SpeechForm heading={heading} text={text} />
				</FormProvider>
			)}
		</>
	);
};

export default FormBlock;
