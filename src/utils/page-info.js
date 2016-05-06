import {getJson} from './ajax';

export function queryPageInfo(url) {
    return getJson('/page-info', { pageUrl: url });
}