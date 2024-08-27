/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    tags: Tag;
    blogs: Blog;
    pages: Page;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    'site-settings': SiteSetting;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  displayName?: string | null;
  username: string;
  imageUrl?: string | null;
  city?: string | null;
  description?: string | null;
  role?: ('admin' | 'user' | 'author') | null;
  emailVerified?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    blogImageSize2?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    blogImageSize3?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
  id: string;
  title: string;
  description: string;
  tagImage: string | Media;
  slug?: string | null;
  color?: ('blue' | 'gray' | 'red' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink' | 'secondary') | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogs".
 */
export interface Blog {
  id: string;
  author?:
    | {
        relationTo: 'users';
        value: string | User;
      }[]
    | null;
  tags?:
    | {
        relationTo: 'tags';
        value: string | Tag;
      }[]
    | null;
  title: string;
  description: string;
  blogImage: string | Media;
  content: {
    [k: string]: unknown;
  }[];
  slug?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  title: string;
  isHome?: boolean | null;
  isDynamic?: boolean | null;
  layout?:
    | (
        | HomeType
        | DetailsType
        | ListType
        | HeroType
        | FeaturedPostType
        | LatestPostsType
        | RecommendationsListType
        | FeaturesType
        | ContactType
        | SubscribeType
      )[]
    | null;
  slug?: string | null;
  pathMode?: ('generate' | 'custom') | null;
  path?: string | null;
  parent?: (string | null) | Page;
  breadcrumbs?:
    | {
        doc?: (string | null) | Page;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HomeType".
 */
export interface HomeType {
  heading?: string | null;
  subHeading?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'Home';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "DetailsType".
 */
export interface DetailsType {
  collectionSlug?: ('blogs' | 'tags' | 'users') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'Details';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ListType".
 */
export interface ListType {
  title?: string | null;
  collectionSlug?: ('blogs' | 'tags' | 'users') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'List';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HeroType".
 */
export interface HeroType {
  image?: string | Media | null;
  title?: string | null;
  description?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'Hero';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FeaturedPostType".
 */
export interface FeaturedPostType {
  title?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'FeaturedPost';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "LatestPostsType".
 */
export interface LatestPostsType {
  titleOne?: string | null;
  titleTwo?: string | null;
  titleThree?: string | null;
  buttonName: string;
  buttonPath: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'LatestPosts';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "RecommendationsListType".
 */
export interface RecommendationsListType {
  recommendations?:
    | {
        image: string | Media;
        title: string;
        description: string;
        recommendationUrl: string;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'RecommendationsList';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FeaturesType".
 */
export interface FeaturesType {
  features?:
    | {
        title?: string | null;
        points?:
          | {
              point?: string | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'Features';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ContactType".
 */
export interface ContactType {
  title?: string | null;
  description?: string | null;
  image?: string | Media | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'Contact';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "SubscribeType".
 */
export interface SubscribeType {
  title?: string | null;
  image?: string | Media | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'Subscribe';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site-settings".
 */
export interface SiteSetting {
  id: string;
  appName?: string | null;
  appDescription?: string | null;
  logoImage: string | Media;
  header?: {
    menuLinks?:
      | {
          group?: boolean | null;
          menuLink?: {
            externalLink?: boolean | null;
            newPage?: boolean | null;
            page?: {
              relationTo: 'pages';
              value: string | Page;
            } | null;
            label?: string | null;
            link?: string | null;
            id?: string | null;
          };
          menuLinkGroup?: {
            groupTitle: string;
            groupLinks?:
              | {
                  externalLink?: boolean | null;
                  newPage?: boolean | null;
                  page?: {
                    relationTo: 'pages';
                    value: string | Page;
                  } | null;
                  label?: string | null;
                  link?: string | null;
                  id?: string | null;
                }[]
              | null;
          };
          id?: string | null;
        }[]
      | null;
  };
  footer?: {
    links?:
      | {
          group?: boolean | null;
          menuLink?: {
            externalLink?: boolean | null;
            newPage?: boolean | null;
            page?: {
              relationTo: 'pages';
              value: string | Page;
            } | null;
            label?: string | null;
            link?: string | null;
            id?: string | null;
          };
          menuLinkGroup?: {
            groupTitle: string;
            groupLinks?:
              | {
                  externalLink?: boolean | null;
                  newPage?: boolean | null;
                  page?: {
                    relationTo: 'pages';
                    value: string | Page;
                  } | null;
                  label?: string | null;
                  link?: string | null;
                  id?: string | null;
                }[]
              | null;
          };
          id?: string | null;
        }[]
      | null;
    socialLinks?:
      | {
          socialMedia: 'facebook' | 'twitter' | 'github';
          socialMediaLink: string;
          id?: string | null;
        }[]
      | null;
    copyright?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}