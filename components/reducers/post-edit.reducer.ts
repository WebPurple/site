const editPost = (state = {post: {}, deferredPost: false}, action: {type: string}) => {
    switch (action.type) {
        case 'DEFERRED_POST':
            return Object.assign({}, state, {deferredPost: !state.deferredPost});
        default:
            return state;
    }
};

export default editPost;