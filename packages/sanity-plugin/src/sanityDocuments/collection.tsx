import * as React from 'react'
import { SanityDocumentConfig } from '../types'

export const createCollectionDocument = ({ fields, ...rest }: SanityDocumentConfig = {}) => {
  if (rest && rest.name && rest.name !== 'shopifyCollection')
    throw new Error('The document name for a collection must be "shopifyCollection"')
  if (rest && rest.type && rest.type !== 'document')
    throw new Error('The type for a Shopify collection must be "document"')
  const additionalFields = fields || []
  return {
    title: 'Collection',
    name: 'shopifyCollection',
    type: 'document',
    fields: [
      {
        title: 'Title',
        name: 'title',
        readOnly: true,
        type: 'string',
        hidden: true
      },
      {
        title: 'Page URI',
        name: 'handle',
        type: 'string',
        readOnly: true,
        hidden: true
      },
      {
        title: 'Shopify ID',
        name: 'shopifyId',
        type: 'string',
        hidden: true
      },
      {
        title: 'Shopify Data',
        name: 'sourceData',
        readOnly: true,
        type: 'shopifyCollectionSource'
      },
      ...additionalFields
    ],
    preview: {
      select: {
        title: 'title',
        sourceData: 'sourceData'
      },
      prepare: (props) => {
        const { title, sourceData } = props
        const itemTitle = sourceData ? title || sourceData.title : title
        const media =
          sourceData && sourceData.image ? (
            <div style={imageWrapperStyles}>
              <img style={imageStyles} src={sourceData.image.w100} alt={`Image for ${itemTitle}`} />
            </div>
          ) : (
            undefined
          )
        return {
          media,
          title: itemTitle
        }
      }
    },
    ...rest
  }
}

const imageStyles = {
  width: '100%',
  height: '100%',
  'object-fit': 'cover'
}

const imageWrapperStyles = {
  height: 'calc(100% - 4px)',
  background: '#d0cfcf',
  overflow: 'hidden',
  borderRadius: '3px',
  padding: '2px'
}