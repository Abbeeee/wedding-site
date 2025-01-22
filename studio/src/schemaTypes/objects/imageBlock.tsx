import {defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'imageBlock',
  title: 'Imageblock',
  fields: [
    {
      name: 'heading',
      title: 'Rubrik',
      type: 'string',
      description: 'Heading for the block',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Enkel 1st bild',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      image: 'image',
    },
    prepare(selection: any) {
      const {image} = selection

      return {
        title: `Imageblock`,
        media: image,
      }
    },
  },
})
