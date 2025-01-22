import {defineType} from 'sanity'

export default defineType({
  name: 'puffBlock',
  title: 'Puffblock',
  type: 'object',
  fields: [
    {
      name: 'puffs',
      title: 'Puffar',
      type: 'array',
      description: 'Valfria puffar som visas med centrerad text',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'heading', title: 'Rubrik', type: 'string', description: 'Puff rubrik'},
            {
              name: 'information',
              title: 'Information',
              type: 'blockContent',
              description: 'Informationen som visas i puffen',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare(selection: any) {
      return {
        title: `Puffblock`,
      }
    },
  },
})
