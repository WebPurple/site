// @flow

export interface SocialNetworkType {
  type: 'vk' | 'fb' | 'twitter' | 'github' | 'site';
  link: string;
}

export type SpeakerType = {
  fields: {
    slug: string,
  },
  id: string,
  avatar: ?string,
  jobTitle: ?string,
  organization: ?string,
  socialNetworks: Array<SocialNetworkType>,
  // eslint-disable-next-line no-use-before-define
  talks: Array<TalkType>,
}

export type RawSpeakerType = {
  id: string,
  avatar: ?string,
  jobTitle: ?string,
  organization: ?string,
  socialNetworks: Array<SocialNetworkType>,

  fields: {
    slug: string,
    // eslint-disable-next-line no-use-before-define
    talks: Array<TalkType>,
  },
}

export interface TalkType {
  title: string;
  description: string;

  tags: string[];

  links: {
    video: string | null,
    presentation: string | null,
  } | null;

  event: {
    fields: {
      slug: string,
    },
    date: string,
  };

  speaker: SpeakerType;
}

export type VkPhotoType =
  | 's'
  | 'm'
  | 'x'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 'y'
  | 'z'
  | 'w'

export let typesOrderedBySize = [
  's',
  'm',
  'x',
  'o',
  'p',
  'q',
  'r',
  'y',
  'z',
  'w',
]

export type VkPhoto = {
  type: VkPhotoType,
  url: string,
  width: number,
  height: number,
}

export type VkPhotoGroup = {
  sizes: VkPhoto[],
}

export type EventType = {
  fields: {
    slug: string,
  },
  title: string,
  description: string,
  address: string,
  date: string,
  socialNetworks: SocialNetworkType[],
  vkAlbum: ?{
    title: string,
    photos: VkPhotoGroup[],
  },
  talks: TalkType[],
}

export type RawEventType = {
  fields: {
    slug: string,
    talks: TalkType[],
  },

  title: string,
  description: string,
  address: string,
  date: string,
  socialNetworks: SocialNetworkType[],
  vkAlbum: ?{
    title: string,
    photos: VkPhotoGroup[],
  },
}
