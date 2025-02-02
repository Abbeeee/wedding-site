import {defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'centerTextBlock',
  title: 'CenterTextBlock',
  fields: [
    {
      name: 'heading',
      title: 'Rubrik',
      type: 'string',
      description: 'Rubrik som visas ovanför eventuell text nedanför',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'blockContent',
      description: 'Text som visas under eventuell rubrik ovanför',
    },
  ],
  preview: {
    select: {
      text: 'heading',
    },
    prepare(selection: any) {
      return {
        title: `Centrerat textblock`,
      }
    },
  },
})
