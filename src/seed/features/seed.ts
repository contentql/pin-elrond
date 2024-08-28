import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { RequiredDataFromCollectionSlug } from 'payload'

import { featureHeroImageData, featurePageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<Page> => {
  try {
    const imageResult = await payload.create({
      collection: 'media',
      data: {
        alt: featureHeroImageData.alt,
      },
      filePath: featureHeroImageData.filePath,
    })

    const formattedFeature: RequiredDataFromCollectionSlug<'pages'> = {
      ...featurePageData,
      layout: featurePageData?.layout?.map(block => {
        if (block?.blockType === 'Hero') {
          return {
            ...block,
            image: imageResult?.id,
          }
        }
        return block
      }),
    }

    const result = await payload.create({
      collection: 'pages',
      data: formattedFeature,
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seed
