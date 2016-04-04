export interface IUser {
    _id: number;
    email: string;
    displayName: string;
    gender: number; // 1 - male, 0 - female
    vkPhotoUrl: string;
    vkProfileUrl: string;
    vkUserId: number;
    fbUserId: string;
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