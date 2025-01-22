import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'startPage',
  title: 'Start Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title of the page',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'A short subtitle or tagline for the page',
    }),
    defineField({
      name: 'heroSlider',
      title: 'Hero Slider',
      type: 'gallery',
    }),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        {
          name: 'textBlock',
          title: 'TextBlock',
          type: 'textBlock',
        },
        {
          name: 'imageBlock',
          title: 'Imageblock',
          type: 'imageBlock',
        },
        {
          name: 'centerTextBlock',
          title: 'CenterTextBlock',
          type: 'centerTextBlock',
        },
        {
          name: 'puffBlock',
          title: 'PuffBlock',
          type: 'puffBlock',
        },
      ],
    }),
    defineField({
      name: 'callToAction',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {name: 'text', title: 'Text', type: 'string', description: 'Button text'},
        {name: 'link', title: 'Link', type: 'url', description: 'Link URL'},
      ],
    }),
  ],
})
