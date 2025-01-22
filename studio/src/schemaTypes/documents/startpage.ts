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
      name: 'bodyArea',
      title: 'Text yta #1',
      type: 'blockContent',
    }),
    defineField({
      name: 'bodyArea2',
      title: 'Text yta #2',
      type: 'blockContent',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'The main image displayed at the top of the page',
      options: {
        hotspot: true, // Enables image hotspot selection
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      description: 'A list of features or benefits to highlight on the page',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string', description: 'Feature title'},
            {
              name: 'description',
              title: 'Description',
              type: 'blockContent',
              description: 'A description',
            },
            {name: 'icon', title: 'Icon', type: 'image', description: 'Feature icon'},
          ],
        },
      ],
    }),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        // Define the Textblock schema
        {
          name: 'textBlock',
          title: 'TextBlock',
          type: 'textBlock',
        },
        // Define the Imageblock schema
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
