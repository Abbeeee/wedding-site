import {defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'formBlock',
  title: 'FormBlock',
  fields: [
    {
      name: 'heading',
      title: 'Rubrik',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'blockContent',
      description: 'Text shown above selected form',
    },
    {
      title: 'Selected Form',
      name: 'selectedForm',
      type: 'string',
      options: {
        list: [
          {title: 'RSVP', value: 'rsvp'},
          {title: 'Speech', value: 'speech'},
        ],
        layout: 'radio',
        direction: 'vertical',
      },
    },
  ],
})
