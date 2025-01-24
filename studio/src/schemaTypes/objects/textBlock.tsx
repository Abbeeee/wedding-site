import {defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'textBlock',
  title: 'Textblock',
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'blockContent',
      description: 'Valfri formaterbar text',
    },
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare(selection: any) {
      return {
        title: `Textblock`,
      }
    },
  },
})
