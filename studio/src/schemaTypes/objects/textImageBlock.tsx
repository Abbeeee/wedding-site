import {defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'textImageBlock',
  title: 'TextImageBlock',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Valfri rubrik som visas i textytan',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'blockContent',
      description: 'Valfri formaterbar text',
    },
    {
      name: 'reverse',
      title: 'Reverse',
      type: 'boolean',
      description: 'Reverse the order of image and text, default is image on left',
    },
  ],
  preview: {
    select: {
      image: 'image',
    },
    prepare(selection: any) {
      const {image} = selection

      return {
        title: `TextImageBlock`,
        media: image,
      }
    },
  },
})
