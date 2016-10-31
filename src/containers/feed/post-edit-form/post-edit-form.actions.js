import { getJson } from '../../../utils/ajax';

export const DEFERRED_POST = 'deferred_post';

export function toggleDeferredPost() {
    return {
        type: DEFERRED_POST,
    };
}

export const EXPORT_TO_FACEBOOK = 'export_to_facebook';

export function toggleExportToFacebook(checked) {
    return {
        type: EXPORT_TO_FACEBOOK,
        payload: checked,
    };
}

export const CHANGE_POST_IMAGE = 'change_post_image';

export function changePostImage(newImageLink) {
    return {
        type: CHANGE_POST_IMAGE,
        payload: newImageLink,
    };
}

export const CHANGE_POST_COMMENT = 'change_post_text';

export const FETCH_LINK_INFO = 'fetch_link_info';
export const RECEIVE_LINK_INFO = 'receive_link_info';

// maybe it should be replaced with https://gist.github.com/dperini/729294
// eslint-disable-next-line no-useless-escape
const urlRegexp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export function changePostComment(newComment) {
    return (dispatch, getState) => {
        dispatch({ type: CHANGE_POST_COMMENT, payload: newComment });

        const urlMatch = newComment.match(urlRegexp);
        if (urlMatch && !getState().newPost.postEditor.post.url) {
            dispatch({ type: FETCH_LINK_INFO });
            getJson('/page-info', { pageUrl: urlMatch[0] })
                .then(pageInfo => {
                    dispatch({
                        type: RECEIVE_LINK_INFO,
                        payload: { ...pageInfo, url: urlMatch[0] },
                    });
                });
        }
    };
}

export const CLEAR_SNIPPET = 'clear_snippet';

export function clearSnippet() {
    return { type: CLEAR_SNIPPET };
}
