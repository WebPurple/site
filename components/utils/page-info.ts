import {getJson} from './ajax';

export interface IPageInfo {
    title: string;
    type: string;
    url: string;
    siteName: string;
    description: string;
    imageUrl: string;
}

export function queryPageInfo(url: string): Promise<IPageInfo> {
    return getJson('/page-info', { pageUrl: url });
}