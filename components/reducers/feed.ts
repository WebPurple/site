interface IUser {
    gender: string;
    vkDisplayName: string;
    vkPhotoUrl: string;
    vkProfileUrl: string;
    vkUserId: number;
    vkUserName: string;
    _id: number;
}

export interface IPost {
    title: string;
    text: string;
    author: IUser;
    date: string;
    _id: number;
}

const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";

function fetchPostsRequest(): { type: string } {
    return {
        type: FETCH_POSTS_REQUEST
    };
}

function fetchPostsSuccess(posts: IPost[]): { type: string, posts: IPost[] } {
    return {
        type: FETCH_POSTS_SUCCESS,
        posts: posts
    };
}

export function fetchPosts(): (action: any) => any {
    return (dispatch: (action: any) => any) => {
        fetch("./api/posts")
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject(new Error(response.statusText));
                }
                return response.json();
            }).then((postList: IPost[]) => {
                dispatch(fetchPostsSuccess(postList));
            });
    }
}


const feed = (state = { isFetching: false, posts: [] }, action: { type: string, posts?: IPost[] }) => {
    switch (action.type) {
        case FETCH_POSTS_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case FETCH_POSTS_SUCCESS:
            return Object.assign({}, state, { isFetching: false, posts: action.posts });
        default:
            return state;
    }
};

export default feed;
