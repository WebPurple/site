import { getJson } from './ajax';

export function queryPageInfo(url) { // eslint-disable-line import/prefer-default-export
    return getJson('/page-info', { pageUrl: url });
}
