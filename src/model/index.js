// @flow

export type SocialNetworkType = 'vk' | 'fb' | 'twitter' | 'github' | 'site'

export interface ISocialNetwork {
  type: SocialNetworkType;
  link: string;
}

export type SpeakerType = {
  title: string,
  avatar: string | null,
  jobTitle: string | null,
  organization: string | null,
  socialNetworks: Array<ISocialNetwork>,
  talks: Array<TalkType>,
}

export interface TalkType {
  title: string;
  description: string;

  links: {
    video: string | null,
    presentation: string | null,
  } | null;

  event: {
    slug: string,
    date: string,
  };

  speaker: SpeakerType;
}
