// @flow

export interface SocialNetworkType {
  type: 'vk' | 'fb' | 'twitter' | 'github' | 'site';
  link: string;
}

export type SpeakerType = {
  title: string,
  avatar: string | null,
  jobTitle: string | null,
  organization: string | null,
  socialNetworks: Array<SocialNetworkType>,
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
