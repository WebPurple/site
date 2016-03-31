export interface IUser {
    _id: number;
    gender: string;
    vkDisplayName: string;
    vkPhotoUrl: string;
    vkProfileUrl: string;
    vkUserId: number;
    vkUserName: string;
    fbUserId: string;
    fbDisplayName: string;
}

export interface IPost {
    _id: number;
    text: string;
    link: string;
    linkTitle: string;
    author: IUser;
    date: string;
    exportToFacebook: boolean;
    imageLink: String;
}