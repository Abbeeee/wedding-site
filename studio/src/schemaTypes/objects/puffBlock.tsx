import {defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'puffBlock',
  title: 'Puffblock',
  fields: [
    {
      name: 'heading',
      title: 'Rubrik',
      type: 'string',
      description: 'Heading for the block',
    },
    {
      name: 'items',
      title: 'Puffar',
      type: 'array',
      description: 'Valfria puffar som visas med centrerad text',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Optional image',
              options: {
                hotspot: true,
              },
            },
            {name: 'heading', title: 'Rubrik', type: 'string', description: 'Puff rubrik'},
            {
              name: 'information',
              title: 'Information',
              type: 'blockContent',
              description: 'Informationen som visas i puffen',
            },
            {
              name: 'button',
              title: 'Button',
              type: 'object',
              fields: [
                {name: 'text', title: 'Text', type: 'string', description: 'Button text'},
                {name: 'link', title: 'Link', type: 'url', description: 'Link URL'},
                {
                  name: 'externalLink',
                  title: 'Extern länk',
                  type: 'boolean',
                  description: 'Toggle for external links',
                  initialValue: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Centered text',
      name: 'centeredText',
      type: 'boolean',
      description: 'Indicates whether the text should be centered',
      initialValue: false,
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
