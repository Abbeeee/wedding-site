import blockContent from './objects/blockContent'
import post from './documents/post'
import startpage from './documents/startpage'
import gallery from './objects/gallery'
import textBlock from './objects/textBlock'
import imageBlock from './objects/imageBlock'
import centerTextBlock from './objects/centerTextBlock'
import puffBlock from './objects/puffBlock'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types
export const schemaTypes = [
  startpage,
  post,
  blockContent,
  gallery,
  textBlock,
  imageBlock,
  centerTextBlock,
  puffBlock,
]
