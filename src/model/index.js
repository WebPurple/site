// @flow

export type SocialNetworkType = 'vk' | 'fb' | 'twitter' | 'github' | 'site'

export interface ISocialNetwork {
  type: SocialNetworkType;
  link: string;
}

export interface ITalk {
  title: string;

  links: {
    video: string | null,
    presentation: string | null,
  } | null;
}

export interface ISpeaker {
  title: string;
  avatar: string | null;
  jobTitle: string | null;
  organization: string | null;
  socialNetworks: ISocialNetwork[];
  talks: ITalk[];
}
