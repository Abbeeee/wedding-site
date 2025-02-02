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
        title: `TextImageBlock`,
        media: image,
      }
    },
  },
})
