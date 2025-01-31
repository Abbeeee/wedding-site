import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'favIcon',
      title: 'Fav icon',
      type: 'image',
    }),
    defineField({
      name: 'navLinks',
      title: 'Nav Links',
      type: 'array',
      of: [
        {
          name: 'navLink',
          title: 'Nav Link',
          type: 'object',
          fields: [
            {name: 'text', title: 'Text', type: 'string', description: 'Link text'},
            {name: 'link', title: 'Link', type: 'string', description: 'Link URL or target anchor'},
          ],
        },
      ],
    }),
    defineField({
      name: 'callToAction',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {name: 'text', title: 'Text', type: 'string', description: 'Button text'},
        {name: 'link', title: 'Link', type: 'string', description: 'Link URL or target'},
      ],
    }),
  ],
})
