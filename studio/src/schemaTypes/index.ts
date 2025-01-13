import blockContent from './objects/blockContent'
import post from './documents/post'
import startpage from './documents/startpage'
import gallery from './objects/gallery'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types
export const schemaTypes = [startpage, post, blockContent, gallery]
