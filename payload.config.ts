// import { payloadCloud } from '@payloadcms/plugin-cloud'
import { env } from '@env'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { searchPlugin } from '@payloadcms/plugin-search'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { slateEditor } from '@payloadcms/richtext-slate'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Blogs } from '@/payload/collections/Blogs'
import { Contacts } from '@/payload/collections/Contact'
import { Media } from '@/payload/collections/Media'
import { Pages } from '@/payload/collections/Pages'
import { Tags } from '@/payload/collections/Tags'
import { Users } from '@/payload/collections/Users'
import { COLLECTION_SLUG_PAGE } from '@/payload/collections/constants'
import { siteSettings } from '@/payload/globals/SiteSettings'
import { scheduleDocPublish } from '@/plugins/schedule-doc-publish'
import { BeforeSyncConfig } from '@/utils/beforeSync'
import { generateBreadcrumbsUrl } from '@/utils/generateBreadcrumbsUrl'
import {
  generateDescription,
  generateImage,
  generateTitle,
  generateURL,
} from '@/utils/seo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- ContentQL',
    },
    components: {
      graphics: {
        Logo: '/src/payload/style/icons/Logo.tsx',
        Icon: '/src/payload/style/icons/Icon.tsx',
      },
    },
    livePreview: {
      url: ({ data, collectionConfig, locale }) => {
        const baseUrl = env.PAYLOAD_URL

        return `${baseUrl}/${data.path}${locale ? `?locale=${locale.code}` : ''}`
      },

      collections: ['pages', 'blogs'],

      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  cors: [env.PAYLOAD_URL],
  csrf: [env.PAYLOAD_URL],
  collections: [Users, Media, Tags, Blogs, Pages, Contacts],
  globals: [siteSettings],
  plugins: [
    nestedDocsPlugin({
      collections: [COLLECTION_SLUG_PAGE],
      generateURL: generateBreadcrumbsUrl,
    }),
    s3Storage({
      collections: {
        ['media']: true,
      },
      bucket: env.S3_BUCKET,
      config: {
        endpoint: env.S3_ENDPOINT,
        credentials: {
          accessKeyId: env.S3_ACCESS_KEY_ID,
          secretAccessKey: env.S3_SECRET_ACCESS_KEY,
        },
        region: env.S3_REGION,
      },
    }),
    seoPlugin({
      collections: ['blogs'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle,
      generateDescription,
      generateImage,
      generateURL,
    }),
    searchPlugin({
      collections: ['users', 'tags', 'blogs'],
      defaultPriorities: { ['users']: 1, ['tags']: 2, ['blogs']: 3 },

      beforeSync: BeforeSyncConfig,
    }),
    scheduleDocPublish({
      enabled: true,
      collections: ['blogs'],
      position: 'sidebar',
    }),
  ],

  email: resendAdapter({
    defaultFromAddress: env.RESEND_SENDER_EMAIL,
    defaultFromName: env.RESEND_SENDER_NAME,
    apiKey: env.RESEND_API_KEY,
  }),

  sharp,
  editor: slateEditor({}),

  secret: env.PAYLOAD_SECRET,
  db: mongooseAdapter({
    url: env.DATABASE_URI,
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
