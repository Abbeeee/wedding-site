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
      options: {
        hotspot: true,
      },
    },
    {
      name: 'noCrop',
      title: 'No crop',
      type: 'boolean',
      description: 'Set to true to disable cropping',
      initialValue: false,
    },
    {
      name: 'maxHeight',
      title: 'Max height',
      type: 'number',
      description:
        'If no crop is applied, set a max height for the image. Default is 200. Value is in pixels.',
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
