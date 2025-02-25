import {defineType} from 'sanity'

export default defineType({
  type: 'object',
  name: 'galleryBlock',
  title: 'GalleryBlock',
  fields: [
    {
      name: 'heading',
      title: 'Rubrik',
      type: 'string',
    },
    {
      name: 'galleryItems',
      title: 'Gallery',
      type: 'gallery',
    },
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare(selection: any) {
      return {
        title: `GalleryBlock`,
      }
    },
  },
})
