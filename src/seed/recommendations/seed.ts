import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { RequiredDataFromCollectionSlug } from 'payload'

import {
  recommendationHeroImageData,
  recommendationListImagesData,
  recommendationsData,
} from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<Page> => {
  try {
    const heroImageResult = await payload.create({
      collection: 'media',
      data: {
        alt: recommendationHeroImageData.alt,
      },
      filePath: recommendationHeroImageData.filePath,
    })

    const listImagesResult = await Promise.allSettled(
      recommendationListImagesData.map(listImageItem =>
        payload.create({
          collection: 'media',
          data: {
            alt: listImageItem.alt,
          },
          filePath: listImageItem.filePath,
        }),
      ),
    )

    const formattedImagesResult = listImagesResult
      .map(result =>
        result.status === 'fulfilled'
          ? result.value
          : `Failed to seed: ${result.reason}`,
      )
      .filter(result => typeof result !== 'string')

    const errors = formattedImagesResult.filter(
      result => typeof result === 'string',
    )

    const formattedResults: RequiredDataFromCollectionSlug<'pages'> = {
      ...recommendationsData,
      layout: recommendationsData.layout?.map((block, idx) => {
        if (block?.blockType === 'Hero') {
          return {
            ...block,
            image: heroImageResult.id,
          }
        }
        if (block?.blockType === 'RecommendationsList') {
          return {
            ...block,

            recommendations: block?.recommendations?.map(
              (recommendation, idx) => {
                return {
                  ...recommendation,
                  image: formattedImagesResult.at(idx)?.id as string,
                }
              },
            ),
          }
        }
        return block
      }),
    }

    const result = await payload.create({
      collection: 'pages',
      data: formattedResults,
    })

    if (errors.length > 0) {
      throw new Error(
        `Seeding failed with the following errors:\n${errors.join('\n')}`,
      )
    }

    return result
  } catch (error) {
    throw error
  }
}

export default seed
