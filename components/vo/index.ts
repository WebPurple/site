export interface IUser {
    _id: number;
    gender: string;
    vkDisplayName: string;
    vkPhotoUrl: string;
    vkProfileUrl: string;
    vkUserId: number;
    vkUserName: string;
}

export interface IPost {
    _id: number;
    title: string;
    text: string;
    author: IUser;
    date: string;
}